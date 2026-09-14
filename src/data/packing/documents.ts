import type { PackSection } from '../types';

/**
 * Sections 1 and 6 of the family packing list: travel documents and the
 * airport / flight carry-on kit.
 */
export const SECTIONS: PackSection[] = [
  {
    id: 'docs',
    title: { en: 'Documents & travel essentials', zh: '证件与出行必需品' },
    note: {
      en: 'Power banks need to stay in your cabin baggage. On Chinese domestic flights, power banks without a clear CCC/3C mark, with an unclear mark, or belonging to recalled batches are prohibited. Check yours tonight.',
      zh: '充电宝必须随身携带，不能托运。在中国国内航班上，没有清晰 CCC/3C 标志、标志不清或属于召回批次的充电宝一律禁止携带。今晚请检查一下你的充电宝。',
    },
    groups: [
      {
        id: 'docs-essentials',
        items: [
          {
            id: 'docs-adult-id',
            text: { en: 'Adult identification used for the flight — 2 sets', zh: '乘机用的成人身份证件 — 2 套' },
            tier: 'must',
          },
          {
            id: 'docs-son-id',
            text: { en: 'Accepted travel ID/document for son — 1', zh: '儿子可用的出行证件/身份证明 — 1 份' },
            tier: 'must',
          },
          {
            id: 'docs-daughter-id',
            text: { en: 'Accepted travel ID/document for daughter — 1', zh: '女儿可用的出行证件/身份证明 — 1 份' },
            tier: 'must',
          },
          {
            id: 'docs-flight-booking',
            text: {
              en: "Flight booking/screenshots — saved on both adults' phones",
              zh: '机票预订信息/截图 — 已存在两位大人的手机里',
            },
            tier: 'must',
          },
          {
            id: 'docs-hotel-reservation',
            text: {
              en: 'Hotel reservation/screenshots — 1 digital copy on each phone',
              zh: '酒店预订信息/截图 — 每部手机各存 1 份电子版',
            },
            tier: 'must',
          },
          {
            id: 'docs-car-reservation',
            text: { en: 'Rental-car reservation — 1', zh: '租车预订确认单 — 1 份' },
            tier: 'must',
          },
          {
            id: 'docs-driving-licence',
            text: {
              en: 'Driving licence valid for driving/rental in China — 1',
              zh: '在中国可合法驾驶/租车的驾驶证 — 1 本',
            },
            tier: 'must',
          },
          {
            id: 'docs-car-seats',
            text: {
              en: 'Two correctly sized child car seats — bring or reserve with rental company',
              zh: '两个尺寸合适的儿童安全座椅 — 自带或向租车公司预订',
            },
            tier: 'must',
          },
          {
            id: 'docs-payments',
            text: { en: 'WeChat Pay / Alipay — both adults', zh: '微信支付 / 支付宝 — 两位大人都要装好' },
            tier: 'must',
          },
          {
            id: 'docs-bank-card',
            text: { en: 'Physical bank card — 1–2', zh: '实体银行卡 — 1–2 张' },
            tier: 'must',
          },
          {
            id: 'docs-rmb-cash',
            text: { en: 'RMB cash — ¥500–1,000 emergency backup', zh: '人民币现金 — ¥500–1,000 应急备用' },
            tier: 'useful',
          },
          {
            id: 'docs-insurance',
            text: { en: 'Health/insurance information — digital', zh: '健康/保险信息 — 电子版' },
            tier: 'must',
          },
          {
            id: 'docs-emergency-contacts',
            text: { en: 'Emergency contact details — saved offline', zh: '紧急联系人信息 — 离线保存' },
            tier: 'must',
          },
          {
            id: 'docs-phones',
            text: { en: 'Phones — 2', zh: '手机 — 2 部' },
            tier: 'must',
          },
          {
            id: 'docs-phone-chargers',
            text: { en: 'Phone chargers — 2', zh: '手机充电器 — 2 个' },
            tier: 'must',
          },
          {
            id: 'docs-cables',
            text: { en: 'USB-C/Lightning cables — 3–4', zh: 'USB-C/Lightning 数据线 — 3–4 条' },
            tier: 'must',
          },
          {
            id: 'docs-tablet-chargers',
            text: { en: 'Tablet chargers — as needed', zh: '平板电脑充电器 — 按需' },
            tier: 'must',
          },
          {
            id: 'docs-power-bank',
            text: { en: 'Power bank — 1–2', zh: '充电宝 — 1–2 个' },
            tier: 'must',
          },
          {
            id: 'docs-usb-charger',
            text: { en: 'Multi-port USB charger — 1', zh: '多口 USB 充电器 — 1 个' },
            tier: 'useful',
          },
          {
            id: 'docs-airtags',
            text: { en: 'AirTags/tracker tags — 2–3 if owned', zh: 'AirTags/防丢追踪器 — 已有的话带 2–3 个' },
            tier: 'useful',
          },
          {
            id: 'docs-ziplock-bags',
            text: { en: 'Ziplock bags — 10–15 assorted sizes', zh: '密封袋（Ziplock） — 10–15 个，各种尺寸' },
            tier: 'useful',
          },
          {
            id: 'docs-wet-bags',
            text: { en: 'Waterproof/wet bags — 3', zh: '防水袋/湿物袋 — 3 个' },
            tier: 'must',
          },
        ],
      },
    ],
  },
  {
    id: 'cabin',
    title: { en: 'Airport / flight carry-on', zh: '机场/航班随身行李' },
    note: {
      en: 'This is your checked-bag-lost-for-24-hours setup. Divide it like this: Backpack 1 = baby / diaper bag; Backpack 2 = toddler entertainment / food / documents; Carry-on 1 = family emergency clothes + medical kit; Carry-on 2 = electronics + remaining critical supplies.',
      zh: '这是按「托运行李丢失 24 小时」准备的随身方案。建议这样分装：背包 1 = 宝宝/尿布包；背包 2 = 幼儿娱乐/食物/证件；随身行李箱 1 = 全家应急衣物 + 医药包；随身行李箱 2 = 电子设备 + 其余关键物品。',
    },
    groups: [
      {
        id: 'cabin-baby',
        title: { en: 'Baby backpack', zh: '宝宝背包' },
        items: [
          {
            id: 'cabin-baby-diapers',
            text: { en: 'Baby diapers — 10', zh: '宝宝纸尿裤 — 10 片' },
            tier: 'must',
          },
          {
            id: 'cabin-baby-pull-ups',
            text: { en: 'Toddler pull-ups — 8', zh: '幼儿拉拉裤 — 8 片' },
            tier: 'must',
          },
          {
            id: 'cabin-baby-wipes',
            text: { en: 'Wipes — 1 full travel pack / 60–80 wipes', zh: '湿巾 — 1 整包旅行装 / 60–80 抽' },
            tier: 'must',
          },
          {
            id: 'cabin-baby-outfits',
            text: { en: 'Baby outfits — 3 complete changes', zh: '宝宝换洗衣物 — 3 整套' },
            tier: 'must',
          },
          {
            id: 'cabin-baby-toddler-outfits',
            text: { en: 'Toddler outfits — 2 complete changes', zh: '幼儿换洗衣物 — 2 整套' },
            tier: 'must',
          },
          {
            id: 'cabin-baby-pajamas',
            text: { en: 'Baby pajamas — 1', zh: '宝宝睡衣 — 1 套' },
            tier: 'must',
          },
          {
            id: 'cabin-baby-toddler-pajamas',
            text: { en: 'Toddler pajamas — 1', zh: '幼儿睡衣 — 1 套' },
            tier: 'must',
          },
          {
            id: 'cabin-baby-diaper-cream',
            text: { en: 'Diaper cream — small tube', zh: '护臀膏 — 小管' },
            tier: 'must',
          },
          {
            id: 'cabin-baby-changing-mat',
            text: { en: 'Changing mat — 1', zh: '换尿布垫 — 1 张' },
            tier: 'must',
          },
          {
            id: 'cabin-baby-wet-bag',
            text: { en: 'Wet bag — 1', zh: '湿物袋 — 1 个' },
            tier: 'must',
          },
          {
            id: 'cabin-baby-disposable-bags',
            text: { en: 'Disposable bags — 6–8', zh: '一次性袋子 — 6–8 个' },
            tier: 'must',
          },
          {
            id: 'cabin-baby-burp-cloths',
            text: { en: 'Burp cloths — 2', zh: '拍嗝巾/口水巾 — 2 条' },
            tier: 'must',
          },
          {
            id: 'cabin-baby-bibs',
            text: { en: 'Bibs — 2', zh: '围嘴 — 2 个' },
            tier: 'must',
          },
          {
            id: 'cabin-baby-muslin',
            text: { en: 'Muslin — 1', zh: '纱布巾 — 1 条' },
            tier: 'must',
          },
          {
            id: 'cabin-baby-pacifiers',
            text: { en: 'Pacifiers — 2', zh: '安抚奶嘴 — 2 个' },
            tier: 'must',
          },
          {
            id: 'cabin-baby-puree',
            text: { en: 'Baby puree — 2 servings', zh: '宝宝辅食泥 — 2 份' },
            tier: 'useful',
          },
          {
            id: 'cabin-baby-cereal',
            text: { en: 'Baby cereal — small portion', zh: '婴儿米粉 — 小份' },
            tier: 'useful',
          },
          {
            id: 'cabin-baby-spoon',
            text: { en: 'Baby spoon — 1', zh: '宝宝勺子 — 1 把' },
            tier: 'must',
          },
        ],
      },
      {
        id: 'cabin-toddler',
        title: { en: 'Toddler flight entertainment', zh: '幼儿机上娱乐' },
        note: {
          en: 'Good flight snacks: crackers, puffs, banana, low-mess fruit, small sandwiches, cheese if kept properly chilled, or other foods he already eats.',
          zh: '适合带上飞机的零食：饼干、泡芙、香蕉、不易弄脏的水果、小三明治、冷藏得当的奶酪，或者他平时就爱吃的其他食物。',
        },
        items: [
          {
            id: 'cabin-toddler-tablet',
            text: { en: 'Tablet — 1', zh: '平板电脑 — 1 台' },
            tier: 'must',
          },
          {
            id: 'cabin-toddler-headphones',
            text: { en: 'Headphones — 1', zh: '耳机 — 1 副' },
            tier: 'must',
          },
          {
            id: 'cabin-toddler-offline-videos',
            text: { en: 'Downloaded offline videos — check tonight', zh: '已下载的离线视频 — 今晚确认' },
            tier: 'must',
          },
          {
            id: 'cabin-toddler-kindle',
            text: { en: 'Kindle — 1', zh: 'Kindle — 1 台' },
            tier: 'useful',
          },
          {
            id: 'cabin-toddler-books',
            text: {
              en: 'Two books rather than all three in cabin',
              zh: '带上飞机的带两本就好，不用三本全带',
            },
            tier: 'useful',
          },
          {
            id: 'cabin-toddler-small-toys',
            text: { en: '2–3 small toys', zh: '小玩具 2–3 个' },
            tier: 'useful',
          },
          {
            id: 'cabin-toddler-comfort-toy',
            text: { en: 'Comfort toy — Birbbirb or Popo', zh: '安抚玩具 — Birbbirb 或 Popo' },
            tier: 'must',
          },
          {
            id: 'cabin-toddler-water-bottle',
            text: {
              en: 'Toddler water bottle — empty through security if required',
              zh: '幼儿水杯 — 如需要，过安检时倒空',
            },
            tier: 'must',
          },
          {
            id: 'cabin-toddler-snacks',
            text: { en: 'Toddler snacks — 5–6 individual portions', zh: '幼儿零食 — 5–6 小份' },
            tier: 'must',
          },
        ],
      },
      {
        id: 'cabin-adults',
        title: { en: 'Adults', zh: '大人' },
        items: [
          {
            id: 'cabin-adult-dad-change',
            text: { en: 'One complete change Dad — 1', zh: '爸爸一整套换洗衣物 — 1 套' },
            tier: 'must',
          },
          {
            id: 'cabin-adult-mom-change',
            text: { en: 'One complete change Mom — 1', zh: '妈妈一整套换洗衣物 — 1 套' },
            tier: 'must',
          },
          {
            id: 'cabin-adult-nursing-supplies',
            text: { en: 'Mom nursing supplies — minimal set', zh: '妈妈哺乳用品 — 最小套装' },
            tier: 'must',
          },
          {
            id: 'cabin-adult-medication-kit',
            text: { en: 'Family medication kit — see below', zh: '家庭医药包 — 见下文' },
            tier: 'must',
          },
          {
            id: 'cabin-adult-prescriptions',
            text: {
              en: 'All prescription/important medication — never checked',
              zh: '所有处方药/重要药物 — 绝不托运',
            },
            tier: 'must',
          },
          {
            id: 'cabin-adult-ids',
            text: { en: 'IDs/documents — all', zh: '证件/文件 — 全部' },
            tier: 'must',
          },
          {
            id: 'cabin-adult-devices',
            text: { en: 'Phones/tablets/Kindle — all', zh: '手机/平板/Kindle — 全部' },
            tier: 'must',
          },
          {
            id: 'cabin-adult-chargers',
            text: { en: 'Chargers/cables — 1 set', zh: '充电器/数据线 — 1 套' },
            tier: 'must',
          },
          {
            id: 'cabin-adult-power-bank',
            text: { en: '3C/CCC-compliant power bank — 1–2', zh: '符合 3C/CCC 认证的充电宝 — 1–2 个' },
            tier: 'must',
          },
          {
            id: 'cabin-adult-sanitizing-wipes',
            text: { en: 'Sanitizing wipes — small pack', zh: '消毒湿巾 — 小包' },
            tier: 'useful',
          },
          {
            id: 'cabin-adult-tissues',
            text: { en: 'Tissues — 2 packs', zh: '纸巾 — 2 包' },
            tier: 'useful',
          },
        ],
      },
      {
        id: 'cabin-stroller',
        title: { en: 'Stroller', zh: '婴儿车' },
        items: [
          {
            id: 'cabin-stroller-stroller',
            text: { en: 'Stroller — 1', zh: '婴儿车 — 1 辆' },
            tier: 'must',
          },
          {
            id: 'cabin-stroller-rain-cover',
            text: { en: 'Stroller rain cover — 1', zh: '婴儿车防雨罩 — 1 个' },
            tier: 'must',
          },
          {
            id: 'cabin-stroller-hooks',
            text: { en: 'Stroller hooks — 2', zh: '婴儿车挂钩 — 2 个' },
            tier: 'useful',
          },
          {
            id: 'cabin-stroller-organizer',
            text: { en: 'Stroller organizer — 1', zh: '婴儿车收纳袋 — 1 个' },
            tier: 'useful',
          },
          {
            id: 'cabin-stroller-mosquito-net',
            text: { en: 'Stroller mosquito net — 1', zh: '婴儿车蚊帐 — 1 个' },
            tier: 'useful',
          },
          {
            id: 'cabin-stroller-name-tag',
            text: { en: 'Name/contact tag on stroller — 1', zh: '婴儿车上挂姓名/联系方式牌 — 1 个' },
            tier: 'useful',
          },
        ],
      },
    ],
  },
];
