# OCR screenshots with the Windows.Media.Ocr engine (WinRT) from Windows PowerShell 5.1.
param(
  [Parameter(Mandatory = $true)][string]$InDir,
  [Parameter(Mandatory = $true)][string]$OutDir
)

$ErrorActionPreference = 'Stop'

Add-Type -AssemblyName System.Runtime.WindowsRuntime | Out-Null
[void][Windows.Media.Ocr.OcrEngine, Windows.Foundation, ContentType = WindowsRuntime]
[void][Windows.Graphics.Imaging.BitmapDecoder, Windows.Foundation, ContentType = WindowsRuntime]
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

function Invoke-Ocr([string]$path, $engine) {
  $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync($path)) ([Windows.Storage.StorageFile])
  $stream = Await ($file.OpenAsync([Windows.Storage.FileAccessMode]::Read)) ([Windows.Storage.Streams.IRandomAccessStream])
  $decoder = Await ([Windows.Graphics.Imaging.BitmapDecoder]::CreateAsync($stream)) ([Windows.Graphics.Imaging.BitmapDecoder])
  $bitmap = Await ($decoder.GetSoftwareBitmapAsync()) ([Windows.Graphics.Imaging.SoftwareBitmap])
  $result = Await ($engine.RecognizeAsync($bitmap)) ([Windows.Media.Ocr.OcrResult])
  $sb = New-Object System.Text.StringBuilder
  foreach ($line in $result.Lines) { [void]$sb.AppendLine($line.Text) }
  $stream.Dispose()
  return $sb.ToString()
}

$engines = @{}
foreach ($tag in @('zh-Hans-CN', 'en-US')) {
  $lang = New-Object Windows.Globalization.Language($tag)
  $engines[$tag] = [Windows.Media.Ocr.OcrEngine]::TryCreateFromLanguage($lang)
  if ($null -eq $engines[$tag]) { Write-Host "engine unavailable: $tag" }
}

Get-ChildItem -Path $InDir -File | Sort-Object Name | ForEach-Object {
  $path = $_.FullName
  $base = [System.IO.Path]::GetFileNameWithoutExtension($_.Name)
  foreach ($tag in $engines.Keys) {
    $engine = $engines[$tag]
    if ($null -eq $engine) { continue }
    try {
      $text = Invoke-Ocr $path $engine
    } catch {
      $text = "[OCR FAILED: $($_.Exception.Message)]"
    }
    $outFile = Join-Path $OutDir ("{0}.{1}.txt" -f $base, $tag)
    [System.IO.File]::WriteAllText($outFile, $text, (New-Object System.Text.UTF8Encoding($false)))
    $len = $text.Trim().Length
    Write-Host "$base [$tag] chars=$len"
  }
}
Write-Host "done"
