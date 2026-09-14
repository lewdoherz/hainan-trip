import type { PackSection } from '../types';

/**
 * Section 9 — Family medical / first-aid kit.
 * Transcribed verbatim (minus importance labels and markdown) from the family's
 * packing list, with Simplified Chinese translations for a Chinese parent.
 */
export const SECTIONS: PackSection[] = [
  {
    id: 'medical',
    title: { en: 'Family medical / first-aid kit', zh: '家庭药品与急救包' },
    note: {
      en: "For the 7-month-old and toddler, use an appropriately labeled repellent such as DEET or picaridin, applied according to the product directions. Don't put it on their hands, eyes or mouth, and avoid oil-of-lemon-eucalyptus/PMD products for children under 3.",
      zh: '给7个月大的宝宝和幼儿驱蚊时，请使用标明适合儿童的产品，如含避蚊胺（DEET）或派卡瑞丁（picaridin）的驱蚊液，并按产品说明涂抹。不要涂在他们的手、眼睛或嘴上；3岁以下儿童应避免使用柠檬桉油／PMD类产品。',
    },
    groups: [
      {
        id: 'med-universal',
        title: { en: 'Universal items', zh: '通用物品' },
        note: {
          en: 'Young children can dehydrate much faster than adults during vomiting/diarrhea, so ORS is one of the most useful medical items you can bring. Continue breastfeeding your daughter if she becomes ill.',
          zh: '幼儿呕吐／腹泻时比成人更容易脱水，因此口服补液盐是你能带的最有用的药品之一。如果女儿生病了，请继续给她母乳喂养。',
        },
        items: [
          {
            id: 'med-thermometer',
            text: { en: 'Digital thermometer — 1', zh: '电子体温计 — 1 支' },
            tier: 'must',
          },
          {
            id: 'med-adhesive-bandages',
            text: { en: 'Adhesive bandages — 15–20 assorted', zh: '创可贴 — 15–20 片（混装）' },
            tier: 'must',
          },
          {
            id: 'med-gauze-pads',
            text: { en: 'Sterile gauze pads — 4–6', zh: '无菌纱布块 — 4–6 片' },
            tier: 'useful',
          },
          {
            id: 'med-medical-tape',
            text: { en: 'Medical tape — 1 small roll', zh: '医用胶布 — 1 小卷' },
            tier: 'useful',
          },
          {
            id: 'med-antiseptic-wipes',
            text: { en: 'Antiseptic wipes — 10', zh: '消毒湿巾 — 10 片' },
            tier: 'useful',
          },
          { id: 'med-tweezers', text: { en: 'Tweezers — 1', zh: '镊子 — 1 把' }, tier: 'useful' },
          {
            id: 'med-cold-pack',
            text: { en: 'Small instant cold pack — 1', zh: '小号速冷冰袋 — 1 个' },
            tier: 'useful',
          },
          {
            id: 'med-ors',
            text: { en: 'Oral rehydration salts — 6–8 sachets', zh: '口服补液盐 — 6–8 袋' },
            tier: 'must',
          },
          {
            id: 'med-hand-sanitizer',
            text: { en: 'Hand sanitizer — 1–2 small bottles', zh: '免洗洗手液 — 1–2 小瓶' },
            tier: 'useful',
          },
          {
            id: 'med-insect-repellent',
            text: {
              en: 'Insect repellent appropriate for the children — 1',
              zh: '适合儿童使用的驱蚊液 — 1 瓶',
            },
            tier: 'must',
          },
          {
            id: 'med-bite-relief',
            text: {
              en: "Bite-relief treatment appropriate for each child's age — 1",
              zh: '适合各年龄段儿童的止痒用品 — 1 支',
            },
            tier: 'useful',
          },
          {
            id: 'med-childrens-sunscreen',
            text: { en: "Children's sunscreen — already listed", zh: '儿童防晒霜 — 已列入清单' },
            tier: 'must',
          },
          {
            id: 'med-adult-sunscreen',
            text: { en: 'Adult sunscreen — already listed', zh: '成人防晒霜 — 已列入清单' },
            tier: 'must',
          },
        ],
      },
      {
        id: 'med-adults',
        title: { en: 'Adults', zh: '成人' },
        items: [
          {
            id: 'med-adult-medicines',
            text: {
              en: "Regular personal medicines — 10 days' worth, not merely 8",
              zh: '日常个人用药 — 10 天的量，而不只是 8 天',
            },
            tier: 'must',
          },
          {
            id: 'med-adult-paracetamol',
            text: { en: 'Paracetamol/acetaminophen — 1 pack', zh: '对乙酰氨基酚 — 1 盒' },
            tier: 'useful',
          },
          {
            id: 'med-adult-ibuprofen',
            text: {
              en: 'Ibuprofen — 1 pack if normally tolerated',
              zh: '布洛芬 — 1 盒，前提是平时能耐受',
            },
            tier: 'useful',
          },
          {
            id: 'med-adult-antihistamine',
            text: { en: 'Adult antihistamine — 1 pack', zh: '成人抗过敏药 — 1 盒' },
            tier: 'useful',
          },
          {
            id: 'med-adult-stomach',
            text: {
              en: 'Adult stomach/diarrhea medicine normally used — 1',
              zh: '成人常用的肠胃药／止泻药 — 1 份',
            },
            tier: 'useful',
          },
          {
            id: 'med-adult-motion-sickness',
            text: {
              en: 'Motion-sickness medicine if anyone needs it — 1',
              zh: '晕车药（有人需要的话）— 1 份',
            },
            tier: 'useful',
          },
        ],
      },
      {
        id: 'med-toddler',
        title: { en: 'Toddler — 2 years 8 months', zh: '幼儿——2岁8个月' },
        note: {
          en: "Use children's fever medicines according to his current weight and your pediatrician/label instructions, rather than relying purely on age.",
          zh: '儿童退烧药应根据他当前的体重以及儿科医生／说明书的指导来给药，不能只按年龄估算。',
        },
        items: [
          {
            id: 'med-toddler-paracetamol',
            text: {
              en: "Children's paracetamol/acetaminophen — 1 bottle",
              zh: '儿童对乙酰氨基酚 — 1 瓶',
            },
            tier: 'must',
          },
          {
            id: 'med-toddler-ibuprofen',
            text: {
              en: "Children's ibuprofen — 1 bottle if he has used it safely before",
              zh: '儿童布洛芬 — 1 瓶，前提是他以前用过且无不良反应',
            },
            tier: 'useful',
          },
          {
            id: 'med-toddler-syringe',
            text: { en: 'Oral medication syringe — 2', zh: '口服给药器（喂药针筒）— 2 支' },
            tier: 'must',
          },
          {
            id: 'med-toddler-saline',
            text: { en: 'Saline nasal drops/spray — 1', zh: '生理盐水滴鼻剂／鼻腔喷雾 — 1 瓶' },
            tier: 'must',
          },
          {
            id: 'med-toddler-aspirator',
            text: {
              en: 'Nasal aspirator if you still use one — 1',
              zh: '吸鼻器（如果还在用）— 1 个',
            },
            tier: 'useful',
          },
          {
            id: 'med-toddler-ors',
            text: { en: 'ORS — shared family supply', zh: '口服补液盐 — 全家共用一份' },
            tier: 'must',
          },
          {
            id: 'med-toddler-prescriptions',
            text: {
              en: 'Any usual prescribed medicine — trip supply + spare',
              zh: '平时服用的处方药 — 行程用量 + 备用一份',
            },
            tier: 'must',
          },
          {
            id: 'med-toddler-vitamin-d',
            text: { en: 'His usual vitamin D/AD — 10 doses', zh: '他平时吃的维生素 D／AD — 10 次剂量' },
            tier: 'must',
          },
        ],
      },
      {
        id: 'med-baby',
        title: { en: 'Baby — 7 months', zh: '婴儿——7个月' },
        note: {
          en: "I wouldn't add anti-diarrheal medicines such as adult-style antimotility drugs for either child unless their doctor specifically tells you to. For infants and toddlers, hydration is the priority. Seek medical care for persistent vomiting, blood in stool, substantial reduction in wet diapers/urination, unusual sleepiness/lethargy, significant dehydration, or high/persistent fever.",
          zh: '除非医生明确要求，否则不要给两个孩子使用成人型止泻药（抗蠕动药）这类止泻药物。对婴儿和幼儿来说，补足水分才是第一位的。如果出现持续呕吐、大便带血、尿布湿得明显减少／排尿明显减少、异常嗜睡／精神萎靡、明显脱水，或高烧／持续发烧，请立即就医。',
        },
        items: [
          {
            id: 'med-baby-paracetamol',
            text: {
              en: 'Infant paracetamol/acetaminophen — 1 bottle if previously recommended',
              zh: '婴儿对乙酰氨基酚 — 1 瓶，前提是此前医生推荐过',
            },
            tier: 'must',
          },
          {
            id: 'med-baby-ibuprofen',
            text: {
              en: "Infant ibuprofen — only if her doctor/label says it is appropriate for her age/weight and she's well hydrated",
              zh: '婴儿布洛芬 — 仅当医生／说明书确认适合她的年龄和体重、且她水分充足时才带',
            },
            tier: 'useful',
          },
          {
            id: 'med-baby-syringe',
            text: { en: 'Medication syringe — 1', zh: '喂药针筒 — 1 支' },
            tier: 'must',
          },
          {
            id: 'med-baby-saline',
            text: { en: 'Saline nose drops — 1', zh: '生理盐水滴鼻剂 — 1 瓶' },
            tier: 'must',
          },
          {
            id: 'med-baby-aspirator',
            text: { en: 'Nasal aspirator — 1', zh: '吸鼻器 — 1 个' },
            tier: 'useful',
          },
          {
            id: 'med-baby-vitamin-d',
            text: { en: 'Her usual vitamin D/AD — 10 doses', zh: '她平时吃的维生素 D／AD — 10 次剂量' },
            tier: 'must',
          },
          {
            id: 'med-baby-diarrhea-medicine',
            text: {
              en: "Daughter's diarrhea medicine — the specific medicine already prescribed/advised for her",
              zh: '女儿的止泻药 — 医生已为她开好／建议的那种',
            },
            tier: 'must',
          },
          {
            id: 'med-baby-dose-instructions',
            text: {
              en: 'Written/photo instructions showing dose — 1',
              zh: '写好的／拍照的用药剂量说明 — 1 份',
            },
            tier: 'must',
          },
          {
            id: 'med-baby-ors',
            text: { en: 'ORS — shared supply', zh: '口服补液盐 — 共用一份' },
            tier: 'must',
          },
        ],
      },
    ],
  },
];
