# OCR screenshots at an upscaled resolution using the Windows.Media.Ocr engine (WinRT).
# Decoding is done with a BitmapTransform scale factor, which gives the recogniser
# more pixels per glyph than the raw phone screenshot.
param(
  [Parameter(Mandatory = $true)][string]$InDir,
  [Parameter(Mandatory = $true)][string]$OutDir,
  [int]$Scale = 2,
  [string]$LangTag = 'zh-Hans-CN'
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Runtime.WindowsRuntime | Out-Null
[void][Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime]
[void][Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime]
[void][Windows.Graphics.Imaging.BitmapTransform, Windows.Foundation, ContentType = WindowsRuntime]
[void][Windows.Storage.StorageFile, Windows.Foundation, ContentType = WindowsRuntime]
[void][Windows.Globalization.Language, Windows.Foundation, ContentType = WindowsRuntime]

$asTaskGeneric = ([System.WindowsRuntimeSystemExtensions].GetMethods() | Where-Object {
    $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and
    $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1'
  })[0]

function Await($op, $type) {
  $netTask = $asTaskGeneric.MakeGenericMethod($type).Invoke($null, @($op))
  $netTask.Wait(-1) | Out-Null
  $netTask.Result
}

$lang = New-Object Windows.Globalization.Language($LangTag)
$engine = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang)
if ($null -eq $engine) { throw "no OCR engine for $LangTag" }

Get-ChildItem -Path $InDir -File | Sort-Object Name | ForEach-Object {
  $path = $_.FullName
  $base = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
  try {
    $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($path)) ([Windows.Storage.StorageFile])
    $stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
    $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])

    $transform = New-Object Windows.Graphics.Imaging.BitmapTransform
    $transform.ScaledWidth = [uint32]([Math]::Min(9000, $decoder.PixelWidth * $Scale))
    $transform.ScaledHeight = [uint32]([Math]::Min(9000, $decoder.PixelHeight * $Scale))
    $transform.InterpolationMode = [Windows.Graphics.Imaging.BitmapInterpolationMode]::Fant

    $bitmap = Await ($decoder.GetSoftwareBitmapAsync(
        [Windows.Graphics.Imaging.BitmapPixelFormat]::Bgra8,
        [Windows.Graphics.Imaging.BitmapAlphaMode]::Premultiplied,
        $transform,
        [Windows.Graphics.Imaging.ExifOrientationMode]::IgnoreExifOrientation,
        [Windows.Graphics.Imaging.ColorManagementMode]::DoNotColorManage)) ([Windows.Graphics.Imaging.SoftwareBitmap])

    $result = Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
    $sb = New-Object System.Text.StringBuilder
    foreach ($line in $result.Lines) { [void]$sb.AppendLine($line.Text) }
    $outFile = Join-Path $OutDir ("{0}.x{1}.txt" -f $base, $Scale)
    [System.IO.File]::WriteAllText($outFile, $sb.ToString(), (New-Object System.Text.UTF8Encoding($false)))
    Write-Host ("{0} x{1}: {2}x{3} -> {4} chars" -f $base, $Scale, $decoder.PixelWidth, $decoder.PixelHeight, $sb.ToString().Trim().Length)
    $stream.Dispose()
  } catch {
    Write-Host ("{0}: FAILED {1}" -f $base, $_.Exception.Message)
  }
}
Write-Host "done"
