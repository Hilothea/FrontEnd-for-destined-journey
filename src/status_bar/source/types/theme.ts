/**
 * 主题颜色配置接口
 * 包含所有项目中实际使用的颜色
 */
export interface ThemeColors {
  // ===== 主背景和边框 =====
  /** 主背景色 (App.vue .layout) */
  background: string;
  /** 主背景透明度 (0-1) */
  backgroundOpacity: number;
  /** 主边框颜色 (App.vue .layout) */
  mainBorder: string;
  /** 主边框宽度 (px) */
  mainBorderWidth: number;

  // ===== 次级背景 =====
  /** 次级背景色 (WorldStatus, CommonStatus summary等) */
  backgroundSecondary: string;
  /** 三级背景色 (CommonStatus details-content) */
  backgroundTertiary: string;
  /** 三级背景透明度 (0-1) */
  backgroundTertiaryOpacity: number;

  // ===== 边框颜色系统 =====
  /** 浅色边框 (分隔线等) */
  borderLight: string;
  /** 深色边框 (CommonStatus等) */
  borderDark: string;

  // ===== 文本颜色系统 =====
  /** 主要文本色 (正文内容) */
  textPrimary: string;
  /** 次要文本色 (标签、属性名等) */
  textSecondary: string;
  /** 三级文本色 (标题等) */
  textTertiary: string;
  /** 淡化文本色 (placeholder、禁用状态等) */
  textMuted: string;

  // ===== 品质颜色系统 =====
  /** 唯一品质 */
  qualityUnique: string;
  /** 神话品质 */
  qualityMythic: string;
  /** 传说品质 */
  qualityLegendary: string;
  /** 史诗品质 */
  qualityEpic: string;
  /** 稀有品质 */
  qualityRare: string;
  /** 精良品质 */
  qualityUncommon: string;

  // ===== 资源条颜色 =====
  /** 生命值颜色 */
  resourceHp: string;
  /** 法力值颜色 */
  resourceMp: string;
  /** 体力值颜色 */
  resourceSp: string;
  /** 经验值颜色 */
  resourceExp: string;

  // ===== 按钮颜色 =====
  /** 按钮背景色 */
  buttonBg: string;
  /** 按钮悬停背景色 */
  buttonBgHover: string;
  /** 按钮文字颜色 */
  buttonText: string;

  // ===== 进度条颜色 =====
  /** 进度条背景色 */
  progressBarBg: string;
  /** 进度条填充色 (CommonStatus等) */
  progressBarFill: string;

  // ===== 特殊元素颜色 =====
  /** 激活状态星标 (CommonStatus icon-star) */
  starActive: string;
  /** 非激活状态星标 */
  starInactive: string;
  /** 好感度进度条 (DestinyCharacter - 正数) */
  affectionBar: string;
  /** 负好感度进度条 (DestinyCharacter - 负数) */
  affectionBarNegative: string;
  /** 重要新闻标题色 */
  newsImportant: string;
  /** 普通新闻标题色 */
  newsNormal: string;
  /** 次要新闻标题色 */
  newsMinor: string;

  // ===== CommonStatus 特殊状态 =====
  /** 禁用状态背景色 */
  disabledBg: string;
  /** 禁用状态文本色 */
  disabledText: string;
  /** 标题背景色 */
  titleBg: string;
  /** 标题悬停背景色 */
  titleBgHover: string;
  /** 打开状态背景色 */
  openBg: string;
  /** 打开状态边框色 */
  openBorderColor: string;
}

/**
 * 主题配置接口
 */
export interface Theme {
  id: string;
  name: string;
  colors: ThemeColors;
}

/**
 * 默认主题 - 经典羊皮纸风格
 * 基于项目现有颜色配置
 */
export const defaultTheme: Theme = {
  id: 'default',
  name: '经典羊皮纸',
  colors: {
    // 主背景和边框
    background: '#f0e6d2',
    backgroundOpacity: 1,
    mainBorder: '#785a4e',
    mainBorderWidth: 2,

    // 次级背景
    backgroundSecondary: '#e8ddcb',
    backgroundTertiary: '#fdfaf5',
    backgroundTertiaryOpacity: 0.9,

    // 边框颜色
    borderLight: '#d3c5b3',
    borderDark: '#c6b8a5',

    // 文本颜色
    textPrimary: '#4a3b31',
    textSecondary: '#6a514d',
    textTertiary: '#5d4037',
    textMuted: '#7a655d',

    // 品质颜色
    qualityUnique: '#ff6f00',
    qualityMythic: '#d32f2f',
    qualityLegendary: '#9e7121',
    qualityEpic: '#9c27b0',
    qualityRare: '#193c96',
    qualityUncommon: '#388e3c',

    // 资源条颜色
    resourceHp: '#D32F2F',
    resourceMp: '#1976D2',
    resourceSp: '#388E3C',
    resourceExp: '#FFA000',

    // 按钮颜色
    buttonBg: '#8d6e63',
    buttonBgHover: '#6d4c41',
    buttonText: '#ffffff',

    // 进度条颜色
    progressBarBg: '#c8bbaf',
    progressBarFill: '#bfa996',

    // 特殊元素颜色
    starActive: '#f7d75a',
    starInactive: '#a39281',
    affectionBar: '#ec407a',
    affectionBarNegative: '#ff6b6b',
    newsImportant: '#b9892d',
    newsNormal: '#6d4c41',
    newsMinor: '#c2185b',

    // CommonStatus 特殊状态
    disabledBg: '#e8e4e0',
    disabledText: '#b5aaa2',
    titleBg: '#d7c8b6',
    titleBgHover: '#cbb8a5',
    openBg: '#bfa996',
    openBorderColor: '#a39281',
  },
};
