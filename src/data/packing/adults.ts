import type { PackSection } from '../types';

export const SECTIONS: PackSection[] = [
  {
    id: 'dad',
    title: { en: "Dad's suitcase", zh: '爸爸的行李箱' },
    note: {
      en: 'For you, I would prioritize lightweight quick-dry clothes rather than eight completely different outfits.',
      zh: '对你来说，我会优先带轻便速干的衣服，而不是八套完全不同的搭配。',
    },
    groups: [
      {
        id: 'dad-clothes',
        title: { en: 'Clothes', zh: '衣物' },
        items: [
          { id: 'dad-tshirts', text: { en: 'Lightweight T-shirts — 7', zh: '轻便T恤 —— 7件' }, tier: 'must' },
          { id: 'dad-polo', text: { en: 'Polo/nicer restaurant shirt — 1–2', zh: 'Polo衫／去餐厅穿的稍正式衬衫 —— 1–2件' }, tier: 'useful' },
          { id: 'dad-shorts', text: { en: 'Shorts — 4', zh: '短裤 —— 4条' }, tier: 'must' },
          { id: 'dad-trousers', text: { en: 'Lightweight trousers — 1', zh: '轻便长裤 —— 1条' }, tier: 'useful' },
          { id: 'dad-underwear', text: { en: 'Underwear — 8 pairs', zh: '内裤 —— 8条' }, tier: 'must' },
          { id: 'dad-socks', text: { en: 'Socks — 4–5 pairs', zh: '袜子 —— 4–5双' }, tier: 'must' },
          { id: 'dad-sleepwear', text: { en: 'Sleep shorts/shirts — 2 sets', zh: '睡眠短裤／睡衣 —— 2套' }, tier: 'must' },
          { id: 'dad-swim-trunks', text: { en: 'Swim trunks — 2', zh: '泳裤 —— 2条' }, tier: 'must' },
          { id: 'dad-rash-guard', text: { en: 'Rash guard / UV shirt — 1', zh: '防晒泳衣／防紫外线上衣 —— 1件' }, tier: 'useful' },
          { id: 'dad-long-sleeve', text: { en: 'Thin long-sleeve shirt for restaurants/air-conditioning — 1', zh: '去餐厅／吹空调穿的薄长袖衬衫 —— 1件' }, tier: 'useful' },
        ],
      },
      {
        id: 'dad-shoes',
        title: { en: 'Shoes', zh: '鞋子' },
        items: [
          { id: 'dad-walking-shoes', text: { en: 'Walking shoes/sneakers — 1 pair, wear on flight', zh: '步行鞋／运动鞋 —— 1双，登机时穿着' }, tier: 'must' },
          { id: 'dad-sandals', text: { en: 'Waterproof sandals/flip-flops — 1 pair', zh: '防水凉鞋／人字拖 —— 1双' }, tier: 'must' },
        ],
      },
      {
        id: 'dad-sun-rain',
        title: { en: 'Sun/rain', zh: '防晒与雨具' },
        note: {
          en: "Because you're bald, I would be more aggressive about scalp protection than the average packing list.",
          zh: '因为你是光头，头部防晒要比一般打包清单做得更积极一些。',
        },
        items: [
          { id: 'dad-sunscreen', text: { en: 'Broad-spectrum SPF50+ water-resistant adult sunscreen — 2 × 200–250 mL for both adults', zh: '广谱 SPF50+ 防水成人防晒霜 —— 2 × 200–250 毫升，两位成人合用' }, tier: 'must' },
          { id: 'dad-sunscreen-stick', text: { en: 'SPF50+ sunscreen stick/lotion for scalp/ears — 1', zh: 'SPF50+ 头皮／耳部防晒棒或防晒乳 —— 1支' }, tier: 'must' },
          { id: 'dad-hat', text: { en: 'Cap or preferably brimmed sun hat — 1', zh: '棒球帽，最好带宽檐的遮阳帽 —— 1顶' }, tier: 'must' },
          { id: 'dad-sunglasses', text: { en: 'Sunglasses — 1', zh: '太阳镜 —— 1副' }, tier: 'must' },
          { id: 'dad-umbrella', text: { en: 'Compact umbrella — 1', zh: '折叠伞 —— 1把' }, tier: 'must' },
          { id: 'dad-rain-shell', text: { en: 'Lightweight rain shell/poncho — 1', zh: '轻便雨衣／雨披 —— 1件' }, tier: 'useful' },
        ],
      },
      {
        id: 'dad-toiletries',
        title: { en: 'Toiletries', zh: '洗漱用品' },
        note: {
          en: 'Put large sunscreen/toiletries in the checked suitcase.',
          zh: '大瓶的防晒霜／洗漱用品放托运箱。',
        },
        items: [
          { id: 'dad-toothbrush', text: { en: 'Toothbrush — 1', zh: '牙刷 —— 1把' }, tier: 'must' },
          { id: 'dad-toothpaste', text: { en: 'Toothpaste — shared', zh: '牙膏 —— 共用' }, tier: 'must' },
          { id: 'dad-deodorant', text: { en: 'Deodorant — 1', zh: '止汗露 —— 1支' }, tier: 'must' },
          { id: 'dad-razor', text: { en: 'Razor/shaving items — as needed', zh: '剃须刀／剃须用品 —— 按需' }, tier: 'must' },
          { id: 'dad-face-wash', text: { en: 'Face wash/moisturizer — travel sizes', zh: '洗面奶／润肤霜 —— 旅行装' }, tier: 'useful' },
          { id: 'dad-comb', text: { en: 'Comb etc. — as required', zh: '梳子等 —— 按需' }, tier: 'useful' },
        ],
      },
    ],
  },
  {
    id: 'mom',
    title: { en: "Mom's suitcase", zh: '妈妈的行李箱' },
    groups: [
      {
        id: 'mom-clothing',
        title: { en: 'Clothing', zh: '衣物' },
        items: [
          { id: 'mom-tops', text: { en: 'Lightweight tops/dresses — 7–8 total', zh: '轻便上衣／连衣裙 —— 共 7–8 件' }, tier: 'must' },
          { id: 'mom-bottoms', text: { en: 'Shorts/skirts/light bottoms — 4–5', zh: '短裤／裙子／轻薄下装 —— 4–5件' }, tier: 'must' },
          { id: 'mom-trousers', text: { en: 'Lightweight trousers — 1', zh: '轻便长裤 —— 1条' }, tier: 'useful' },
          { id: 'mom-underwear', text: { en: 'Underwear — 8–10 pairs', zh: '内裤 —— 8–10条' }, tier: 'must' },
          { id: 'mom-bras', text: { en: 'Bras — 2–3', zh: '文胸 —— 2–3件' }, tier: 'must' },
          { id: 'mom-nursing-bras', text: { en: 'Nursing bras — 2–3', zh: '哺乳文胸 —— 2–3件' }, tier: 'must' },
          { id: 'mom-sleepwear', text: { en: 'Sleepwear — 2–3 sets', zh: '睡衣 —— 2–3套' }, tier: 'must' },
          { id: 'mom-swimsuits', text: { en: 'Swimsuits — 2', zh: '泳衣 —— 2套' }, tier: 'must' },
          { id: 'mom-cover-up', text: { en: 'Swim cover-up — 1', zh: '泳衣外搭罩衫 —— 1件' }, tier: 'useful' },
          { id: 'mom-cardigan', text: { en: 'Light cardigan/long sleeve for strong AC — 1', zh: '空调太冷时穿的轻薄开衫／长袖 —— 1件' }, tier: 'useful' },
        ],
      },
      {
        id: 'mom-shoes',
        title: { en: 'Shoes', zh: '鞋子' },
        items: [
          { id: 'mom-walking-shoes', text: { en: 'Comfortable walking shoes — 1 pair', zh: '舒适的步行鞋 —— 1双' }, tier: 'must' },
          { id: 'mom-sandals', text: { en: 'Waterproof sandals — 1 pair', zh: '防水凉鞋 —— 1双' }, tier: 'must' },
        ],
      },
      {
        id: 'mom-breastfeeding',
        title: { en: 'Breastfeeding', zh: '母乳喂养' },
        note: {
          en: "Since your daughter is primarily breastfed, keep this simple. I would not introduce a completely new formula solely because you're traveling. If she's already tolerated a particular formula, bring that exact one as backup.",
          zh: '女儿主要吃母乳，这部分尽量从简。不要仅仅因为要出行就换成一种全新的配方奶。如果她已经适应了某个牌子的配方奶，就带上同一款作为备用。',
        },
        items: [
          { id: 'mom-nursing-pads', text: { en: 'Nursing pads — 12–16 pairs', zh: '防溢乳垫 —— 12–16对' }, tier: 'must' },
          { id: 'mom-nipple-cream', text: { en: 'Nipple cream — 1 small tube', zh: '乳头霜 —— 1小支' }, tier: 'useful' },
          { id: 'mom-nursing-cover', text: { en: 'Nursing cover — 1', zh: '哺乳巾 —— 1条' }, tier: 'optional' },
          { id: 'mom-pump', text: { en: 'Manual/battery pump — only if Mom normally pumps', zh: '手动／电池吸奶器 —— 只在妈妈平时就吸奶时带' }, tier: 'optional' },
          { id: 'mom-milk-bags', text: { en: 'Milk-storage bags — 4–6, only if pumping', zh: '储奶袋 —— 4–6个，只在吸奶时带' }, tier: 'optional' },
          { id: 'mom-bottles', text: { en: 'Two bottles — useful if trying expressed milk/formula', zh: '两个奶瓶 —— 尝试瓶喂挤出的母乳／配方奶时很有用' }, tier: 'optional' },
        ],
      },
      {
        id: 'mom-toiletries',
        title: { en: 'Toiletries', zh: '洗漱用品' },
        items: [
          { id: 'mom-toiletries-set', text: { en: 'Toothbrush/toiletries — 1 set', zh: '牙刷／洗漱用品 —— 1套' }, tier: 'must' },
          { id: 'mom-skincare', text: { en: 'Skincare — travel quantities', zh: '护肤品 —— 旅行装用量' }, tier: 'must' },
          { id: 'mom-hairbrush', text: { en: 'Hairbrush/ties/clips — as needed', zh: '发刷／发圈／发夹 —— 按需' }, tier: 'must' },
          { id: 'mom-sunscreen', text: { en: 'Sunscreen — use shared adult supply', zh: '防晒霜 —— 用成人共用的那份' }, tier: 'must' },
          { id: 'mom-sunglasses', text: { en: 'Sunglasses — 1', zh: '太阳镜 —— 1副' }, tier: 'must' },
          { id: 'mom-hat', text: { en: 'Hat — 1', zh: '帽子 —— 1顶' }, tier: 'must' },
          { id: 'mom-feminine-hygiene', text: { en: 'Feminine hygiene products — enough for trip if relevant', zh: '女性卫生用品 —— 如有需要，带够整个行程的用量' }, tier: 'useful' },
          { id: 'mom-umbrella', text: { en: 'Compact umbrella — 1', zh: '折叠伞 —— 1把' }, tier: 'useful' },
        ],
      },
    ],
  },
];
