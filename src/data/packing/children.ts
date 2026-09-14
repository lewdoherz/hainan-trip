import type { PackSection } from '../types';

/**
 * The two children's suitcases: the toddler (2 years 8 months) and the baby
 * (7 months). Quantities are the source list's own, sized for eight days with
 * no laundry and a delay/emergency margin — do not "tidy" them.
 */
export const SECTIONS: PackSection[] = [
  {
    id: 'toddler',
    title: { en: "Toddler's suitcase — 2 years 8 months", zh: '幼儿行李箱 — 2岁8个月' },
    note: {
      en: 'With no laundry, this is where I would allow extras.',
      zh: '这次没有洗衣条件，所以这一箱我会允许适当多带一些。',
    },
    groups: [
      {
        id: 'toddler-clothing',
        title: { en: 'Clothing', zh: '衣物' },
        note: {
          en: 'That gives you roughly 1½ outfits/day plus emergency changes, without bringing 16 complete outfits.',
          zh: '这样大约是每天 1.5 套衣服，再加上应急替换，而不用带 16 套完整的衣服。',
        },
        items: [
          {
            id: 'toddler-tshirts',
            text: { en: 'T-shirts/lightweight tops — 11–12', zh: 'T恤/轻薄上衣 — 11–12 件' },
            tier: 'must',
          },
          {
            id: 'toddler-shorts',
            text: { en: 'Shorts/light bottoms — 9–10', zh: '短裤/轻薄下装 — 9–10 件' },
            tier: 'must',
          },
          {
            id: 'toddler-long-pants',
            text: { en: 'Lightweight long pants — 2', zh: '轻薄长裤 — 2 条' },
            tier: 'useful',
          },
          {
            id: 'toddler-ls-shirts',
            text: { en: 'Long-sleeve lightweight shirts — 2', zh: '长袖轻薄衬衫 — 2 件' },
            tier: 'useful',
          },
          {
            id: 'toddler-pajamas',
            text: { en: 'Pajamas — 5 sets', zh: '睡衣 — 5 套' },
            tier: 'must',
          },
          {
            id: 'toddler-socks',
            text: { en: 'Socks — 5 pairs', zh: '袜子 — 5 双' },
            tier: 'must',
          },
          {
            id: 'toddler-walking-shoes',
            text: { en: 'Walking shoes — 1 pair', zh: '走路鞋 — 1 双' },
            tier: 'must',
          },
          {
            id: 'toddler-sandals',
            text: { en: 'Waterproof sandals — 1 pair', zh: '防水凉鞋 — 1 双' },
            tier: 'must',
          },
        ],
      },
      {
        id: 'toddler-swimming',
        title: { en: 'Swimming', zh: '游泳' },
        note: {
          en: 'Floaters are useful, but still keep him within immediate adult reach around the pool/sea.',
          zh: '浮排很有用，但在泳池或海边时，仍要让他时刻待在大人的一臂之内。',
        },
        items: [
          {
            id: 'toddler-rash-guard',
            text: { en: 'Rash-guard/swim sets — 2', zh: '防晒泳衣/泳装套装 — 2 套' },
            tier: 'must',
          },
          {
            id: 'toddler-swim-diapers',
            text: { en: 'Swim diapers — 10', zh: '游泳尿裤 — 10 片' },
            tier: 'must',
          },
          {
            id: 'toddler-floaters',
            text: { en: 'His familiar floaters — 1 set', zh: '他常用的浮排 — 1 套' },
            tier: 'must',
          },
          {
            id: 'toddler-sun-hats',
            text: { en: 'Sun hats — 2', zh: '遮阳帽 — 2 顶' },
            tier: 'must',
          },
          {
            id: 'toddler-uv-sunglasses',
            text: { en: 'UV sunglasses — 1', zh: '防紫外线太阳镜 — 1 副' },
            tier: 'useful',
          },
        ],
      },
      {
        id: 'toddler-diapers',
        title: { en: 'Diapers', zh: '纸尿裤' },
        note: {
          en: "That's about 6/day × 8 days plus a decent delay/emergency margin.",
          zh: '大约每天 6 片 × 8 天，再加上一段充足的延误/应急余量。',
        },
        items: [
          {
            id: 'toddler-pull-ups',
            text: { en: 'Pull-ups/diapers — 55', zh: '拉拉裤/纸尿裤 — 55 片' },
            tier: 'must',
          },
        ],
      },
      {
        id: 'toddler-toiletries',
        title: { en: 'Toiletries', zh: '洗漱用品' },
        items: [
          {
            id: 'toddler-toothbrush',
            text: { en: 'Toothbrush — 1', zh: '牙刷 — 1' },
            tier: 'must',
          },
          {
            id: 'toddler-toothpaste',
            text: { en: "Children's toothpaste — 1", zh: '儿童牙膏 — 1' },
            tier: 'must',
          },
          {
            id: 'toddler-sunscreen',
            text: { en: "Child sunscreen — shared children's supply", zh: '儿童防晒霜 — 两个孩子共用一份' },
            tier: 'must',
          },
          {
            id: 'toddler-body-wash',
            text: { en: 'Gentle body wash/shampoo — 1 small bottle', zh: '温和的沐浴露/洗发水 — 1 小瓶' },
            tier: 'must',
          },
          {
            id: 'toddler-comb',
            text: { en: 'Comb — 1', zh: '梳子 — 1' },
            tier: 'useful',
          },
        ],
      },
      {
        id: 'toddler-eating',
        title: { en: 'Eating/drinking', zh: '吃喝' },
        items: [
          {
            id: 'toddler-water-bottle',
            text: { en: 'Water bottle — 1', zh: '水壶 — 1' },
            tier: 'must',
          },
          {
            id: 'toddler-snack-cup',
            text: { en: 'Reusable snack cup/container — 1–2', zh: '可重复使用的零食杯/容器 — 1–2' },
            tier: 'useful',
          },
          {
            id: 'toddler-bib',
            text: { en: 'Bib — 1–2', zh: '围兜 — 1–2' },
            tier: 'useful',
          },
          {
            id: 'toddler-cutlery',
            text: { en: 'Child spoon/fork — 1 set', zh: '儿童勺/叉 — 1 套' },
            tier: 'useful',
          },
        ],
      },
      {
        id: 'toddler-entertainment',
        title: { en: 'Entertainment', zh: '娱乐' },
        note: {
          en: "Don't bring a whole toy bag; your hotel already advertises children's toys, books, playground facilities and a kids' club.",
          zh: '不要带一整袋玩具；你订的酒店本身就宣传有儿童玩具、图书、游乐设施和儿童俱乐部。',
        },
        items: [
          {
            id: 'toddler-comfort-item',
            text: { en: 'Birbbirb or Popo — choose one comfort item if possible', zh: 'Birbbirb 或 Popo — 如果可能，只挑一件安抚物' },
            tier: 'must',
          },
          {
            id: 'toddler-book-little-blue-truck',
            text: { en: 'Little Blue Truck — 1', zh: 'Little Blue Truck — 1 本' },
            tier: 'useful',
          },
          {
            id: 'toddler-book-construction-site',
            text: { en: 'Goodnight, Goodnight, Construction Site — 1', zh: 'Goodnight, Goodnight, Construction Site — 1 本' },
            tier: 'useful',
          },
          {
            id: 'toddler-book-giraffes',
            text: { en: "Giraffes Can't Dance — 1", zh: "Giraffes Can't Dance — 1 本" },
            tier: 'useful',
          },
          {
            id: 'toddler-tablet',
            text: { en: 'Tablet — 1', zh: '平板电脑 — 1' },
            tier: 'must',
          },
          {
            id: 'toddler-headphones',
            text: { en: 'Child headphones — 1', zh: '儿童耳机 — 1' },
            tier: 'must',
          },
          {
            id: 'toddler-downloads',
            text: { en: 'Downloaded shows/games — enough offline content', zh: '已下载的节目/游戏 — 离线内容要够用' },
            tier: 'useful',
          },
          {
            id: 'toddler-sticker-book',
            text: { en: 'Small reusable sticker/activity book — 1', zh: '可重复使用的小贴纸书/活动书 — 1' },
            tier: 'useful',
          },
          {
            id: 'toddler-small-toys',
            text: { en: '2–3 small toys/cars', zh: '2–3 个小玩具/小汽车' },
            tier: 'useful',
          },
        ],
      },
    ],
  },
  {
    id: 'baby',
    title: { en: "Baby's suitcase — 7 months", zh: '婴儿行李箱 — 7个月' },
    groups: [
      {
        id: 'baby-clothing',
        title: { en: 'Clothing', zh: '衣物' },
        items: [
          {
            id: 'baby-rompers',
            text: { en: 'Lightweight rompers/bodysuits — 12–14', zh: '轻薄连体衣/包屁衣 — 12–14 件' },
            tier: 'must',
          },
          {
            id: 'baby-shorts',
            text: { en: 'Shorts/bottoms — 5–6', zh: '短裤/下装 — 5–6 件' },
            tier: 'must',
          },
          {
            id: 'baby-ls-outfits',
            text: { en: 'Lightweight long-sleeve outfits — 2', zh: '轻薄长袖衣服 — 2 件' },
            tier: 'useful',
          },
          {
            id: 'baby-pajamas',
            text: { en: 'Pajamas/sleeper suits — 5', zh: '睡衣/连体睡袋衣 — 5 套' },
            tier: 'must',
          },
          {
            id: 'baby-sleep-sacks',
            text: { en: 'Lightweight sleep sacks — 2', zh: '轻薄睡袋 — 2 个' },
            tier: 'must',
          },
          {
            id: 'baby-socks',
            text: { en: 'Socks — 4 pairs', zh: '袜子 — 4 双' },
            tier: 'useful',
          },
          {
            id: 'baby-sun-hats',
            text: { en: 'Sun hats — 2', zh: '遮阳帽 — 2 顶' },
            tier: 'must',
          },
        ],
      },
      {
        id: 'baby-diapers',
        title: { en: 'Diapers/changing', zh: '纸尿裤/换尿布' },
        note: {
          en: "That's approximately 8/day with a travel/emergency reserve.\n\nFor both children together:",
          zh: '大约是每天 8 片，另留出一份旅行/应急储备。\n\n以下是两个孩子共用的：',
        },
        items: [
          {
            id: 'baby-regular-diapers',
            text: { en: 'Regular diapers — 70', zh: '普通纸尿裤 — 70 片' },
            tier: 'must',
          },
          {
            id: 'baby-wipes',
            text: { en: 'Baby wipes — 3 × ~80-count packs + one travel pack', zh: '婴儿湿巾 — 3 × 约 80 片装 + 1 包旅行装' },
            tier: 'must',
          },
          {
            id: 'baby-diaper-cream',
            text: { en: 'Diaper cream — 1 tube', zh: '护臀膏 — 1 支' },
            tier: 'must',
          },
          {
            id: 'baby-changing-mat',
            text: { en: 'Portable changing mat — 1', zh: '便携换尿布垫 — 1' },
            tier: 'must',
          },
          {
            id: 'baby-diaper-bags',
            text: { en: 'Disposable diaper bags — 25–30', zh: '一次性尿布袋 — 25–30' },
            tier: 'useful',
          },
          {
            id: 'baby-wet-bags',
            text: { en: 'Wet bags — 2', zh: '防水收纳袋（湿袋）— 2 个' },
            tier: 'must',
          },
        ],
      },
      {
        id: 'baby-swimming',
        title: { en: 'Swimming', zh: '游泳' },
        note: {
          en: 'At 7 months, sunscreen is appropriate, but shade, hats and UV clothing should do most of the work. Mineral zinc oxide/titanium dioxide products are often preferred for babies.',
          zh: '7 个月大时可以用防晒霜了，但主要还是靠遮阳、帽子和防紫外线衣物。婴儿通常更适合选用矿物防晒成分（氧化锌/二氧化钛）的产品。',
        },
        items: [
          {
            id: 'baby-rash-guard',
            text: { en: 'Baby rash-guard swimsuits — 2', zh: '婴儿防晒泳衣 — 2 套' },
            tier: 'must',
          },
          {
            id: 'baby-swim-diapers',
            text: { en: 'Swim diapers — 8–10', zh: '游泳尿裤 — 8–10 片' },
            tier: 'must',
          },
          {
            id: 'baby-sun-hat',
            text: { en: 'Baby sun hat — included above', zh: '婴儿遮阳帽 — 已包含在上文' },
            tier: 'must',
          },
          {
            id: 'baby-pool-float',
            text: { en: 'Baby pool float — optional; direct adult contact is still required', zh: '婴儿泳圈/浮排 — 可选；仍需大人全程贴身看护' },
            tier: 'useful',
          },
          {
            id: 'baby-sunscreen',
            text: { en: "Children's SPF50+ sunscreen — 2 × ~100–150 mL", zh: '儿童 SPF50+ 防晒霜 — 2 × 约 100–150 mL' },
            tier: 'must',
          },
        ],
      },
      {
        id: 'baby-feeding',
        title: { en: 'Feeding', zh: '喂养' },
        note: {
          en: "Because she's breastfeeding and eating some solids:\n\nFor BLW/finger foods, restaurant foods such as very soft vegetables, ripe fruit and other appropriately prepared foods are easier than carrying a week's worth.",
          zh: '她以母乳为主，也已经吃一些辅食。\n\n如果采用 BLW/手指食物，餐厅里的很软蔬菜、熟透水果等处理得当的食物，比自带一整周的辅食更省事。',
        },
        items: [
          {
            id: 'baby-silicone-bibs',
            text: { en: 'Silicone bibs — 2', zh: '硅胶围兜 — 2' },
            tier: 'must',
          },
          {
            id: 'baby-cloth-bibs',
            text: { en: 'Cloth bibs — 4–6', zh: '布围兜 — 4–6' },
            tier: 'useful',
          },
          {
            id: 'baby-burp-cloths',
            text: { en: 'Burp cloths — 6–8', zh: '拍嗝巾 — 6–8' },
            tier: 'must',
          },
          {
            id: 'baby-muslin-cloths',
            text: { en: 'Muslin cloths — 2', zh: '纱布巾 — 2' },
            tier: 'must',
          },
          {
            id: 'baby-spoons',
            text: { en: 'Baby spoons — 2', zh: '婴儿勺 — 2' },
            tier: 'must',
          },
          {
            id: 'baby-bowl',
            text: { en: 'Small baby bowl — 1', zh: '小婴儿碗 — 1' },
            tier: 'useful',
          },
          {
            id: 'baby-cup',
            text: { en: 'Straw/sippy/open cup — 1', zh: '吸管杯/学饮杯/敞口杯 — 1' },
            tier: 'useful',
          },
          {
            id: 'baby-cereal',
            text: { en: 'Baby cereal — 1 small sealed box', zh: '婴儿米粉 — 1 小盒（未开封）' },
            tier: 'useful',
          },
          {
            id: 'baby-puree-pouches',
            text: { en: 'Familiar puree pouches/jars — 4–6 servings', zh: '常吃的果泥袋/果泥罐 — 4–6 份' },
            tier: 'useful',
          },
          {
            id: 'baby-buy-purees',
            text: { en: 'Additional purées/fruit/cereal as required', zh: '到三亚后按需补充的果泥/水果/米粉' },
            tier: 'buy',
          },
          {
            id: 'baby-formula',
            text: { en: 'Familiar formula — small sealed supply, only if already tolerated', zh: '常吃的配方奶 — 小份未开封装，仅在她已经适应的情况下带' },
            tier: 'optional',
          },
          {
            id: 'baby-bottles',
            text: { en: 'Bottles — 2', zh: '奶瓶 — 2' },
            tier: 'optional',
          },
        ],
      },
      {
        id: 'baby-comfort',
        title: { en: 'Comfort/travel', zh: '安抚/出行' },
        note: {
          en: 'With one stroller and two children, it gives you a backup when the toddler wants the stroller.',
          zh: '只有一辆婴儿车却有两个孩子时，它能当备用——老大想坐婴儿车时，你还能把小宝宝背在身上。',
        },
        items: [
          {
            id: 'baby-pacifiers',
            text: { en: 'Pacifiers — 3 if she uses them', zh: '安抚奶嘴 — 如果她用的话，3 个' },
            tier: 'must',
          },
          {
            id: 'baby-pacifier-clips',
            text: { en: 'Pacifier clips — 2', zh: '奶嘴夹/奶嘴链 — 2' },
            tier: 'must',
          },
          {
            id: 'baby-teether',
            text: { en: 'Teether — 1–2', zh: '牙胶 — 1–2' },
            tier: 'useful',
          },
          {
            id: 'baby-small-toys',
            text: { en: 'Small baby toys — 3', zh: '小婴儿玩具 — 3' },
            tier: 'useful',
          },
          {
            id: 'baby-portable-fan',
            text: { en: 'Portable fan — 1', zh: '便携小风扇 — 1' },
            tier: 'must',
          },
          {
            id: 'baby-carrier',
            text: { en: 'Soft baby carrier — 1', zh: '婴儿背带 — 1' },
            tier: 'high',
          },
        ],
      },
    ],
  },
];
