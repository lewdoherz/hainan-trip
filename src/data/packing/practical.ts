import type { PackSection } from '../types';

/**
 * Practical, trip-specific packing sections: what to buy after landing in Sanya
 * / Qingshui Bay, the night-before-departure checklist, the final top-10 list,
 * and the one-big-suitcase packing strategy.
 */
export const SECTIONS: PackSection[] = [
  {
    id: 'buy-sanya',
    title: { en: 'Buy after arriving in Sanya / Qingshui Bay', zh: '到三亚／清水湾后再买' },
    note: {
      en: 'Because you only want one big checked suitcase, don\'t waste space on items that are heavy and easy to replace. I would bring rather than buy locally your normal diapers, children\'s sunscreen, important medicines, daughter-specific diarrhea medicine, familiar formula if you decide to use it, and comfort items.',
      zh: '因为你们只打算带一个大号托运行李箱，别把空间浪费在又重、又容易在当地买到的东西上。以下物品我建议从家里带，而不是在当地买：平时用的纸尿裤、儿童防晒霜、重要药品、女儿专用的止泻药、如果决定使用就带平时喝惯的配方奶，以及安抚物品。',
    },
    groups: [
      {
        id: 'buy-sanya-list',
        items: [
          { id: 'buy-bottled-water', text: { en: 'Bottled drinking water', zh: '瓶装饮用水' }, tier: 'buy' },
          { id: 'buy-adult-snacks', text: { en: 'Extra adult snacks', zh: '额外的成人零食' }, tier: 'buy' },
          { id: 'buy-toddler-foods', text: { en: 'Fruit/yogurt/soft toddler foods', zh: '水果／酸奶／幼儿软质食物' }, tier: 'buy' },
          { id: 'buy-baby-puree', text: { en: 'Additional baby puree if needed', zh: '如有需要，再加购婴儿果泥' }, tier: 'buy' },
          { id: 'buy-baby-cereal', text: { en: 'Additional baby cereal if needed', zh: '如有需要，再加购婴儿米粉' }, tier: 'buy' },
          { id: 'buy-beach-toys', text: { en: 'Cheap bucket/shovel/beach toys if children want them', zh: '如果孩子想要，买便宜的桶／铲子／沙滩玩具' }, tier: 'buy' },
          { id: 'buy-extra-wipes', text: { en: 'Extra wipes if your three packs somehow run low', zh: '如果三包湿巾不够用，再加购湿巾' }, tier: 'buy' },
          { id: 'buy-emergency-diapers', text: { en: 'Additional diapers only as emergency backup', zh: '纸尿裤只在应急时再买' }, tier: 'buy' },
          { id: 'buy-water-ors', text: { en: 'Extra bottled water/ORS if anyone becomes ill', zh: '如果有人生病，加购瓶装水和口服补液盐（ORS）' }, tier: 'buy' },
          { id: 'buy-aloe-after-sun', text: { en: 'Aloe/after-sun if actually needed rather than packing a large bottle', zh: '确实需要时再买芦荟胶／晒后修复，而不是带一大瓶' }, tier: 'buy' },
        ],
      },
    ],
  },
  {
    id: 'night-before-departure',
    title: { en: 'Night-before-departure checklist', zh: '出发前一晚清单' },
    note: { en: 'Do this tonight rather than at 6 a.m. tomorrow.', zh: '这些事今晚就做完，别等到明天早上 6 点再做。' },
    groups: [
      {
        id: 'night-before-list',
        items: [
          { id: 'night-check-flight-status', text: { en: 'Check Xiamen → Sanya flight status because of the Hainan rain situation.', zh: '由于海南的降雨情况，确认厦门 → 三亚的航班状态。' }, tier: 'must' },
          { id: 'night-check-weather-warnings', text: { en: 'Check Hainan/Lingshui weather warnings again.', zh: '再次查看海南／陵水的天气预警。' }, tier: 'must' },
          { id: 'night-charge-phones', text: { en: 'Charge both phones to 100%.', zh: '把两部手机都充到 100%。' }, tier: 'must' },
          { id: 'night-charge-tablets', text: { en: 'Charge both tablets.', zh: '给两台平板电脑充电。' }, tier: 'must' },
          { id: 'night-charge-kindle', text: { en: 'Charge Kindle.', zh: '给 Kindle 充电。' }, tier: 'must' },
          { id: 'night-charge-portable-fan', text: { en: 'Charge portable fan.', zh: '给便携风扇充电。' }, tier: 'must' },
          { id: 'night-charge-headphones', text: { en: 'Charge headphones if required.', zh: '需要的话给耳机充电。' }, tier: 'must' },
          { id: 'night-charge-power-banks', text: { en: 'Charge power banks and check visible CCC/3C marking.', zh: '给充电宝充电，并检查可见的 CCC／3C 标识。' }, tier: 'must' },
          { id: 'night-download-shows', text: { en: 'Download toddler shows/movies for offline viewing.', zh: '下载幼儿看的节目／电影，方便离线观看。' }, tier: 'must' },
          { id: 'night-download-offline-content', text: { en: 'Download books/games/content that don\'t require Wi-Fi.', zh: '下载不需要 Wi-Fi 的书／游戏／内容。' }, tier: 'must' },
          { id: 'night-screenshot-bookings', text: { en: 'Screenshot flight, hotel and rental-car bookings.', zh: '截图保存机票、酒店和租车订单。' }, tier: 'must' },
          { id: 'night-collect-ids', text: { en: 'Put all four travelers\' IDs/documents together.', zh: '把四位出行者的证件／文件放在一起。' }, tier: 'must' },
          { id: 'night-confirm-rental-car', text: { en: 'Confirm rental car.', zh: '确认租车。' }, tier: 'must' },
          { id: 'night-confirm-car-seats', text: { en: 'Confirm two child car seats.', zh: '确认两个儿童安全座椅。' }, tier: 'must' },
          { id: 'night-confirm-baby-cot', text: { en: 'Call/message hotel to request a baby cot/crib.', zh: '给酒店打电话或发消息，要求提供婴儿床。' }, tier: 'must' },
          { id: 'night-confirm-stroller-rules', text: { en: 'Confirm stroller rules with airline if you\'re gate-checking it.', zh: '如果婴儿车要在登机口托运，先和航空公司确认相关规定。' }, tier: 'must' },
          { id: 'night-label-luggage', text: { en: 'Attach name/contact information to stroller and checked suitcase.', zh: '在婴儿车和托运行李箱上挂好姓名／联系方式。' }, tier: 'must' },
          { id: 'night-meds-in-carry-on', text: { en: 'Put medications in carry-on, not checked luggage.', zh: '把药品放进随身行李，不要放进托运行李。' }, tier: 'must' },
          { id: 'night-24h-child-supplies', text: { en: 'Put 24-hour child supplies in cabin bags.', zh: '把 24 小时用量的儿童用品放进客舱随身包。' }, tier: 'must' },
          { id: 'night-liquids-checked', text: { en: 'Put large liquids/sunscreen in checked bag.', zh: '把大瓶液体／防晒霜放进托运行李。' }, tier: 'must' },
          { id: 'night-valuables-cabin', text: { en: 'Put valuables/electronics/power banks in cabin bags.', zh: '把贵重物品／电子产品／充电宝放进随身包。' }, tier: 'must' },
          { id: 'night-stroller-rain-cover', text: { en: 'Put stroller rain cover somewhere immediately accessible.', zh: '把婴儿车防雨罩放在随手就能拿到的地方。' }, tier: 'must' },
          { id: 'night-secure-birbbirb-popo', text: { en: 'Place Birbbirb/Popo where it cannot accidentally end up in checked luggage.', zh: '把 Birbbirb／Popo 放在不会误装进托运行李的地方。' }, tier: 'must' },
          { id: 'night-spare-outfit-carry-on', text: { en: 'Leave an extra outfit for each child near the top of the carry-on.', zh: '在随身包最上层给每个孩子各留一套备用衣服。' }, tier: 'must' },
        ],
      },
    ],
  },
  {
    id: 'top10',
    title: { en: 'Final 10-item DO NOT FORGET list', zh: '最后 10 项绝不能忘清单' },
    note: {
      en: 'For your family, I would consider the baby carrier the single most worthwhile addition you haven\'t already planned to take. One stroller + a nearly-three-year-old + a 7-month-old works much more smoothly when you have the option to put the baby in a carrier and the toddler in the stroller. Because the weather situation around Hainan is changing quickly right before your departure, I can also monitor the Xiamen/Sanya/Lingshui weather and heavy-rain situation and alert you if there\'s a meaningful change before or during your trip.',
      zh: '对你们家来说，我认为婴儿背带是你还没计划带上的东西里最值得加的一件。一个婴儿车 + 一个快三岁的孩子 + 一个 7 个月大的宝宝，如果能把宝宝背在身上、让幼儿坐婴儿车，一切都会顺畅得多。由于出发前海南周边的天气变化很快，我也可以帮你盯着厦门／三亚／陵水的天气和暴雨情况，如果在出发前或旅途中出现明显变化，会及时提醒你。',
    },
    groups: [
      {
        id: 'top10-list',
        items: [
          { id: 'top10-travel-ids', text: { en: 'Children\'s travel IDs/documents', zh: '儿童出行证件／文件' }, tier: 'must' },
          { id: 'top10-car-seats', text: { en: 'Two properly sized car seats reserved/brought for the rental car', zh: '为租车预订／带好两个尺寸合适的儿童安全座椅' }, tier: 'must' },
          { id: 'top10-diapers-pull-ups', text: { en: 'Baby diapers 70 + toddler pull-ups 55', zh: '婴儿纸尿裤 70 片 + 幼儿拉拉裤 55 片' }, tier: 'must' },
          { id: 'top10-medicines', text: { en: 'Important medicines + daughter\'s diarrhea medicine + dosing instructions', zh: '重要药品 + 女儿的止泻药 + 用药剂量说明' }, tier: 'must' },
          { id: 'top10-sunscreen', text: { en: 'Children\'s and adult sunscreen, especially Dad\'s scalp protection', zh: '儿童和成人防晒霜，尤其是爸爸的头皮防晒' }, tier: 'must' },
          { id: 'top10-stroller', text: { en: 'Stroller + stroller rain cover', zh: '婴儿车 + 婴儿车防雨罩' }, tier: 'must' },
          { id: 'top10-birbbirb-popo', text: { en: 'Birbbirb or Popo', zh: 'Birbbirb 或 Popo' }, tier: 'must' },
          { id: 'top10-devices-chargers', text: { en: 'Phones/tablets/headphones + chargers + 3C/CCC-compliant power bank', zh: '手机／平板／耳机 + 充电器 + 符合 3C／CCC 认证的充电宝' }, tier: 'must' },
          { id: 'top10-24h-child-supplies', text: { en: '24-hour child supplies in cabin baggage, not the checked suitcase', zh: '24 小时用量的儿童用品放进客舱随身行李，而不是托运行李箱' }, tier: 'must' },
          { id: 'top10-tonight-confirmations', text: { en: 'Confirm hotel baby crib and tomorrow\'s flight/weather status tonight', zh: '今晚确认酒店婴儿床和明天的航班／天气情况' }, tier: 'must' },
        ],
      },
    ],
  },
  {
    id: 'strategy',
    title: { en: 'One-big-suitcase strategy', zh: '一个大箱子的打包策略' },
    note: {
      en: 'With your luggage limits, I would use the large checked suitcase primarily for clothing, diapers, swim gear and toiletries. Diapers take space but weigh almost nothing; compression bags work very well for them. Your two carry-ons should contain enough family clothing for 24 hours, medicine and critical baby supplies. Your two backpacks are the things you actually need while sitting on the airplane. One useful trick: divide the children\'s diapers between luggage. For example, don\'t put all 70 baby diapers in the checked suitcase. Put 10 baby + 8 toddler diapers in cabin baggage so a delayed suitcase isn\'t immediately a crisis.',
      zh: '在你们的行李额度限制下，我建议那个大号托运行李箱主要用来装衣物、纸尿裤、游泳用品和洗漱用品。纸尿裤占地方但几乎不占重量，用压缩袋收纳效果很好。两个随身行李箱应该装够全家 24 小时用的衣物、药品和关键的婴儿用品。两个双肩包则用来装你们在飞机上实际要用的东西。一个很实用的小技巧：把孩子的纸尿裤分散放在不同行李里。比如，不要把 70 片婴儿纸尿裤全放进托运行李箱，而是把 10 片婴儿纸尿裤 + 8 片幼儿纸尿裤放进随身行李，这样即使行李延误，也不会立刻变成一场危机。',
    },
    groups: [],
  },
];
