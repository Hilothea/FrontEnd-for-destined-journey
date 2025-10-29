import { RARITY_MAP } from '../data/constants';
import type { Background, CharacterConfig, DestinedOne, Equipment, Item, Skill } from '../types';

/**
 * 解析货币描述，提取金币、银币、铜币数量
 */
function parseCurrency(description: string): { gold: number; silver: number; copper: number } {
  const result = { gold: 0, silver: 0, copper: 0 };

  // 匹配金币
  const goldMatch = description.match(/(\d+)金币/);
  if (goldMatch) result.gold = parseInt(goldMatch[1]);

  // 匹配银币
  const silverMatch = description.match(/(\d+)银币/);
  if (silverMatch) result.silver = parseInt(silverMatch[1]);

  // 匹配铜币
  const copperMatch = description.match(/(\d+)铜币/);
  if (copperMatch) result.copper = parseInt(copperMatch[1]);

  return result;
}

/**
 * 将角色数据写入到 MVU 变量中
 * 同时写入聊天变量和消息楼层变量，防止被覆盖
 */
export async function writeCharacterToMvu(
  character: CharacterConfig,
  items: Item[],
  skills: Skill[],
  destinedOnes: DestinedOne[],
): Promise<void> {
  // 等待 Mvu 初始化
  await waitGlobalInitialized('Mvu');

  // 获取聊天变量的 MVU 数据（主要存储位置）
  const chatMvuData = Mvu.getMvuData({ type: 'chat' });

  // 获取最新消息楼层的 MVU 数据（备份位置）
  const messageMvuData = Mvu.getMvuData({ type: 'message', message_id: 'latest' });

  // 过滤掉自定义数据（只写入预设数据到 MVU）
  const presetSkills = skills.filter(skill => !skill.isCustom);
  const presetItems = items.filter(item => !item.isCustom);
  const presetDestinedOnes = destinedOnes.filter(one => !one.isCustom);

  // 写入命运点数到两个位置
  await Mvu.setMvuVariable(chatMvuData, '命定系统.命运点数', character.destinyPoints);
  await Mvu.setMvuVariable(messageMvuData, '命定系统.命运点数', character.destinyPoints);

  // 写入技能（只写入预设技能）到两个位置
  const chatSkillList = (await Mvu.getMvuVariable(chatMvuData, '技能列表', { default_value: {} })) || {};
  const messageSkillList = (await Mvu.getMvuVariable(messageMvuData, '技能列表', { default_value: {} })) || {};
  for (const skill of presetSkills) {
    console.log(`  写入技能: ${skill.name}`);
    const skillData = {
      品质: RARITY_MAP[skill.rarity] || '普通',
      类型: skill.type,
      消耗: skill.consume || '',
      标签: skill.tag,
      效果: skill.effect,
      描述: skill.description,
    };
    chatSkillList[skill.name] = skillData;
    messageSkillList[skill.name] = skillData;
  }
  await Mvu.setMvuVariable(chatMvuData, '技能列表', chatSkillList);
  await Mvu.setMvuVariable(messageMvuData, '技能列表', messageSkillList);

  // 写入道具（只写入预设道具，区分货币和普通道具）到两个位置
  const chatBackpack = (await Mvu.getMvuVariable(chatMvuData, '财产.背包', { default_value: {} })) || {};
  const messageBackpack = (await Mvu.getMvuVariable(messageMvuData, '财产.背包', { default_value: {} })) || {};

  for (const item of presetItems) {
    // 检查是否是货币类型
    if (item.type === '货币') {
      // 解析货币描述，提取金币、银币、铜币
      const currency = parseCurrency(item.description);

      // 写入到两个位置的货币变量
      if (currency.gold > 0) {
        const chatGold = await Mvu.getMvuVariable(chatMvuData, '财产.货币.金币', { default_value: 0 });
        await Mvu.setMvuVariable(chatMvuData, '财产.货币.金币', chatGold + currency.gold);

        const messageGold = await Mvu.getMvuVariable(messageMvuData, '财产.货币.金币', { default_value: 0 });
        await Mvu.setMvuVariable(messageMvuData, '财产.货币.金币', messageGold + currency.gold);
      }
      if (currency.silver > 0) {
        const chatSilver = await Mvu.getMvuVariable(chatMvuData, '财产.货币.银币', { default_value: 0 });
        await Mvu.setMvuVariable(chatMvuData, '财产.货币.银币', chatSilver + currency.silver);

        const messageSilver = await Mvu.getMvuVariable(messageMvuData, '财产.货币.银币', { default_value: 0 });
        await Mvu.setMvuVariable(messageMvuData, '财产.货币.银币', messageSilver + currency.silver);
      }
      if (currency.copper > 0) {
        const chatCopper = await Mvu.getMvuVariable(chatMvuData, '财产.货币.铜币', { default_value: 0 });
        await Mvu.setMvuVariable(chatMvuData, '财产.货币.铜币', chatCopper + currency.copper);

        const messageCopper = await Mvu.getMvuVariable(messageMvuData, '财产.货币.铜币', { default_value: 0 });
        await Mvu.setMvuVariable(messageMvuData, '财产.货币.铜币', messageCopper + currency.copper);
      }
    } else {
      // 普通道具添加到两个位置的背包对象中
      console.log(`  写入道具: ${item.name}`);
      const itemData = {
        品质: RARITY_MAP[item.rarity] || '普通',
        数量: 1,
        类型: item.type,
        标签: item.tag,
        效果: item.effect,
        描述: item.description,
      };
      chatBackpack[item.name] = itemData;
      messageBackpack[item.name] = itemData;
    }
  }

  // 写回两个位置的背包对象
  await Mvu.setMvuVariable(chatMvuData, '财产.背包', chatBackpack);
  await Mvu.setMvuVariable(messageMvuData, '财产.背包', messageBackpack);

  // 写入命定之人（只写入预设命定之人）到两个位置
  const chatDestinedOnes = (await Mvu.getMvuVariable(chatMvuData, '命定系统.命定之人', { default_value: {} })) || {};
  const messageDestinedOnes =
    (await Mvu.getMvuVariable(messageMvuData, '命定系统.命定之人', { default_value: {} })) || {};

  for (const one of presetDestinedOnes) {
    // 创建命定之人数据对象
    const oneData: Record<string, any> = {
      是否在场: '是',
      生命层级: one.lifeLevel,
      等级: one.level,
      种族: one.race,
      身份: [...one.identity, '$__META_EXTENSIBLE__$'],
      职业: [...one.career, '$__META_EXTENSIBLE__$'],
      性格: one.personality,
      喜爱: one.like,
      外貌特质: one.app,
      衣物装饰: one.cloth,
      属性: {
        力量: one.attributes.strength,
        敏捷: one.attributes.dexterity,
        体质: one.attributes.constitution,
        智力: one.attributes.intelligence,
        精神: one.attributes.mind,
      },
      登神长阶: {
        是否开启: one.stairway.isOpen ? '是' : '否',
      },
      是否缔结契约: one.isContract,
      好感度: one.affinity,
      评价: one.comment || '',
      背景故事: one.backgroundInfo || '',
      装备: {},
      技能: {},
    };

    // 添加装备
    for (const eq of one.equip) {
      if (eq.name) {
        oneData.装备[eq.name] = {
          品质: eq.rarity ? RARITY_MAP[eq.rarity] || '普通' : '普通',
          类型: eq.type || '',
          标签: eq.tag || '',
          效果: eq.effect || '',
          描述: eq.description || '',
        };
      }
    }

    // 添加技能
    for (const skill of one.skills) {
      oneData.技能[skill.name] = {
        品质: RARITY_MAP[skill.rarity] || '普通',
        类型: skill.type,
        消耗: skill.consume || '',
        标签: skill.tag,
        效果: skill.effect,
        描述: skill.description,
      };
    }

    // 将命定之人添加到两个位置的对象中
    chatDestinedOnes[one.name] = oneData;
    messageDestinedOnes[one.name] = oneData;
  }

  // 写回两个位置的命定之人对象
  await Mvu.setMvuVariable(chatMvuData, '命定系统.命定之人', chatDestinedOnes);
  await Mvu.setMvuVariable(messageMvuData, '命定系统.命定之人', messageDestinedOnes);

  // 保存两个位置的 MVU 数据
  await Mvu.replaceMvuData(chatMvuData, { type: 'chat' });
  await Mvu.replaceMvuData(messageMvuData, { type: 'message', message_id: 'latest' });

  console.log('✅ 预设数据已成功写入聊天变量和消息楼层变量');
}

/**
 * 生成发送给 AI 的提示词数据
 */
export function generateAIPrompt(
  character: CharacterConfig,
  equipments: Equipment[],
  destinedOnes: DestinedOne[],
  background: Background | null,
  items: Item[],
  skills: Skill[],
): string {
  const parts: string[] = [];

  parts.push('# 角色创建信息\n');

  // 基本信息
  const displayGender = character.gender === '自定义' ? character.customGender : character.gender;
  const displayRace = character.race === '自定义' ? character.customRace : character.race;
  const displayIdentity = character.identity === '自定义' ? character.customIdentity : character.identity;
  const displayLocation =
    character.startLocation === '自定义' ? character.customStartLocation : character.startLocation;

  parts.push(`## 基本信息`);
  parts.push(`- 姓名：${character.name}`);
  parts.push(`- 性别：${displayGender}`);
  parts.push(`- 年龄：${character.age} 岁`);
  parts.push(`- 种族：${displayRace}`);
  parts.push(`- 身份：${displayIdentity}`);
  parts.push(`- 出生地：${displayLocation}`);
  parts.push(`- 等级：Lv.${character.level}`);

  // 角色属性
  const finalAttrs = {
    力量: character.attributes.力量 + character.attributePoints.力量,
    敏捷: character.attributes.敏捷 + character.attributePoints.敏捷,
    体质: character.attributes.体质 + character.attributePoints.体质,
    智力: character.attributes.智力 + character.attributePoints.智力,
    精神: character.attributes.精神 + character.attributePoints.精神,
  };

  parts.push(`\n## 角色属性`);
  parts.push(`- 力量：${finalAttrs.力量}`);
  parts.push(`- 敏捷：${finalAttrs.敏捷}`);
  parts.push(`- 体质：${finalAttrs.体质}`);
  parts.push(`- 智力：${finalAttrs.智力}`);
  parts.push(`- 精神：${finalAttrs.精神}`);

  // 装备详情
  if (equipments.length > 0) {
    parts.push(`\n## 装备列表`);
    equipments.forEach((eq, idx) => {
      parts.push(`\n### ${idx + 1}. ${eq.name}`);
      parts.push(`- 类型：${eq.type}`);
      parts.push(`- 品质：${RARITY_MAP[eq.rarity] || eq.rarity}`);
      if (eq.tag) parts.push(`- 标签：${eq.tag}`);
      parts.push(`- 效果：${eq.effect}`);
      if (eq.description) parts.push(`- 描述：${eq.description}`);
    });
  }

  // 自定义道具列表（全部发送给 AI）
  const customItems = items.filter(item => item.isCustom);
  if (customItems.length > 0) {
    parts.push(`\n## 自定义道具列表`);
    customItems.forEach((item, idx) => {
      parts.push(`\n### ${idx + 1}. ${item.name || '未命名'}`);
      if (item.type) parts.push(`- 类型：${item.type}`);
      if (item.rarity) parts.push(`- 品质：${RARITY_MAP[item.rarity] || item.rarity}`);
      if (item.tag) parts.push(`- 标签：${item.tag}`);
      if (item.effect) parts.push(`- 效果：${item.effect}`);
      if (item.description) parts.push(`- 描述：${item.description}`);
    });
  }

  // 自定义技能列表（全部发送给 AI）
  const customSkills = skills.filter(skill => skill.isCustom);
  if (customSkills.length > 0) {
    parts.push(`\n## 自定义技能列表`);
    customSkills.forEach((skill, idx) => {
      parts.push(`\n### ${idx + 1}. ${skill.name || '未命名'}`);
      if (skill.type) parts.push(`- 类型：${skill.type}`);
      if (skill.rarity) parts.push(`- 品质：${RARITY_MAP[skill.rarity] || skill.rarity}`);
      if (skill.tag) parts.push(`- 标签：${skill.tag}`);
      if (skill.consume) parts.push(`- 消耗：${skill.consume}`);
      if (skill.effect) parts.push(`- 效果：${skill.effect}`);
      if (skill.description) parts.push(`- 描述：${skill.description}`);
    });
  }

  // 自定义命定之人
  const customOnes = destinedOnes.filter(one => one.isCustom);
  if (customOnes.length > 0) {
    parts.push(`\n## 命定之人`);
    customOnes.forEach((one, idx) => {
      parts.push(`\n### ${idx + 1}. ${one.name}`);
      parts.push(`- 种族：${one.race}`);
      parts.push(`- 身份：${one.identity.join('、')}`);
      if (one.career.length > 0) parts.push(`- 职业：${one.career.join('、')}`);
      parts.push(`- 生命层级：${one.lifeLevel}`);
      parts.push(`- 等级：${one.level}`);
      parts.push(`- 性格：${one.personality}`);
      parts.push(`- 喜爱：${one.like}`);
      parts.push(`- 外貌：${one.app}`);
      parts.push(`- 衣着：${one.cloth}`);

      if (one.equip.length > 0) {
        parts.push(`- 装备：`);
        one.equip.forEach(eq => {
          if (eq.name) parts.push(`  - ${eq.name}${eq.description ? `：${eq.description}` : ''}`);
        });
      }

      parts.push(
        `- 属性：力量${one.attributes.strength} 敏捷${one.attributes.dexterity} 体质${one.attributes.constitution} 智力${one.attributes.intelligence} 精神${one.attributes.mind}`,
      );

      if (one.stairway.isOpen) {
        parts.push(`- 登神长阶：已开启`);
        // 如果有登神长阶的描述信息，也一并发送
        if (one.stairway.elements?.描述) {
          parts.push(`  - 描述：${one.stairway.elements.描述}`);
        }
      }
      parts.push(`- 是否缔结契约：${one.isContract}`);
      parts.push(`- 好感度：${one.affinity}`);
      if (one.comment) parts.push(`- 评价：${one.comment}`);
      if (one.backgroundInfo) parts.push(`- 背景：${one.backgroundInfo}`);

      if (one.skills.length > 0) {
        parts.push(`- 技能：`);
        one.skills.forEach(sk => parts.push(`  - ${sk.name}：${sk.effect}`));
      }
    });
  }

  // 初始开局
  if (background) {
    parts.push(`\n## 初始开局剧情`);
    parts.push(`### ${background.name}`);
    if (background.requiredRace) parts.push(`- 种族限制：${background.requiredRace}`);
    if (background.requiredLocation) parts.push(`- 地点限制：${background.requiredLocation}`);
    parts.push(`\n${background.description}`);
  }

  // 添加 AI 生成指令
  parts.push(`\n---\n`);
  parts.push(`务必按照<status_current_variables>和以上内容，生成一个符合描述和情景的初始剧情！\n`);
  parts.push(
    `(注意：生成初始剧情时，还需根据内容，将相关数据在<UpdateVariable>内进行记录和更新，严禁任何修改和省略。如有数据是不完整的，务必参考相关设定进行完善)`,
  );

  return parts.join('\n');
}
