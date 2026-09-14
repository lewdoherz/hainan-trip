import type { PackSection } from '../types';

/** Sections 7, 8 and 11 of the family packing list: the day-trip bag, the
 *  beach/pool bag, and the sleep setup. */
export const SECTIONS: PackSection[] = [
  {
    id: 'day-bag',
    title: { en: 'Daily diaper / day-trip bag', zh: '日常尿布包 / 外出半日包' },
    note: {
      en: 'You do not need to carry the entire airport kit each morning. For a normal 4–8 hour outing:',
      zh: '你不需要每天早上都把整套机场装备背上。以正常 4–8 小时的外出为例：',
    },
    groups: [
      {
        id: 'day-bag-items',
        items: [
          { id: 'day-baby-diapers', text: { en: 'Baby diapers — 5', zh: '婴儿纸尿裤 —— 5 片' }, tier: 'must' },
          { id: 'day-toddler-pull-ups', text: { en: 'Toddler pull-ups — 3–4', zh: '幼儿拉拉裤 —— 3–4 条' }, tier: 'must' },
          { id: 'day-wipes', text: { en: 'Wipes — 25–30 wipes', zh: '湿巾 —— 25–30 片' }, tier: 'must' },
          { id: 'day-baby-spare-outfit', text: { en: 'Baby spare outfit — 1–2', zh: '婴儿备用衣物 —— 1–2 套' }, tier: 'must' },
          { id: 'day-toddler-spare-outfit', text: { en: 'Toddler spare outfit — 1', zh: '幼儿备用衣物 —— 1 套' }, tier: 'must' },
          { id: 'day-changing-mat', text: { en: 'Changing mat — 1', zh: '换尿布垫 —— 1 个' }, tier: 'must' },
          { id: 'day-diaper-cream', text: { en: 'Diaper cream — travel tube', zh: '护臀霜 —— 旅行装一支' }, tier: 'must' },
          { id: 'day-wet-bag', text: { en: 'Wet bag — 1', zh: '防水收纳袋（装湿衣物）—— 1 个' }, tier: 'must' },
          { id: 'day-baby-bib', text: { en: 'Baby bib — 1–2', zh: '婴儿围兜 —— 1–2 个' }, tier: 'must' },
          { id: 'day-burp-cloth', text: { en: 'Burp cloth — 1', zh: '拍嗝巾 —— 1 条' }, tier: 'must' },
          { id: 'day-pacifier', text: { en: 'Pacifier — 1 + spare', zh: '安抚奶嘴 —— 1 个 + 备用' }, tier: 'must' },
          { id: 'day-toddler-water-bottle', text: { en: 'Toddler water bottle — 1', zh: '幼儿水壶 —— 1 个' }, tier: 'must' },
          { id: 'day-baby-cup', text: { en: 'Baby cup — 1', zh: '婴儿学饮杯 —— 1 个' }, tier: 'useful' },
          { id: 'day-toddler-snacks', text: { en: 'Toddler snacks — 2–3 portions', zh: '幼儿零食 —— 2–3 份' }, tier: 'must' },
          { id: 'day-baby-puree', text: { en: 'Baby puree/cereal/snack — 1–2 feeds', zh: '婴儿果泥/米粉/零食 —— 1–2 餐的量' }, tier: 'useful' },
          { id: 'day-sunscreen', text: { en: 'Sunscreen — 1 small bottle', zh: '防晒霜 —— 1 小瓶' }, tier: 'must' },
          { id: 'day-childrens-hats', text: { en: "Children's hats — 2", zh: '儿童遮阳帽 —— 2 顶' }, tier: 'must' },
          { id: 'day-portable-fan', text: { en: 'Portable fan — 1', zh: '便携小风扇 —— 1 个' }, tier: 'must' },
          { id: 'day-compact-umbrella', text: { en: 'Compact umbrella — 1', zh: '折叠伞 —— 1 把' }, tier: 'must' },
          { id: 'day-stroller-rain-cover', text: { en: 'Stroller rain cover — leave attached/in basket', zh: '推车防雨罩 —— 一直装在推车上/放在推车置物篮里' }, tier: 'useful' },
          { id: 'day-first-aid-pouch', text: { en: 'Small first-aid pouch — 1', zh: '小型急救包 —— 1 个' }, tier: 'useful' },
          { id: 'day-insect-repellent', text: { en: 'Insect repellent — 1', zh: '驱蚊液 —— 1 瓶' }, tier: 'useful' },
          { id: 'day-phone-power-bank', text: { en: 'Phone + power bank — 1', zh: '手机 + 充电宝 —— 1 个' }, tier: 'must' },
        ],
      },
    ],
  },
  {
    id: 'beach-bag',
    title: { en: 'Beach / pool bag', zh: '海滩 / 泳池包' },
    note: {
      en: "Because you'll probably swim most days: I would first see what the hotel provides and, if necessary, spend ¥20–50 locally on a bucket/shovel rather than sacrifice suitcase space. You probably don't need to pack large beach towels unless the hotel specifically tells you pool/beach towels aren't provided.",
      zh: '因为你们大概率几乎每天都要下水：我会先看看酒店提供什么，如果需要，就在当地花 ¥20–50 买个桶和铲子，而不是为此占用行李箱空间。除非酒店明确说泳池/沙滩毛巾不提供，否则你大概不需要自带大浴巾。',
    },
    groups: [
      {
        id: 'beach-bag-items',
        items: [
          { id: 'beach-toddler-swimsuit', text: { en: 'Toddler swimsuit/rash guard — 1', zh: '幼儿泳衣/防晒泳衣 —— 1 件' }, tier: 'must' },
          { id: 'beach-baby-swimsuit', text: { en: 'Baby swimsuit/rash guard — 1', zh: '婴儿泳衣/防晒泳衣 —— 1 件' }, tier: 'must' },
          { id: 'beach-adult-swimsuits', text: { en: 'Adult swimsuits — 2', zh: '大人泳衣 —— 2 套' }, tier: 'must' },
          { id: 'beach-swim-diapers', text: { en: 'Swim diapers — 2 toddler + 2 baby per outing', zh: '游泳纸尿裤 —— 每次外出 2 片幼儿 + 2 片婴儿' }, tier: 'must' },
          { id: 'beach-toddler-floaters', text: { en: 'Toddler floaters — 1 set', zh: '幼儿浮圈/浮板 —— 1 套' }, tier: 'must' },
          { id: 'beach-child-hats', text: { en: 'Child hats — 2', zh: '儿童遮阳帽 —— 2 顶' }, tier: 'must' },
          { id: 'beach-dad-hat', text: { en: 'Dad hat — 1', zh: '爸爸的帽子 —— 1 顶' }, tier: 'must' },
          { id: 'beach-adult-sunscreen', text: { en: 'Adult sunscreen — 1 bottle', zh: '大人防晒霜 —— 1 瓶' }, tier: 'must' },
          { id: 'beach-childrens-sunscreen', text: { en: "Children's sunscreen — 1 bottle", zh: '儿童防晒霜 —— 1 瓶' }, tier: 'must' },
          { id: 'beach-water-bottles', text: { en: 'Water bottles — 2+', zh: '水壶 —— 2 个以上' }, tier: 'must' },
          { id: 'beach-wet-bag', text: { en: 'Wet bag — 1 large', zh: '防水收纳袋 —— 1 个大号' }, tier: 'must' },
          { id: 'beach-waterproof-phone-pouch', text: { en: 'Waterproof phone pouch — 1', zh: '手机防水袋 —— 1 个' }, tier: 'useful' },
          { id: 'beach-beach-blanket', text: { en: 'Small beach blanket — optional', zh: '小型沙滩垫 —— 可选' }, tier: 'useful' },
          { id: 'beach-baby-muslin', text: { en: 'Baby muslin — 1', zh: '婴儿纱布巾 —— 1 条' }, tier: 'useful' },
          { id: 'beach-dry-clothes', text: { en: 'Dry change of clothes for each child — 1 each', zh: '每个孩子的干爽替换衣物 —— 每人 1 套' }, tier: 'useful' },
          { id: 'beach-toys', text: { en: 'Beach toys — do not bring a big set', zh: '沙滩玩具 —— 不要带一大套' }, tier: 'optional' },
        ],
      },
    ],
  },
  {
    id: 'sleep',
    title: { en: 'Sleep setup', zh: '睡眠安排' },
    note: {
      en: 'This deserves its own mini-checklist because bad sleep with two small children can ruin the next day.',
      zh: '这值得单独列一份小清单，因为带着两个小小孩，睡不好第二天基本就毁了。',
    },
    groups: [
      {
        id: 'sleep-toddler',
        title: { en: 'Toddler', zh: '幼儿' },
        items: [
          { id: 'sleep-toddler-birbbirb', text: { en: 'Birbbirb or Popo — 1', zh: 'Birbbirb 或 Popo —— 1 个' }, tier: 'must' },
          { id: 'sleep-toddler-pajamas', text: { en: 'Pajamas — 5 sets', zh: '睡衣 —— 5 套' }, tier: 'must' },
          { id: 'sleep-toddler-blanket', text: { en: 'Familiar small blanket if he uses one — 1', zh: '他习惯用的小毯子（如果他有固定用的一条）—— 1 条' }, tier: 'useful' },
          { id: 'sleep-toddler-bedtime-book', text: { en: 'One bedtime book within easy reach — 1', zh: '一本随手可拿的睡前绘本 —— 1 本' }, tier: 'useful' },
          { id: 'sleep-toddler-white-noise', text: { en: 'White-noise app/device — 1', zh: '白噪音 App/设备 —— 1 个' }, tier: 'optional' },
          { id: 'sleep-toddler-night-light', text: { en: 'Night-light — 1 tiny rechargeable unit if he uses one at home', zh: '小夜灯 —— 1 个可充电的小款，如果他在家习惯用的话' }, tier: 'useful' },
        ],
      },
      {
        id: 'sleep-baby',
        title: { en: 'Baby', zh: '婴儿' },
        note: {
          en: 'You mentioned Mom plans to sleep with the baby. The safer sleep arrangement for a 7-month-old is a separate firm cot/crib beside your bed rather than sharing the adult bed. The hotel listing says infant cots are available, so I would call/message the hotel today and reserve one.',
          zh: '你提到妈妈打算和宝宝一起睡。对 7 个月大的宝宝来说，更安全的睡眠安排是让宝宝睡在你床边一张独立、结实的婴儿床里，而不是和大人同床。酒店信息里说提供婴儿床，所以我建议今天就打电话或发消息给酒店，预订一张。',
        },
        items: [
          { id: 'sleep-baby-sleep-sacks', text: { en: 'Sleep sacks — 2', zh: '睡袋 —— 2 个' }, tier: 'must' },
          { id: 'sleep-baby-pacifiers', text: { en: 'Pacifiers — 3 if used', zh: '安抚奶嘴 —— 3 个（如果宝宝用）' }, tier: 'must' },
          { id: 'sleep-baby-muslin', text: { en: 'Familiar bedtime muslin/comfort routine — keeping loose bedding out of the baby\'s sleep space', zh: '熟悉的睡前纱布巾/安抚流程 —— 注意别把松散的被褥放进宝宝的睡眠区域' }, tier: 'useful' },
          { id: 'sleep-baby-white-noise', text: { en: 'White noise — phone/app is sufficient', zh: '白噪音 —— 用手机/App 就够了' }, tier: 'useful' },
          { id: 'sleep-baby-blackout-cover', text: { en: 'Portable blackout clips/suction blackout cover — only if your baby is highly light-sensitive', zh: '便携遮光夹/吸盘式遮光罩 —— 只有在宝宝对光线特别敏感时才需要' }, tier: 'optional' },
        ],
      },
    ],
  },
];
