import type { Equipment } from '../types';
import { NewTalismans } from './talismans';

interface EquipmentData {
  [key: string]: Equipment[];
}

/**
 * 初始装备数据
 */
const Equipments: EquipmentData = {
  // 法师武器
  MageWeapon: [
    // 白 (Common, cost1-15)
    {
      name: '学徒法杖',
      type: '武器',
      cost: 15,
      rarity: 'common',
      description: '白蜡木杖身经简单打磨，笔直无饰，顶端略粗，新手魔法师的标配，执于手中。',
    },
    {
      name: '雕花木短杖',
      type: '武器',
      cost: 10,
      rarity: 'common',
      description: '桦木削成的短杖，杖身刻有简单的几何纹路，无附魔，适合戏法或基础咒语，便于携带，藏于袖中。',
    },
    {
      name: '占卜水晶球',
      type: '武器',
      cost: 13,
      rarity: 'common',
      description: '劣质水晶打磨的球体，内里浑浊且有杂质，无附魔，可用于基础占卜或作为施法媒介，置于皮袋中。',
    },
    // 绿 (Uncommon, cost16-30)
    {
      name: '白橡木法杖',
      type: '武器',
      cost: 30,
      rarity: 'uncommon',
      description: '百年白橡木树心雕琢的法杖，杖身修长纤细，附魔专注+1，略微增强魔法效果并加速施法，拄于右手。',
    },
    {
      name: '学徒魔导书',
      type: '武器',
      cost: 27,
      rarity: 'uncommon',
      description:
        '硬质皮封面，书角以黄铜包裹，记录了数个基础法术，附魔智识+1，能帮助记忆法术，减少施法失败率，持于副手。',
    },
    {
      name: '火焰水晶',
      type: '武器',
      cost: 29,
      rarity: 'uncommon',
      description: '切割过的低纯度火水晶，被固定在黄铜底座上，附魔火焰亲和+1，能微弱增强火焰法术的威力，挂于腰间。',
    },
    // 蓝 (Rare, cost31-45)
    {
      name: '七光祈愿诗',
      type: '武器',
      cost: 42,
      rarity: 'rare',
      description:
        '以整块月光石细致打磨的单手长剑，象牙白的剑身刻有增幅魔法的彩色符文，七色宝石点缀其上。附魔了“多重法术增效”，既可挥砍亦可施法，在咏唱咒文时会散发流光溢彩的美感。佩于腰间。',
    },
    {
      name: '风暴之核法球',
      type: '武器',
      cost: 44,
      rarity: 'rare',
      description:
        '包裹在秘银框架中的风眼石，球体核心处有微型气旋在旋转。附魔了“风暴之力”，能增强风系法术的范围与冲击力，并小幅提升施法速度。悬浮于手边。',
    },
    {
      name: '奥术聚焦法杖',
      type: '武器',
      cost: 45,
      rarity: 'rare',
      description:
        '由抛光黑檀木制成，杖头镶嵌着一枚切割精巧的蓝宝石，杖身缠绕着细密的银丝符文。附魔了“奥术涌动”，能小幅提升持有者的法术强度与施法速度。是中阶法师们梦寐以求的施法媒介。执于手中。',
    },
  ],

  // 牧师武器
  ChaplainWeapon: [
    // 白 (Common, cost1-15)
    {
      name: '木制圣徽',
      type: '武器',
      cost: 7,
      rarity: 'common',
      description: '普通木料雕刻的太阳徽记，边缘粗糙，可作为施展神术的媒介，是见习牧师的身份证明，挂于颈上或握于手中。',
    },
    {
      name: '粗铁圣铃',
      type: '武器',
      cost: 9,
      rarity: 'common',
      description: '粗铁铸造的小型手铃，铃声沉闷，摇动时能引导微弱的神圣力量，用于简单的祈祷仪式，系于腰间。',
    },
    {
      name: '简易权杖',
      type: '武器',
      cost: 12,
      rarity: 'common',
      description: '硬木为柄，顶端镶嵌一块未经打磨的黄铜块，象征神权，用于增强祈祷效果，也可作为钝器使用，执于手中。',
    },
    // 绿 (Uncommon, cost16-30)
    {
      name: '祷告石锤',
      type: '武器',
      cost: 24,
      rarity: 'uncommon',
      description: '坚硬花岗岩打磨成的锤头，刻有基础的祈祷符文，附魔专注+1，能更好地引导神术能量，挂于腰际。',
    },
    {
      name: '白银圣铃',
      type: '武器',
      cost: 26,
      rarity: 'uncommon',
      description: '纯银铸造的精致手铃，摇动时铃声清脆悦耳，附魔祝福+1，能提升祝福类神术的效果，系于腰间。',
    },
    {
      name: '圣言书卷',
      type: '武器',
      cost: 28,
      rarity: 'uncommon',
      description: '抄录着基础祷文的羊皮纸卷轴，卷轴两端以镀银木材固定，附魔虔诚+1，诵读时可增强信仰之力，持于副手。',
    },
    // 蓝
    {
      name: '圣骨圣印记',
      type: '武器',
      cost: 40,
      rarity: 'rare',
      description:
        '以一位殉道圣徒的指骨为核心，包裹在纯银铸造的太阳徽记之中，整体散发着柔和的圣光。附魔了“神圣加护”，能显著增强治疗与防护类神术的效果，握于手中或作为圣物佩戴。',
    },
    {
      name: '天使之声圣铃',
      type: '武器',
      cost: 38,
      rarity: 'rare',
      description:
        '以稀有的音银矿铸造，铃声清澈悠远，仿佛经过天使祝福。附魔了“圣音共鸣”，摇动时能对亡灵和恶魔造成范围性的神圣伤害，并净化负面状态，系于腰间。',
    },
    {
      name: '审判钉锤',
      type: '武器',
      cost: 41,
      rarity: 'rare',
      description:
        '秘银打造的单手钉锤，锤头呈星芒状，中心镶嵌着一枚净化的光水晶。附魔了“圣光冲击”，击中敌人时会爆发小范围的神圣能量，对邪恶生物有额外伤害，挂于腰际。',
    },
  ],

  // 法袍
  RoleMagi: [
    // 白
    {
      name: '学徒法袍',
      type: '防具',
      cost: 22,
      rarity: 'common',
      description:
        '经典的法师样式，一定程度上能证明你法师学徒的身份，厚实的黑色粗棉布裁剪而成，带有宽大的兜帽，能遮蔽身形，穿套于全身。',
    },
    {
      name: '旅行者斗篷',
      type: '防具',
      cost: 20,
      rarity: 'common',
      description: '粗麻布材质，连带一个大兜帽，能防风防雨，提供轻微的防护与保暖，穿套于全身。',
    },
    // 绿
    {
      name: '法师长袍',
      type: '防具',
      cost: 50,
      rarity: 'uncommon',
      description:
        '经典的法师样式，一定程度上能证明你法师的身份，厚实的蓝色天鹅绒制成，袖口和衣边绣有银线魔法纹路，附魔专注+1，能微弱提升法术效果，穿套于全身。',
    },
    // 蓝
    {
      name: '奥术导师法袍',
      type: '防具',
      cost: 80,
      rarity: 'rare',
      description:
        '深蓝色天鹅绒与银丝线织成的华美法袍，袖口与领口绣有星辰图案，镶嵌多颗蓝宝石。附魔了“奥术增效”，能显著提升法术效果与魔力回复速度。穿套于全身。',
    },
    {
      name: '元素庇护长袍',
      type: '防具',
      cost: 75,
      rarity: 'rare',
      description:
        '以秘银丝线与防火布料混纺织成，布料上流动着四色元素的微光。附魔了“元素抗性”，能小幅抵抗水、火、风、土、雷、冰、光、暗元素的伤害。穿套于全身。',
    },
  ],

  // 近战武器
  MeleeWeapon: [
    // 白 (Common, cost1-15)
    {
      name: '精铁长剑',
      type: '武器',
      cost: 12,
      rarity: 'common',
      description: '由精铁反复锻打而成，剑体修长，开有血槽，韧性良好，适用于多种战斗场景，佩于腰间。',
    },
    {
      name: '宫廷刺剑',
      type: '武器',
      cost: 10,
      rarity: 'common',
      description: '精钢锻造的细长剑身，配有繁复的蝶形护手，轻巧灵活，是贵族决斗的常用武器，佩于腰间。',
    },
    {
      name: '手半剑',
      type: '武器',
      cost: 13,
      rarity: 'common',
      description: '优质铁材锻造，剑柄长度可供单手或双手握持，战术灵活多变，佩于腰侧。',
    },
    {
      name: '十字大剑',
      type: '武器',
      cost: 15,
      rarity: 'common',
      description: '精铁铸造的双刃重剑，配有长长的十字形护手，需双手挥动，威力巨大，负于背后。',
    },
    {
      name: '环首刀',
      type: '武器',
      cost: 10,
      rarity: 'common',
      description: '铁制单刃直身刀，刀柄末端带有一个铁环，重心靠前，劈砍有力，佩于腰间。',
    },
    {
      name: '弯刀',
      type: '武器',
      cost: 11,
      rarity: 'common',
      description: '铁质单刃弯刀，弧度适中，利于马背上的劈砍与划割，常见于炎热地带的战士，佩于腰侧。',
    },
    {
      name: '刺杀匕首',
      type: '武器',
      cost: 6,
      rarity: 'common',
      description: '精铁锻制，刃体短小轻薄且异常锋利，专为隐蔽和刺杀设计，藏于靴内或腰间。',
    },
    {
      name: '猎人砍刀',
      type: '武器',
      cost: 8,
      rarity: 'common',
      description: '宽厚铁刃的短柄砍刀，重心在前，适合劈砍植被与处理猎物，是野外生存的实用工具，别于腰后。',
    },
    {
      name: '双手巨斧',
      type: '武器',
      cost: 14,
      rarity: 'common',
      description: '沉重的双刃铁斧头，安装在坚固的木柄上，需双手挥动，破甲能力极强，负于背后。',
    },
    {
      name: '硬头锤',
      type: '武器',
      cost: 9,
      rarity: 'common',
      description: '铁铸的方形锤头，一端呈锥形，安装在木柄上，打击力集中，可有效对付盔甲，挂于腰际。',
    },
    {
      name: '链锤',
      type: '武器',
      cost: 11,
      rarity: 'common',
      description: '带刺的铁球通过铁链连接至握柄，挥动时能产生巨大冲击，是经典的破甲武器，缠于腰间。',
    },
    {
      name: '长柄战斧',
      type: '武器',
      cost: 12,
      rarity: 'common',
      description: '长木柄顶端配有厚重的单刃斧头，兼具攻击范围与杀伤力，适于战场上对抗多人，执于手中。',
    },
    {
      name: '制式长矛',
      type: '武器',
      cost: 8,
      rarity: 'common',
      description: '坚韧木杆配上简单的铁制枪头，长度优势使其利于在阵线中控制距离，通常直立持握。',
    },
    {
      name: '陌刀',
      type: '武器',
      cost: 15,
      rarity: 'common',
      description: '长柄双刃大刀，刀身宽阔，斩击范围广，是步兵对抗骑兵的利器，需双手执握。',
    },
    {
      name: '钩镰枪',
      type: '武器',
      cost: 13,
      rarity: 'common',
      description: '在长枪的枪刃侧面额外带有一个弯钩，可用于钩拉敌人或割断马腿，功能多样，执于手中。',
    },
    {
      name: '鞭刃',
      type: '武器',
      cost: 14,
      rarity: 'common',
      description: '由多节带刃的铁片以铁环连接而成，可如鞭般挥甩，也可收拢如剑，变幻莫测，缠于腰间。',
    },
    {
      name: '拳剑',
      type: '武器',
      cost: 10,
      rarity: 'common',
      description: '铁制H形握柄，两端延伸出锋利的短刃，适合近身缠斗刺杀，难以防御，藏于袖中。',
    },
    {
      name: '拳刺',
      type: '武器',
      cost: 5,
      rarity: 'common',
      description: '一体成型的铁制指虎，带有四个尖锐的短刺，能极大增强拳击的杀伤力，戴于手指。',
    },
    // 绿
    {
      name: '钢锋长剑',
      type: '武器',
      cost: 28,
      rarity: 'uncommon',
      description: '百炼精钢锻造，笔直剑身带有清晰的血槽，附魔锋利+1，平衡性极佳，是老练战士的可靠选择，佩于腰间。',
    },
    {
      name: '蜂鸟刺剑',
      type: '武器',
      cost: 26,
      rarity: 'uncommon',
      description: '百炼钢锻造的极细剑身，护手镀金并雕有花纹，附魔精准+1，突刺速度极快，难以格挡，佩于腰间。',
    },
    {
      name: '碎甲战锤',
      type: '武器',
      cost: 26,
      rarity: 'uncommon',
      description: '钢制的多棱角锤头，配以坚固的硬木长柄，附魔破甲+1，重心靠前，专为摧毁重甲而设计，双手持握。',
    },
    {
      name: '迅捷手半剑',
      type: '武器',
      cost: 27,
      rarity: 'uncommon',
      description: '精钢锻造的轻量化剑身，剑柄可供单双两用，附魔迅捷+1，能微弱提升攻击速度，佩于腰侧。',
    },
    {
      name: '新月弯刀',
      type: '武器',
      cost: 26,
      rarity: 'uncommon',
      description: '优质精钢打造的弯刃，拥有优美的新月弧线，附魔撕裂+1，能造成持续流血的伤口，佩于腰侧。',
    },
    {
      name: '破甲长矛',
      type: '武器',
      cost: 25,
      rarity: 'uncommon',
      description: '硬木长杆配上三棱形精钢枪头，附魔穿刺+1，其长度优势与穿透力使其易于穿透装甲，执于手中。',
    },
    {
      name: '碎颅巨斧',
      type: '武器',
      cost: 29,
      rarity: 'uncommon',
      description: '巨大的精钢双刃斧头，斧柄经过加固，附魔破甲+1，专为破坏重型护甲与坚固工事而设计，负于背后。',
    },
    {
      name: '流星链锤',
      type: '武器',
      cost: 24,
      rarity: 'uncommon',
      description: '比常规更大的带刺铁球，通过加固的铁链连接，附魔冲击+1，挥动时冲击力巨大，适于破甲，缠于腰间。',
    },
    {
      name: '毒蛇拳剑',
      type: '武器',
      cost: 22,
      rarity: 'uncommon',
      description: '精钢打造的H形握柄，双刃涂有弱效麻痹毒素，附魔迅捷+1，提升攻击速度，藏于袖中。',
    },
    {
      name: '影袭匕首',
      type: '武器',
      cost: 20,
      rarity: 'uncommon',
      description: '黑铁锻制的无反光匕首，刃体轻薄，附魔精准+1，能微弱提升造成致命一击的几率，藏于靴内或腰间。',
    },
    {
      name: '裂铠钩镰枪',
      type: '武器',
      cost: 28,
      rarity: 'uncommon',
      description: '精钢枪头侧面焊接了强化的弯钩，附魔钩拉+1，更易于钩住并撕裂敌人的铠甲，执于手中。',
    },
    {
      name: '斩马陌刀',
      type: '武器',
      cost: 30,
      rarity: 'uncommon',
      description:
        '加长加宽的精钢刀刃，安装在坚韧的长杆上，附魔斩击+1，巨大的斩击范围使其成为对抗骑兵的噩梦，需双手执握。',
    },
    {
      name: '撼地硬头锤',
      type: '武器',
      cost: 23,
      rarity: 'uncommon',
      description: '实心精钢打造的锤头，表面布满凸起，附魔粉碎+1，能轻易击碎骨骼与岩石，挂于腰际。',
    },
    // 蓝
    {
      name: '炽焰附魔长剑',
      type: '武器',
      cost: 42,
      rarity: 'rare',
      description:
        '百炼钢精心锻造的剑身，十字护手中央镶嵌着一枚炽热的红宝石。附魔了“火焰之力”，挥舞时剑刃会缠绕高温流炎，对敌人造成持续灼烧伤害。是喜爱狂野攻势的战士之选。佩于腰间。',
    },
    {
      name: '圣光十字大剑',
      type: '武器',
      cost: 42,
      rarity: 'rare',
      description:
        '镀银钢铁铸造的宽刃大剑，剑身厚重，中心蚀刻着光芒圣徽。附魔了“圣光灌注”，能对亡灵与恶魔生物造成额外的神圣伤害。是圣殿骑士的标准配装。负于背后。',
    },
    {
      name: '熔岩重剑',
      type: '武器',
      cost: 43,
      rarity: 'rare',
      description:
        '黑钢与火山岩融合锻造的宽刃巨剑，剑身中心嵌有一枚跳动的熔火核心。附魔了“熔岩爆发”，重击地面时能产生小范围的岩浆喷溅。破坏力惊人但极为沉重。负于背后。',
    },
    {
      name: '潮汐三叉戟',
      type: '武器',
      cost: 42,
      rarity: 'rare',
      description:
        '以深海寒铁锻造，三个戟刃如波浪般起伏，中心镶嵌着纯净的海蓝宝石。附魔了“潮汐之力”，攻击时能掀起强烈的水流冲击，扰乱敌人阵脚。是海洋神殿护卫的武器。执于手中。',
    },
    {
      name: '风暴战斧',
      type: '武器',
      cost: 40,
      rarity: 'rare',
      description:
        '陨铁打造的对称双面战斧，斧面光滑，中心镶嵌着一枚微缩的风眼宝石。附魔了“旋风斩击”，全力挥舞时能够在周身产生强劲的气旋。需要双手才能驾驭。双手持握。',
    },
    {
      name: '冰霜使者战斧',
      type: '武器',
      cost: 40,
      rarity: 'rare',
      description:
        '极北寒铁铸成的双刃战斧，斧面天然覆盖着一层难以融化的冰霜。附魔了“冰霜能量”，挥砍时释放的冻气有几率冻结敌人的伤口，延缓其行动。负于背后。',
    },
    {
      name: '雷霆之锤',
      type: '武器',
      cost: 38,
      rarity: 'rare',
      description:
        '由一整块陨铁打造的方形锤头，表面镶嵌着数颗不规则的雷晶石。附魔了“雷电冲击”，击中目标时会迸发耀眼的电弧，能够小幅震退敌人。挂于腰际。',
    },
    {
      name: '月光双刃',
      type: '武器',
      cost: 38,
      rarity: 'rare',
      description:
        '月光金属熔铸而成的弧形双刀，刃面在暗处会流动着清冷的微光。附魔了“月光斩击”，使其在夜间的攻击力得到显著提升。是月精灵斥候的挚爱。交叉负于背后。',
    },
    {
      name: '暗影匕首',
      type: '武器',
      cost: 36,
      rarity: 'rare',
      description:
        '陨铁混合黑曜石粉末锻造的漆黑刃身，几乎不反射任何光线。附魔了“暗影侵蚀”，造成伤害的同时能够暂时削弱敌人的力量。是刺客执行任务的理想工具。藏于靴内。',
    },
    {
      name: '荆棘鞭刃',
      type: '武器',
      cost: 35,
      rarity: 'rare',
      description:
        '由数十个锋利钢片通过魔化荆棘链接而成的柔性武器，可鞭可刺。附魔了“撕裂缠绕”，攻击时能汲取少量生命力反哺持有者。缠于腰间。',
    },
  ],

  // 远程武器
  RangedWeapon: [
    // 白 (Common, cost1-15)
    {
      name: '复合短弓',
      type: '武器',
      cost: 11,
      rarity: 'common',
      description: '木材与兽角层压复合制成的弓身，拉力适中，精度良好，是猎人与斥候的常用武器，挎于肩后。',
    },
    {
      name: '长弓',
      type: '武器',
      cost: 13,
      rarity: 'common',
      description: '由一整根紫杉木制成，弓身修长，射程远，需要较强的臂力才能拉开，执于手中。',
    },
    {
      name: '十字弩',
      type: '武器',
      cost: 15,
      rarity: 'common',
      description: '铁质的弩臂与木制弩托构成，通过机械结构上弦，精度高但装填缓慢，适合城防与狙击，挂于肩后。',
    },
    // 绿
    {
      name: '鹰眼长弓',
      type: '武器',
      cost: 28,
      rarity: 'uncommon',
      description: '杉木与角复合层压制成，弓梢雕刻着鹰眼符文，附魔精准+1，射程与精度均超越普通长弓，挎于肩后。',
    },
    {
      name: '燧发手铳',
      type: '武器',
      cost: 30,
      rarity: 'uncommon',
      description:
        '黄铜枪管与胡桃木枪托，采用后置装药的燧发击锤结构，附魔稳定+1，能略微减少射击时的偏差，收于腰侧枪套。',
    },
    {
      name: '猎手复合弩',
      type: '武器',
      cost: 29,
      rarity: 'uncommon',
      description: '钢制弩臂与硬木弩托，结构经过优化，附魔精准+1，精度极高但装填速度依旧缓慢，挂于肩后。',
    },
    {
      name: '线膛燧发步枪',
      type: '武器',
      cost: 30,
      rarity: 'uncommon',
      description: '钢制长枪管内刻有膛线，配有木制枪托，附魔精准+1，能进行超远距离的精准射击，执于手中。',
    },
    {
      name: '精准飞刀',
      type: '武器',
      cost: 18,
      rarity: 'uncommon',
      description: '一套三柄的精钢飞刀，经过精心平衡，附魔精准+1，极大地提升了投掷的命中率，藏于袖中。',
    },
    // 蓝
    {
      name: '魔导步枪·鹰隼',
      type: '武器',
      cost: 45,
      rarity: 'rare',
      description:
        '精致胡桃木枪托与钢制长枪管的完美结合，内置微型魔晶石作为动力源。附魔了“精准射击”，是进行超远距离狙击的致命利器。挂于肩后。',
    },
    {
      name: '赤焰手炮',
      type: '武器',
      cost: 44,
      rarity: 'rare',
      description:
        '青铜铸造的短管手炮，枪身粗犷，以大型魔晶石作为激发装置。附魔了“爆裂射击”，射出的弹丸在接触目标后会产生小范围的火焰爆炸。挂于腰侧。',
    },
    {
      name: '风语者长弓',
      type: '武器',
      cost: 43,
      rarity: 'rare',
      description:
        '白蜡木与精灵藤蔓制成的弓身，中央镶嵌着一枚通透的风晶石。附魔了“风之指引”，射出的箭矢会附加气旋，显著提升飞行速度与精度。挎于肩后。',
    },
    {
      name: '魔能左轮·毒蛇',
      type: '武器',
      cost: 41,
      rarity: 'rare',
      description:
        '精钢锻造的六发转轮手枪，握把处有蛇鳞纹理，采用魔晶石击发装置。附魔了“穿透弹幕”，子弹能穿透常规护甲和魔法屏障。收于腰侧枪套。',
    },
    {
      name: '幽魂手枪',
      type: '武器',
      cost: 39,
      rarity: 'rare',
      description:
        '黑檀木握把与镂空银制枪身的奇特组合，能直接击发灵魂能量。附魔了“灵魂汲取”，伤害敌人的同时能为使用者恢复少量魔力。收于腰侧。',
    },
    {
      name: '雷霆投枪',
      type: '武器',
      cost: 37,
      rarity: 'rare',
      description:
        '坚硬的铁木枪杆与钢制三棱枪尖，枪尖后部镶嵌着一枚雷晶石。附魔了“闪电投掷”，投掷后可自动返回使用者手中，无需回收。负于背后。',
    },
    {
      name: '魔晶手弩',
      type: '武器',
      cost: 37,
      rarity: 'rare',
      description:
        '紧凑的钢制弩身，以魔晶石为动力源，可实现快速上弦。附魔了“追踪箭矢”，射出的弩箭能小幅度自动修正轨迹，提高命中率。绑于小臂。',
    },
  ],

  // 副手武器
  OffHandWeapon: [
    // 白 (Common, cost1-15)
    {
      name: '投石索',
      type: '副手',
      cost: 3,
      rarity: 'common',
      description: '由两股皮绳和一个皮兜组成，用于高速投掷石块，是最简易的远程装备，收于腰间。',
    },
    {
      name: '投掷短刺',
      type: '副手',
      cost: 5,
      rarity: 'common',
      description: '铁制纺锤形尖锐短刺，经过配重平衡，无任何附魔，适合快速投掷以骚扰敌人，藏于袖中。',
    },
    {
      name: '格挡匕首',
      type: '副手',
      cost: 6,
      rarity: 'common',
      description: '加宽的铁质匕首，带有向上弯曲的护手，专门用于格挡与反击，持于副手。',
    },
    {
      name: '小手斧',
      type: '副手',
      cost: 5,
      rarity: 'common',
      description: '短柄单刃铁斧，重量均衡，既可近身劈砍，也适合投掷，别于腰后。',
    },
    {
      name: '钩刀',
      type: '副手',
      cost: 7,
      rarity: 'common',
      description: '短柄单刃刀，刀尖处带有一个锐利的弯钩，可钩拉对手的武器或盔甲，挂于腰间。',
    },
    {
      name: '短鞭',
      type: '副手',
      cost: 4,
      rarity: 'common',
      description: '厚皮革编织而成的短柄软鞭，末端加重，主要用于抽打以扰乱对手节奏，卷于腰际。',
    },
    // 绿
    {
      name: '格挡短剑',
      type: '副手',
      cost: 19,
      rarity: 'uncommon',
      description: '加宽的钢制剑身与大型碟形护手，经过韧性处理，附魔格挡+1，专为招架重击而设计，持于副手。',
    },
    {
      name: '护卫匕首',
      type: '副手',
      cost: 20,
      rarity: 'uncommon',
      description: '精钢锻造，带有宽大的S形护手，附魔格挡+1，在格挡的同时能有效反击，持于副手。',
    },
    {
      name: '飞掷手斧',
      type: '副手',
      cost: 18,
      rarity: 'uncommon',
      description: '短柄单刃精钢斧，斧身轻巧，附魔投掷+1，投掷时飞行轨迹更稳定，别于腰后。',
    },
    {
      name: '破甲钩刀',
      type: '副手',
      cost: 21,
      rarity: 'uncommon',
      description: '短柄带钩单刃，由精钢打造，附魔破甲+1，钩刃能更有效地撕开铁甲缝隙，挂于腰间。',
    },
    {
      name: '刺棘短鞭',
      type: '副手',
      cost: 17,
      rarity: 'uncommon',
      description: '皮革编织的鞭身中镶嵌了细小的钢刺，附魔扰乱+1，抽打时能给敌人造成持续的骚扰，卷于腰际。',
    },
    // 蓝
    {
      name: '暗影格斗爪',
      type: '副手',
      cost: 34,
      rarity: 'rare',
      description:
        '与臂甲一体的黑钢利爪，爪刃锋利，护臂坚固。附魔了“暗影撕裂”，格挡成功后的反击会附带暗影伤害，令敌人难以防御。戴于副手。',
    },
    {
      name: '闪电投刃',
      type: '副手',
      cost: 31,
      rarity: 'rare',
      description:
        '边缘锋利的精钢圆刃，中心镶嵌着雷晶石，整体平衡极佳。附魔了“闪电回旋”，投掷后能自动返回，并电击路径上的所有敌人。藏于袖中。',
    },
  ],

  // 副手防具
  OffHandArmor: [
    // 白 (Common, cost1-15)
    {
      name: '小圆盾',
      type: '副手',
      cost: 5,
      rarity: 'common',
      description: '直径约一臂长的小型铁面圆盾，轻便灵活，利于快速格挡对手的攻击，挽于前臂。',
    },
    {
      name: '结实的木盾',
      type: '副手',
      cost: 6,
      rarity: 'common',
      description: '多层木板压制并覆盖皮革的圆形盾牌，中央有铁质盾心，提供可靠的基础防护，挽于左臂。',
    },
    {
      name: '筝形盾',
      type: '副手',
      cost: 8,
      rarity: 'common',
      description: '上宽下窄的木质筝形设计，能有效保护躯干，是步兵冲锋时的标准配置，挽于左臂。',
    },
    {
      name: '塔盾',
      type: '副手',
      cost: 10,
      rarity: 'common',
      description: '与人等高的大型木质长方盾，边缘以铁皮加固，提供全面的防护但极为笨重，常立于地面作为掩体。',
    },
    {
      name: '臂铠',
      type: '副手',
      cost: 6,
      rarity: 'common',
      description: '由数片铁甲和皮带构成的臂甲，保护整个前臂，可用于格挡刀剑，缚于小臂。',
    },
    // 绿
    {
      name: '钢制鸢盾',
      type: '副手',
      cost: 22,
      rarity: 'uncommon',
      description: '橡木盾体正面覆盖了一层薄钢片，呈水滴形，附魔坚韧+1，防护面积大且更为坚固，挽于左臂。',
    },
    {
      name: '百炼圆盾',
      type: '副手',
      cost: 24,
      rarity: 'uncommon',
      description: '由百炼精钢冲压而成的小型圆盾，轻便灵活，附魔格挡+1，能更轻松地偏转攻击，挽于前臂。',
    },
    {
      name: '格挡臂铠',
      type: '副手',
      cost: 23,
      rarity: 'uncommon',
      description: '多层精钢甲片铆接而成，完全包裹前臂，附魔防护+1，在格挡时能提供更强的保护，缚于小臂。',
    },
    {
      name: '巨熊塔盾',
      type: '副手',
      cost: 30,
      rarity: 'uncommon',
      description: '大型精钢包边盾牌，正面绘有熊头纹章，附魔坚韧+1，提供全面的防护，但极为笨重，立于地面。',
    },
    // 蓝
    {
      name: '圣光护符盾',
      type: '副手',
      cost: 37,
      rarity: 'rare',
      description:
        '银制的小型鸢盾，盾面中心镶嵌着一枚散发柔光的圣晶石。附魔了“神圣守护”，能有效抵抗黑暗与亡灵能量的侵蚀。战斗时挽于手臂，平时可作护符挂于胸前。',
    },
    {
      name: '符文鸢盾',
      type: '副手',
      cost: 36,
      rarity: 'rare',
      description:
        '坚韧橡木制成的鸢形盾牌，表面覆盖着秘银薄片，其上雕刻着密集的防护符文。附魔了“魔法偏转”，有一定几率使指向性法术偏离轨道。挽于左臂。',
    },
    {
      name: '奥术典籍',
      type: '副手',
      cost: 35,
      rarity: 'rare',
      description:
        '幼龙皮制成的封面，书页由银箔制成，书脊处镶嵌着幽蓝水晶。附魔了“法术护盾”，能自动格挡一次低级法术的攻击。持于副手。',
    },
    {
      name: '风暴招架器',
      type: '副手',
      cost: 35,
      rarity: 'rare',
      description:
        '轻质合金打造的臂甲，外侧有数道精密的导流槽。附魔了“风力偏转”，能有效改变远程物理攻击的弹道，保护使用者。绑于小臂。',
    },
    {
      name: '荆棘圆盾',
      type: '副手',
      cost: 34,
      rarity: 'rare',
      description:
        '钢铁铸造的圆形盾牌，盾面遍布淬毒的魔化荆棘尖刺。附魔了“荆棘反伤”，在成功格挡近战攻击时，会将部分伤害反射给攻击者。挽于前臂。',
    },
    {
      name: '烈焰护手',
      type: '副手',
      cost: 33,
      rarity: 'rare',
      description:
        '由火蜥蜴的皮革制成，手背处镶嵌着一枚温热的红宝石。附魔了“火焰吸收”，可抵挡火系伤害并将其转化为能量，用于下一次攻击。戴于副手。',
    },
    {
      name: '冰晶小盾',
      type: '副手',
      cost: 32,
      rarity: 'rare',
      description:
        '由深层冰川的冰核锻造的透明圆盾，盾体坚硬无比，寒气四溢。附魔了“冰霜反射”，承受攻击时能将寒气导入攻击者的武器，短暂冻结对方。挽于前臂。',
    },
  ],

  // 防具
  Armor: [
    // 白 (Common, cost1-15)
    {
      name: '棉甲套装',
      type: '防具',
      cost: 20,
      rarity: 'common',
      description: '多层亚麻布或棉布缝合填充而成，提供最基础的防护，聊胜于无，，穿于上下身，保护身体。',
    },
    {
      name: '镶钉皮甲套装',
      type: '防具',
      cost: 28,
      rarity: 'common',
      description: '在硬质皮革的基底上镶嵌了密集的铁钉，在保持灵活性的同时增强了对劈砍的防护，穿于上下身，保护身体。',
    },
    {
      name: '皮革头盔',
      type: '防具',
      cost: 5,
      rarity: 'common',
      description: '硬化皮革缝制而成的简易头盔，仅能覆盖头顶，提供最基础的冲击防护，戴于头部。',
    },
    {
      name: '铁质护鼻盔',
      type: '防具',
      cost: 5,
      rarity: 'common',
      description: '锅形的铁盔，前方铆接一根向下的铁条以保护鼻梁，是军队中的常见装备，戴于头顶。',
    },
    {
      name: '皮手套',
      type: '防具',
      cost: 5,
      rarity: 'common',
      description: '鞣制过的厚实皮革缝制，保护手掌与手指，防止武器磨损，戴于双手。',
    },
    {
      name: '铁质护手',
      type: '防具',
      cost: 5,
      rarity: 'common',
      description: '覆盖手背的铁片，通过皮带固定，能防护手部在格挡时受到的劈砍，戴于手部。',
    },
    {
      name: '皮革靴',
      type: '防具',
      cost: 5,
      rarity: 'common',
      description: '牛皮制成的结实短靴，靴底较厚，能保护脚部并适应长途旅行，穿于双脚。',
    },
    {
      name: '铁质护足',
      type: '防具',
      cost: 5,
      rarity: 'common',
      description: '由多块铰接铁片构成的足部护甲，通常套在靴子外面，保护双脚。',
    },
    // 绿
    {
      name: '隐匿皮甲套装',
      type: '防具',
      cost: 55,
      rarity: 'uncommon',
      description: '染成黑色的柔软皮革缝制，剪裁贴身，附魔隐匿+1，能微弱降低行动时发出的噪音，穿于上下身，保护身体。',
    },
    {
      name: '链甲套装',
      type: '防具',
      cost: 55,
      rarity: 'uncommon',
      description: '由数千个精钢环编织而成的全身链甲套装，附魔坚韧+1，能有效防御切割与劈砍，穿于上下身，保护身体。',
    },
    {
      name: '骑士板甲套装',
      type: '防具',
      cost: 60,
      rarity: 'uncommon',
      description: '一体成型的精钢板甲，附魔坚韧+1，防御力极强，是骑士的核心护具，穿于上下身，保护身体。',
    },
    {
      name: '鳞甲套装',
      type: '防具',
      cost: 55,
      rarity: 'uncommon',
      description: '将大量小型钢片像鳞片一样层叠固定在皮甲上，附魔防护+1，能有效防御劈砍，穿于上下身，保护身体。',
    },
    {
      name: '旅者皮衣套装',
      type: '防具',
      cost: 50,
      rarity: 'uncommon',
      description: '硬质皮革缝制，内侧有柔软衬垫，附魔耐力+1，能减轻长途跋涉带来的疲劳，穿于上下身，保护身体。',
    },
    {
      name: '守护者面盔',
      type: '防具',
      cost: 17,
      rarity: 'uncommon',
      description: '精钢打造的封闭式头盔，完全覆盖头部和面部，附魔防护+1，提供全面的头部防护，戴于头部。',
    },
    {
      name: '强化护鼻盔',
      type: '防具',
      cost: 18,
      rarity: 'uncommon',
      description:
        '钢制头盔带有一个可活动的护鼻，内衬加厚皮革，附魔防护+1，在不影响视野的情况下提升了防护性，戴于头部。',
    },
    {
      name: '巨熊之力手套',
      type: '防具',
      cost: 18,
      rarity: 'uncommon',
      description: '鞣制熊皮制成，手背处缝有加固的铁片，附魔力量+1，能微弱提升使用者的抓握力量，戴于双手。',
    },
    {
      name: '铁握板甲手套',
      type: '防具',
      cost: 22,
      rarity: 'uncommon',
      description: '由多块精钢甲片铰接而成，完全覆盖手部，附魔力量+1，能显著增强拳击的力量，戴于双手。',
    },
    {
      name: '旅者长靴',
      type: '防具',
      cost: 19,
      rarity: 'uncommon',
      description: '高筒皮革靴，靴底坚固耐磨，附魔耐力+1，能减少长途旅行中的疲劳感，穿于双脚。',
    },
    {
      name: '镶钢板甲靴',
      type: '防具',
      cost: 21,
      rarity: 'uncommon',
      description: '皮革靴身的关键部位，如脚背和脚踝，都镶嵌了钢片，附魔稳固+1，提供了额外的保护，穿于双脚。',
    },
    {
      name: '重装板甲靴',
      type: '防具',
      cost: 27,
      rarity: 'uncommon',
      description: '完全由精钢甲片构成的重型战靴，附魔稳固+1，能有效防御下段攻击，代价是牺牲了灵活性，穿于双脚。',
    },
    // 蓝
    {
      name: '骑士板甲套装·坚毅',
      type: '防具',
      cost: 85,
      rarity: 'rare',
      description:
        '以精钢锻造成型的板甲套装，表面打磨光滑，边缘雕刻着守护符文。附魔了“物理抗性”，能有效减少穿着者受到的挥砍与钝击伤害。是战场前线人员的可靠保障。穿于上下身，保护身体。',
    },
    {
      name: '元素抵抗链甲套装',
      type: '防具',
      cost: 85,
      rarity: 'rare',
      description:
        '由数千个细小的秘银环编织而成，环间镶嵌着代表四元素的微小宝石。附魔了“元素平衡”，能均衡地抵抗各类元素伤害，泛用性强。穿于上下身，保护身体。',
    },
    {
      name: '影遁皮甲套装',
      type: '防具',
      cost: 85,
      rarity: 'rare',
      description:
        '用暗影豹的毛皮缝制，关键部位镶嵌着吸收光线的黑曜石。附魔了“阴影隐匿”，能让使用者更容易地融入阴影，躲避敌人的侦查。穿于上下身，保护身体。',
    },
    {
      name: '巨熊之力链甲套装',
      type: '防具',
      cost: 85,
      rarity: 'rare',
      description:
        '精钢链甲套装，织网编织着象征力量的巨熊符文。附魔了“力量增强”，能显著提升穿着者的爆发力与冲击力。穿于上下身，保护身体。',
    },
    {
      name: '遁风游侠皮甲套装',
      type: '防具',
      cost: 85,
      rarity: 'rare',
      description:
        '由魔化丝绸与软皮缝制，镶嵌着轻盈的风晶石。附魔了“轻身术”，能让穿着者的移动更加迅速，闪避更加灵敏。穿于上下身，保护身体。',
    },
    {
      name: '谎言假面',
      type: '防具',
      cost: 38,
      rarity: 'rare',
      description:
        '一张轻薄的、可以完美贴合面部的秘银面具。佩戴后，可以完美隐藏你的微表情，并对精神系的探查魔法有极高的抗性。还能让你在说谎时心跳和体温都不会有任何变化。',
    },
    {
      name: '龙鳞头盔',
      type: '防具',
      cost: 38,
      rarity: 'rare',
      description:
        '用亚种火飞龙的鳞片与精钢锻造而成的全覆式头盔，带有可开合的面甲。附魔了“火焰抗性”，能有效抵抗高温环境与火焰法术的伤害。戴于头部。',
    },
    {
      name: '洞察头冠',
      type: '防具',
      cost: 35,
      rarity: 'rare',
      description:
        '由秘银打造的简约头冠，眉心处镶嵌着一颗纯净的蓝宝石。附魔了“法术洞察”，能帮助佩戴者更快地感知和解析周围的魔法波动。戴于额头。',
    },
    {
      name: '符文皮帽',
      type: '防具',
      cost: 33,
      rarity: 'rare',
      description:
        '由魔化野牛皮缝制而成，帽檐内侧刻满了微型警示符文。附魔了“法术警觉”，当侦测到恶意的魔法波动时，符文会发出微光预警。戴于头部。',
    },
    {
      name: '铁握之力护手',
      type: '防具',
      cost: 37,
      rarity: 'rare',
      description:
        '布满划痕的精钢护手，指关节和手背处雕刻着力量符文。附魔了“蛮力”，能显著提升佩戴者的抓握与打击力量。戴于双手。',
    },
    {
      name: '法师之手手套',
      type: '防具',
      cost: 34,
      rarity: 'rare',
      description:
        '银色丝绸编织而成，手背处用奥术水晶粉末绣出了复杂的魔法阵。附魔了“施法加速”，能提升需要手势施法时的速度与流畅度。戴于双手。',
    },
    {
      name: '风行者长靴',
      type: '防具',
      cost: 36,
      rarity: 'rare',
      description:
        '由柔软的鹿皮制成，靴底刻有风系符文，两侧镶嵌着风晶石。附魔了“疾行”，能提升移动速度并消除脚步声，适合快速潜行。穿于双脚。',
    },
    {
      name: '旅行者秘法护腿',
      type: '防具',
      cost: 35,
      rarity: 'rare',
      description:
        '耐磨皮革与帆布制成的实用护腿，内侧口袋里藏着一枚微小的空间宝石。附魔了“减轻负担”，能极大缓解长途跋涉带来的疲劳感。穿于腿部。',
    },
    {
      name: '岩石践踏者',
      type: '防具',
      cost: 35,
      rarity: 'rare',
      description:
        '硬化皮革与钢板结合制成的重型战靴，靴底厚重如岩石。附魔了“稳固”，能让穿着者在冲击下稳如磐石，难以被击退或摔倒。穿于双脚。',
    },
    {
      name: '水行靴',
      type: '防具',
      cost: 33,
      rarity: 'rare',
      description:
        '由防水的海兽皮革制成，靴边镶嵌着数颗水蓝宝石。附魔了“水上行走”，能让使用者在水面上短时间站立或行走。穿于双脚。',
    },
  ],

  // 饰品
  Jewelry: [
    // 白 (Common, cost1-15)
    {
      name: '银戒指',
      type: '饰品',
      cost: 4,
      rarity: 'common',
      description: '普通的银质指环，设计简单无纹饰，可作为附魔的基底或用作信物，戴于手指。',
    },
    {
      name: '皮制护符',
      type: '饰品',
      cost: 3,
      rarity: 'common',
      description: '皮绳系着一个小皮袋，内装一些草药或祝福石片，提供心理安慰，可用于附魔，挂于颈部。',
    },
    {
      name: '铜质手镯',
      type: '饰品',
      cost: 2,
      rarity: 'common',
      description: '铜料打造的开口手镯，做工粗糙，但十分耐用，是佣兵和冒险者中常见的饰品，戴于手腕。',
    },
    {
      name: '骨制项链',
      type: '饰品',
      cost: 5,
      rarity: 'common',
      description: '用野兽的牙齿或小块骨头串成，象征着猎人的勇气与狩猎技能，挂于胸前。',
    },
    {
      name: '镶嵌宝石的胸针',
      type: '饰品',
      cost: 13,
      rarity: 'common',
      description: '银质的叶形胸针，中央镶嵌着一颗廉价的小宝石，能增强佩戴者的魅力，别于胸前。',
    },
    // 绿
    {
      name: '精准指环',
      type: '饰品',
      cost: 18,
      rarity: 'uncommon',
      description: '银环上镶嵌着一颗打磨过的猫眼石，附魔精准+1，能微弱提升远程攻击的稳定性，戴于手指。',
    },
    {
      name: '防护项链',
      type: '饰品',
      cost: 19,
      rarity: 'uncommon',
      description: '银链悬挂着一个经过圣水净化的微缩盾牌吊坠，附魔格挡+1，能自动格挡一次微弱的物理伤害，挂于颈部。',
    },
    {
      name: '敏捷靴刺',
      type: '饰品',
      cost: 18,
      rarity: 'uncommon',
      description: '安装在靴跟的钢制马刺，附魔敏捷+1，能微弱提升使用者的移动速度，装于靴跟。',
    },
    {
      name: '守护护符',
      type: '饰品',
      cost: 18,
      rarity: 'uncommon',
      description: '银质的圆形护身符，刻有守护法阵，附魔防护+1，能自动生成一个临时结界格挡微弱的法术伤害，挂于颈部。',
    },
    // 蓝
    {
      name: '生命守护项链',
      type: '饰品',
      cost: 38,
      rarity: 'rare',
      description:
        '秘银链条串起一颗色泽温润的生命宝石，散发着柔和的绿光。附魔了“生命活力”，能缓慢而持续地治愈佩戴者的伤势。挂于颈部。',
    },
    {
      name: '法师护盾发生器',
      type: '饰品',
      cost: 37,
      rarity: 'rare',
      description:
        '银制圆盘上镶嵌着多颗充能水晶，构成一个微型魔法阵。附魔了“法力护盾”，在遭受攻击时会自动生成一个临时的魔法护盾进行防御。挂于腰间。',
    },
    {
      name: '雷霆之力手镯',
      type: '饰品',
      cost: 36,
      rarity: 'rare',
      description:
        '粗糙的钢制手镯，表面镶嵌着一颗随时可能迸发电流的雷晶石。附魔了“雷电之力”，佩戴者的物理攻击有一定几率附加电击效果。戴于手腕。',
    },
    {
      name: '精准瞄准镜',
      type: '饰品',
      cost: 35,
      rarity: 'rare',
      description:
        '黄铜镜筒与多层水晶镜片构成的精密炼金造物。附魔了“鹰眼术”，能大幅提升远程武器的瞄准精度与有效射程。装于枪械或弓弩上。',
    },
    {
      name: '元素抗性护符',
      type: '饰品',
      cost: 34,
      rarity: 'rare',
      description:
        '五色宝石环绕着一枚银制的圆形护符，象征着五种主要元素。附魔了“元素防护”，能均衡地提升对各类元素伤害的抗性。挂于胸前。',
    },
    {
      name: '暗影隐匿徽章',
      type: '饰品',
      cost: 33,
      rarity: 'rare',
      description:
        '由黑铁铸造的乌鸦形态徽章，表面雕刻着复杂的潜行符文。附魔了“阴影融合”，能帮助佩戴者更好地融入阴影，降低被发现的几率。别于衣内。',
    },
    {
      name: '奥术能量指环',
      type: '饰品',
      cost: 32,
      rarity: 'rare',
      description:
        '简约的银环上镶嵌着一颗切割完美的奥术水晶。附魔了能量涌动，能够持续为佩戴者恢复少量魔力，是法师续航的保障。戴于手指。',
    },
    {
      name: '敏捷之羽靴刺',
      type: '饰品',
      cost: 31,
      rarity: 'rare',
      description:
        '固定在靴跟的钢制马刺，末端点缀着一根轻盈的狮鹫羽毛。附魔了“灵动”，能提升佩戴者的闪避能力与身体平衡感。装于靴跟。',
    },
  ],
};

/**
 * 新增法环护符拓展
 */
Equipments.Talismans = NewTalismans

export default Equipments;