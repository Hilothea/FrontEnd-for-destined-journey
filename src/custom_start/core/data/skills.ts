import { Skill } from '../types';

/**
 * 初始技能
 */
interface Skills {
  [key: string]: Skill[];
}

// 主动技能
export const ActiveSkills: Skills = {
  // 战技
  Combat: [
    // 白
    {
      name: '冲锋',
      type: '主动',
      cost: 10,
      rarity: 'common',
      description: '快速突进并击倒一名敌人，造成小范围震慑。消耗50 SP。',
    },
    {
      name: '招架反击',
      type: '主动',
      cost: 10,
      rarity: 'common',
      description: '使用武器或盾牌招架一次攻击后，快速挥舞武器进行一次反击。消耗50 SP。',
    },
    {
      name: '蓄力射击',
      type: '主动',
      cost: 15,
      rarity: 'common',
      description: '消耗体力，对单体目标进行一次蓄力射击，视目标的护甲和防御可能造成贯穿效果。消耗60 SP。',
    },
    {
      name: '蓄力打击',
      type: '主动',
      cost: 15,
      rarity: 'common',
      description: '消耗体力，短暂蓄力后对单体目标进行一次强力攻击，使用重型武器时伤害会获得加值。消耗60 SP。',
    },
    {
      name: '阴影步',
      type: '主动',
      cost: 20,
      rarity: 'common',
      description: '融入阴影，进行短距离的瞬间移动，用于突袭或脱战。消耗40 SP, 40 MP。',
    },
    {
      name: '箭步圆舞',
      type: '主动',
      cost: 20,
      rarity: 'common',
      description: '向前迅速踏步，接着蹲身蓄力后使用武器横扫周身。消耗50 SP。',
    },
    {
      name: '剑刃连击',
      type: '主动',
      cost: 25,
      rarity: 'common',
      description: '挥舞剑刃类武器进行极快速的连续两次横斩。消耗60 SP。',
    },
    {
      name: '瞬拔',
      type: '主动',
      cost: 25,
      rarity: 'common',
      description: '以极快的速度拔出武器，对前方单体目标进行一次迅速的攻击(不限武器种类)。消耗50 SP。',
    },
    {
      name: '风暴足',
      type: '主动',
      cost: 35,
      rarity: 'common',
      description: '单脚跺地在周身小范围卷起旋风，小幅击退近身敌人。消耗50 SP。',
    },
    {
      name: '撼地',
      type: '主动',
      cost: 35,
      rarity: 'common',
      description:
        '短暂蓄力后使用重型武器砸地，使周身小体型敌人失衡，然后立刻挥舞武器进行一次回旋横扫攻击。消耗70 SP。',
    },
    {
      name: '狮子斩',
      type: '主动',
      cost: 35,
      rarity: 'common',
      description: '蓄力后朝前方跳跃，用武器进行一次强力敲击，使用重型武器时伤害会获得加值。消耗70 SP。',
    },
    {
      name: '鲜血斩击',
      type: '主动',
      cost: 35,
      rarity: 'common',
      description: '以自身鲜血附魔剑刃，挥出血刃造成一次极限8米的远程伤害。消耗50 HP。',
    },
    {
      name: '辉石迅击',
      type: '主动',
      cost: 35,
      rarity: 'common',
      description: '剑覆辉石，横扫放出极限6米的短程光刃。消耗60 MP。',
    },
    {
      name: '真空斩',
      type: '主动',
      cost: 50,
      rarity: 'common',
      description: '蓄力后挥出强力的直线剑气，极限15米射程。消耗100 SP。',
    },
    {
      name: '英勇战吼',
      type: '主动',
      cost: 50,
      rarity: 'common',
      description: '发出震耳欲聋的战吼，激励友军并击退敌人，短暂提升团队士气。消耗100 SP。',
    },
  ],
  // 法术
  Magic: [
    // 白
    {
      name: '魔法伎俩',
      type: '主动',
      cost: 10,
      rarity: 'common',
      description:
        '你可以消耗微少的魔力，使用出例如:点燃火苗、小型幻象、魔法烟花、一小捧水、一阵微风等没什么威力但是还算实用的魔法效果。消耗10 MP。',
    },
    {
      name: '德鲁伊伎俩',
      type: '主动',
      cost: 10,
      rarity: 'common',
      description:
        '你可以消耗微少的以太，使用出例如:预测未来6小时天气、让种子瞬间发芽、制造小花或落叶、关闭或打开花瓣等微小影响的自然效果。消耗10 MP。',
    },
    {
      name: '星光',
      type: '主动',
      cost: 10,
      rarity: 'common',
      description:
        '消耗魔力在头顶创造出蓝色的微小光源，照亮周围区域，在黑暗环境中提供持续照明，持续一小时。消耗10 MP。',
    },
    {
      name: '法师之手',
      type: '主动',
      cost: 20,
      rarity: 'common',
      description: '使用魔力凝聚一只无形的手，可以远程抓取或移动最多1kg物品、开锁或拿取小物品，持续10分钟。消耗20 MP。',
    },
    {
      name: '次级幻影',
      type: '主动',
      cost: 15,
      rarity: 'common',
      description: '你可以创造一个不超过2立方的静止幻影，可以发出声音，持续1分钟，可提前取消。消耗20 MP。',
    },
    {
      name: '奥术飞弹',
      type: '主动',
      cost: 10,
      rarity: 'common',
      description:
        '使用纯粹的魔力迅速凝聚一颗小型的深蓝色奥术飞弹射向目标，飞弹具有轻微的追踪效果，极限射程50米。消耗30 MP。',
    },
    {
      name: '辉石迅魔砾',
      type: '主动',
      cost: 30,
      rarity: 'common',
      description: '快速发射小型辉石魔砾，造成少量的纯粹魔力伤害。消耗30 MP。',
    },
    {
      name: '护盾术',
      type: '主动',
      cost: 20,
      rarity: 'common',
      description: '为你自己或一名队友制造一个魔力护盾，吸收最高200点伤害。消耗50 MP。',
    },
    {
      name: '侦测魔法',
      type: '主动',
      cost: 50,
      rarity: 'common',
      description: '侦测半径20米内的魔法陷阱与生物。消耗80 MP。',
    },
    {
      name: '秘法锁',
      type: '主动',
      cost: 50,
      rarity: 'common',
      description:
        '你触碰一个关着的门、窗、容器或出入口，并使目标被魔法上锁。秘法锁无法被任何非魔法方式解锁。消耗80 MP。',
    },
    {
      name: '勇气',
      type: '主动',
      cost: 30,
      rarity: 'common',
      description:
        '使目标在60秒内不会逃跑，并让目标的生命值和体力值上限提高一小部分，对方如果精神属性比你高且进行抗拒则会失效。惑心学派的小伎俩。消耗50 MP。',
    },
    {
      name: '愤怒',
      type: '主动',
      cost: 30,
      rarity: 'common',
      description:
        '使目标在60秒内会攻击所有看得见的任何东西，对方如果精神属性比你高且进行抗拒则会失效。惑心学派的小伎俩。消耗50 MP。',
    },
    {
      name: '平静',
      type: '主动',
      cost: 30,
      rarity: 'common',
      description: '使目标会停止攻击30秒，对方如果精神属性比你高且进行抗拒则会失效。惑心学派的小伎俩。消耗50 MP。',
    },
    {
      name: '恐惧',
      type: '主动',
      cost: 30,
      rarity: 'common',
      description:
        '使目标会感到恐惧并立刻逃跑30秒，对方如果精神属性比你高且进行抗拒则会失效。惑心学派的小伎俩。消耗50 MP。',
    },
    {
      name: '火蛇术',
      type: '主动',
      cost: 35,
      rarity: 'common',
      description:
        '经典的塑能学派法术，控制烈焰如蟒蛇般缠绕攻击单体目标，在30秒内持续造成火属性伤害和效果。消耗80 MP。',
    },
    {
      name: '奥术洪流',
      type: '主动',
      cost: 35,
      rarity: 'common',
      description: '凝聚纯粹的魔力对单体目标发射亮蓝色的魔力光束，附带微弱的冲击效果。消耗80 MP。',
    },
    {
      name: '闪电斗篷',
      type: '主动',
      cost: 35,
      rarity: 'common',
      description: '在自身周围生成跟随自身的微型闪电风暴，对附近的敌人造成雷电伤害，持续60秒。消耗80 MP。',
    },
    {
      name: '骸骨之矛',
      type: '主动',
      cost: 40,
      rarity: 'common',
      description: '由死亡能量凝聚成骨矛，飞速射向目标，附带轻度的贯穿效果。消耗90 MP。',
    },
    {
      name: '冰冻射线',
      type: '主动',
      cost: 40,
      rarity: 'common',
      description: '发射一道冰冷的射线，对目标造成寒冰属性伤害，并造成霜冻效果降低其行动速度。消耗90 MP。',
    },
    {
      name: '烈焰射线',
      type: '主动',
      cost: 40,
      rarity: 'common',
      description: '发射一道炽热的射线，对目标造成火焰属性伤害，并持续造成灼伤效果和伤害。消耗90 MP。',
    },
    {
      name: '燃烧之手',
      type: '主动',
      cost: 40,
      rarity: 'common',
      description: '一片稀薄的火焰将从你伸展的指尖向前射出。每个处于3米锥形内的目标受到火焰伤害和效果。消耗90 MP。',
    },
    {
      name: '电爪',
      type: '主动',
      cost: 40,
      rarity: 'common',
      description:
        '闪电从你的手中跃出，电击你尝试碰触的目标，对目标进行一次近战闪电属性法术攻击，附带麻痹效果。消耗90 MP。',
    },
    {
      name: '魔法辉剑',
      type: '主动',
      cost: 40,
      rarity: 'common',
      description: '召唤一次性的三柄悬浮周身的魔力辉剑，自动追踪并射向附近的目标，造成纯粹的魔法伤害。消耗100 MP。',
    },
    {
      name: '辉石大魔砾',
      type: '主动',
      cost: 45,
      rarity: 'common',
      description: '发射大型辉石魔砾，对目标造成较高的纯粹魔力伤害，附带贯穿效果。消耗100 MP。',
    },
    {
      name: '能量箭矢',
      type: '主动',
      cost: 50,
      rarity: 'common',
      description:
        '以弓为媒介，拉开弓弦凝聚能量箭矢。基础的能量箭矢为使用纯粹魔力凝聚的奥术箭矢。当持有元素亲和时可以凝聚对应的元素能量箭矢，会附带对应的元素效果(如霜冻、麻痹、凝滞等效果)。消耗100 MP。',
    },
    {
      name: '元素激流',
      type: '主动',
      cost: 50,
      rarity: 'common',
      description:
        '操作魔力并运用自身的元素亲和，迅速凝聚一道小型的元素激流，疾速射向目标，可对目标进行小幅度的追踪。射出时元素激流会根据自身的元素属性具现为相应的元素形态（如炽焰激流、锐利风刃、跃动雷链、穿刺冰锥、湍水激流、浊土激流、辉光射线、暗蚀飞弹等），命中时造成相应的元素伤害并附带微弱的元素效果（如点燃、撕裂、麻痹、霜冻、冲击、沉滞、净化、侵蚀）。评价:一个稀有且全面的塑能学派元素魔法。消耗100 MP。',
    },
    {
      name: '匕首之云',
      type: '主动',
      cost: 60,
      rarity: 'common',
      description: '你指定一点,在以该点为中心的5米立方区域内咒唤出旋转的魔力匕首。持续至多1分钟。消耗100 MP。',
    },
    {
      name: '粉碎音波',
      type: '主动',
      cost: 65,
      rarity: 'common',
      description:
        '你指定一点释放一阵持续10秒的震耳欲聋的噪音。以该点为中心半径3米球状区域内的所有目标受到魔力伤害和音波震荡的物理伤害。消耗100 MP。',
    },
    {
      name: '召唤不眠骸骨',
      type: '主动',
      cost: 65,
      rarity: 'common',
      description:
        ' 撕裂一道通往亡灵位面的裂隙，召唤出一只在徘徊在【无尽骸骨荒野】上的【不眠骸骨】为你作战，持续至主动解除或骨架溃散。【不眠骸骨】的等级始终与你【当前等级】保持一致，可召唤的【不眠骸骨】种类和形态受你【死亡亲和】技能等级影响。评价:一个极其稀有、充满了无限可能性的亡灵学派召唤法术，成长性极高，但受施法者自身实力限制极大。消耗100 MP。',
    },
    {
      name: '召唤星界生物',
      type: '主动',
      cost: 65,
      rarity: 'common',
      description:
        '  打开一道通往无垠星界的通道，召唤一只未知的【星界生物】为你作战，持续至主动解除或能量耗尽。【星界生物】的等级始终与你【当前等级】保持一致，其形态、种类和能力取决于你【次元共鸣】技能的等级和你所拥有的【次元道标】（例如特定的亲和或血脉）。评价:一个极其稀有、充满了无限可能性的咒法学派召唤法术，成长性极高，但受施法者自身的实力限制极大。消耗100 MP。',
    },
    {
      name: '召唤元素仆役',
      type: '主动',
      cost: 65,
      rarity: 'common',
      description:
        ' 打开一道元素裂隙，从中召唤出一只【元素仆役】为你作战，持续至主动解除或消散。【元素仆役】的等级将始终与你【当前等级】保持一致，可召唤的使魔种类和形态受你持有的【元素亲和】种类影响。评价:一个相当常见但全面的咒法学派召唤法术，成长性极高，但受施法者自身实力限制极大。消耗100 MP。',
    },
    {
      name: '召唤战争骷髅小队',
      type: '主动',
      cost: 80,
      rarity: 'common',
      description:
        ' 撕裂一道通往亡灵位面的裂隙，从【枯骨平原】召唤出一支【战争骷髅小队】为你作战，持续至主动解除或骨架溃散。【战争骷髅小队】由1名骷髅射手、1名骷髅狂战士（持骨制双刃战斧和投矛）和1名剑盾骷髅组成。【战争骷髅小队】的等级始终与你【当前等级】保持一致。评价:一个常规的低阶亡灵学派召唤法术，召唤骷髅大军的第一步，但只有骷髅。消耗100 MP。',
    },
  ],
  // 祷告
  Prayer: [
    {
      name: '祝福圣水',
      type: '主动',
      cost: 10,
      rarity: 'common',
      description: '使用制造圣水为队友恢复少量生命值，并可以净化部分毒性。消耗30 MP。',
    },
    {
      name: '祝福武器',
      type: '主动',
      cost: 20,
      rarity: 'common',
      description: '提升武器攻击力，并让其获得神圣属性，持续一小时。消耗60 MP。',
    },
    {
      name: '祝福护甲',
      type: '主动',
      cost: 20,
      rarity: 'common',
      description: '提升护甲防御力，并让其获得神圣属性，持续一小时。消耗60 MP。',
    },
    {
      name: '圣焰',
      type: '主动',
      cost: 10,
      rarity: 'common',
      description: '火焰般的光辉向10米内你所能看见的一个生物降下。消耗30 MP。',
    },
    {
      name: '光导箭',
      type: '主动',
      cost: 20,
      rarity: 'common',
      description:
        '一道闪耀光束击向20米内你所选择的一个生物,目标将受到光耀伤害,下一次对该目标进行的攻击检定具有优势。消耗70 MP。',
    },
    {
      name: '命令术',
      type: '主动',
      cost: 20,
      rarity: 'common',
      description:
        '你对10米内你所能看见的一个生物说出一个单词命令。目标必须成功通过一次感知豁免，否则将在它的下个回合遵循该命令。消耗70 MP。',
    },
    {
      name: '祝福术',
      type: '主动',
      cost: 20,
      rarity: 'common',
      description: '你触碰一个自愿生物。目标在下一次鉴定中获得加值。消耗70 MP。',
    },
    {
      name: '治愈真言',
      type: '主动',
      cost: 20,
      rarity: 'common',
      description: '10米内你所选且你能看见的一个生物回复一定量的生命值。消耗70 MP。',
    },
    {
      name: '沉默术',
      type: '主动',
      cost: 40,
      rarity: 'common',
      description:
        '5分钟内，任何声音都无法在10米内你所选择一点为中心的5米半径球体内被制造或传入其中，在里面不可能施放需要声音构材的法术。消耗90 MP。',
    },
    {
      name: '诚实之域',
      type: '主动',
      cost: 40,
      rarity: 'common',
      description: '你以你所为中心创造出一个5米半径球体范围，能够抵御谎言的魔法领域。消耗90 MP。',
    },
    {
      name: '次级复原术',
      type: '主动',
      cost: 40,
      rarity: 'common',
      description: '你触碰一个生物，并结束影响着它的任一个疾病或状态。消耗90 MP。',
    },
    {
      name: '目盲/耳聋术',
      type: '主动',
      cost: 40,
      rarity: 'common',
      description:
        '选择10米内你所能看见的一个生物以让它进行一次体质豁免。若它失败，则目标将在1分钟内目盲或耳聋（由你选择）。消耗90 MP。',
    },
    {
      name: '守护联结',
      type: '主动',
      cost: 40,
      rarity: 'common',
      description: '此法术守护着你触碰的一个自愿生物，且在你和目标之间创造一道神秘的链接直到法术结束。消耗90 MP。',
    },
    {
      name: '治愈祈祷',
      type: '主动',
      cost: 40,
      rarity: 'common',
      description: '最多六个10米内你所选择且你能看见的生物回复一定量的生命值。消耗90 MP。',
    },
    {
      name: '卜筮',
      type: '主动',
      cost: 40,
      rarity: 'common',
      description:
        '你从另一个世界的存在接受到一个预兆，揭露关于你在接下来30分钟内预计去做的一件具体行动的结果。消耗90 MP。',
    },
    {
      name: '至圣斩',
      type: '主动',
      cost: 50,
      rarity: 'common',
      description:
        '你攻击的目标受到额外光耀伤害。若目标为邪恶阵营、深渊生物、诅咒生物或亡灵生物，则此次伤害必定暴击。消耗100 MP。',
    },
    {
      name: '圣域术',
      type: '主动',
      cost: 50,
      rarity: 'common',
      description: '你以你所为中心创造出一个5米半径球体范围，友方单位获得优势。消耗80 MP。',
    },
    {
      name: '祝福光环',
      type: '被动',
      cost: 50,
      rarity: 'common',
      description: '散发神圣光芒，提升少许附近友军的士气、攻击力和防御力。',
    },
    { name: '恢复', type: '主动', cost: 20, rarity: 'common', description: '恢复自身一定量生命值。消耗60 MP。' },
    {
      name: '燃火',
      type: '主动',
      cost: 15,
      rarity: 'common',
      description: '从手中引发瞬间燃烧的火焰进行近距离攻击，可蓄力造成更高伤害。消耗30 MP。',
    },
    {
      name: '紧急恢复',
      type: '主动',
      cost: 18,
      rarity: 'common',
      description: '能在行动时执行，些微恢复自身生命值。消耗45 MP。',
    },
    {
      name: '圣防护',
      type: '主动',
      cost: 22,
      rarity: 'common',
      description: '赋予对象一层神圣帷幕提升自身魔法、精神防护，持续一定时间。消耗55 MP。',
    },
    {
      name: '雷电枪',
      type: '主动',
      cost: 25,
      rarity: 'common',
      description: '向前方发射雷电，击中小型怪后有僵直，可蓄力增加一段伤害。消耗70 MP。',
    },
    {
      name: '血焰刀刃',
      type: '主动',
      cost: 23,
      rarity: 'common',
      description: '在右手武器上附上血焰，攻击时引发燃烧并累积出血，持续一定时间。消耗65 MP。',
    },
    {
      name: '毒雾',
      type: '主动',
      cost: 25,
      rarity: 'common',
      description: '在前方形成一片毒雾，对雾中目标施加中毒累积。消耗40 MP。',
    },
    {
      name: '火焰啊，赐予我力量！',
      type: '主动',
      cost: 26,
      rarity: 'common',
      description: '使用后30秒内，提升自身物理和火属性伤害，加快精力回复。消耗75 MP。',
    },
    {
      name: '圣域',
      type: '主动',
      cost: 50,
      rarity: 'common',
      description: '将武器插地生成半径5米的光环，持续回血，敌人入内受光伤。消耗80 SP, 80 MP。',
    },
  ],
  // 其它
  Other: [
    {
      name: '图腾雕刻',
      type: '主动',
      cost: 45,
      rarity: 'common',
      description: '以灵木或兽骨为材，雕刻多种简易的普通品级先祖图腾，赋予范围内盟友持续祝福效果。',
    },
    {
      name: '净化饮食',
      type: '主动',
      cost: 20,
      rarity: 'common',
      description:
        '以你在所选10米内一点为中心，1.5米半径球体内的所有非魔法的食物和饮料被净化，且变得没有毒素和疾病。消耗80 MP。',
    },
    {
      name: '透视',
      type: '主动',
      cost: 30,
      rarity: 'common',
      description:
        '视觉可以直接穿透总计4米厚度的障碍物，直接看到建筑内部或人体内部，持续30秒，无法穿透带有魔法防御的目标。以人为目标释放时，对方如果精神属性比你高且进行抗拒则会失效。消耗60 MP。',
    },
    {
      name: '敲击术',
      type: '主动',
      cost: 30,
      rarity: 'common',
      description:
        '选择一个射程内你所能看见的一个物体。被寻常锁关住、钉住、或闩住的物体将被解锁、解封、或被解闩。如果该物体被复数道锁给锁上，则只有其中一个会被解锁。消耗80 MP。',
    },
  ],
};

// 被动技能
export const PassiveSkills: Skills = {
  // 战技
  Combat: [
    // 白
    {
      name: '初级徒手战斗掌握',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description: '掌握了最基础的徒手战斗技巧，毫无流派可言，但至少懂得最基础的发力方式。',
    },
    {
      name: '初级剑术掌握',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description: '掌握了最基础的剑术，至少挥剑时不会砍伤自己了。',
    },
    {
      name: '初级破甲武器掌握',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description: '掌握了最基础的手斧、单手锤等破甲武器的使用方式，至少拎起锤子砸下去的时候不会震伤自己的手腕了。',
    },
    {
      name: '初级长柄武器掌握',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description: '掌握了最基础的长柄武器使用方式，至少不会在挥动长柄时扭到自己的手了。',
    },
    {
      name: '初级弓弩掌握',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description: '掌握了最基础的弓弩使用方式，至少可以射一射固定靶了。',
    },
    {
      name: '初级火枪掌握',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description: '掌握了最基础的火枪使用方式，至少可以射一射固定靶了，装药时手别抖！',
    },
    {
      name: '健壮体魄',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description: '轻微增加抗击打能力和韧性。HP上限+200。',
    },
    { name: '精准命中', type: '被动', cost: 18, rarity: 'common', description: '大幅提升攻击的准确性，暴击几率增加。' },
  ],
  // 法术
  Magic: [
    // 白
    {
      name: '初级元素亲和',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description:
        '你能够初步感知并引导水、火、风、土、雷、冰、光、暗元素。评价:元素亲和是塑能学派元素法师们的基础天赋，“初级”代表你的这份天赋足够微弱和低劣，甚至无法分辨出到底你对哪种元素的亲和度更高。',
    },
    {
      name: '初级死亡亲和',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description:
        '你能够初步感知并引导死亡能量和负能量，并能够学会和使用粗浅的亡灵法术和诅咒法术。评价:死亡亲和是亡灵学派死灵法师和诅咒师的基础天赋，“初级”代表你的这份天赋足够微弱和低劣。',
    },
    {
      name: '初级抗拒之魂',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description:
        '你能够初步理解保护、阻碍与驱逐的真意，并能够学会和使用粗浅的保护法术、阻碍法术和驱逐法术。评价：抗拒之魂是防护学派防护法师的基础天赋，"初级"代表你的这份天赋足够微弱和低劣。',
    },
    {
      name: '初级次元支配',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description:
        '你能够初步感知到异次元共鸣和生物灵魂，并能够学会和使用粗浅的召唤法术、支配生物法術、以及空间法术。评价：次元支配是咒法学派咒法师的基础天赋，"初级"代表你的这份天赋足够微弱和低劣。',
    },
    {
      name: '初级预兆',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description:
        '你能够初步感知命运的轨迹和丝线，并能够学会和使用粗浅的预言法术和侦测法术。评价:预兆是预言学派预言学者们的基础天赋，“初级”代表你的这份天赋足够微弱和低劣。',
    },
    {
      name: '初级魅惑灵光',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description:
        '你能够初步感知生命灵魂的律动，魅力有轻微的提升，并能够学会和使用粗浅的惑控法术和欺瞒法术。评价：魅惑灵光是惑心学派惑控师的基础天赋，"初级"代表你的这份天赋足够微弱和低劣。',
    },
    {
      name: '初级镜之心',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description:
        '你能够初步分辨想象和现实的边界，并能够学会和使用粗浅的幻术与镜像法术。评价：镜之心是幻象学派幻术师的基础天赋，"初级"代表你的这份天赋足够微弱和低劣。',
    },
    {
      name: '初级物质转化',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description:
        '你能够初步理解“物质”的本质，并能够学会和使用粗浅的变化法术和炼金术。评价：物质转化是变化学派变形学者和炼金术师的基础天赋，"初级"代表你的这份天赋足够微弱和低劣。',
    },
  ],
  // 其它
  Other: [
    {
      name: '初级炼金术',
      type: '被动',
      cost: 20,
      rarity: 'common',
      description:
        '掌握基础炼金原理，能够配制普通品质的药剂、爆炸粉末，加工并处理普通品质的炼金材料。评价:基础中的基础，而且不包括附魔能力。',
    },
    {
      name: '初级锻造术',
      type: '被动',
      cost: 20,
      rarity: 'common',
      description:
        '学会熔炼与锤打常见金属，可打造普通品质的武器、工具与护甲，或是修复其上的轻微磨损。评价:基础中的基础，而且不包括附魔能力。',
    },
    {
      name: '次级附魔术',
      type: '被动',
      cost: 50,
      rarity: 'common',
      description:
        '学会在武器或护具上镌刻简易符文，可以赋予普通品质装备和物品最低级的附魔效果(如微光、轻盈、保温等)，最低级的附魔不提供任何战斗能力方面的加持，也不可能出现属性加值。评价:下一步是学会初级附魔术，小子。',
    },
    {
      name: '草药辨识',
      type: '被动',
      cost: 10,
      rarity: 'common',
      description: '通过色泽、气味与纹理辨认大部分常见草药，了解其基础效用、毒性及简易配伍方式。',
    },
    {
      name: '超凡感知',
      type: '被动',
      cost: 30,
      rarity: 'common',
      description: '感官能力得到极大强化，能够借助以太察觉常人无法察觉的信息和危险。',
    },
    {
      name: '语言大师',
      type: '被动',
      cost: 15,
      rarity: 'common',
      description: '能够快速学习并流利掌握任何遇到的语言。',
    },
  ],
};
