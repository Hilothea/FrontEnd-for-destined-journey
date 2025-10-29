# 数据录入指南

本目录用于录入预设的装备、道具和技能数据，使用简单的 JSON 格式，方便不懂代码的人员维护。

## 📁 文件结构

```
data-enter/
├── README.md                  # 本说明文档
├── equipments.example.json    # 装备数据示例（仅供参考）
├── items.example.json         # 道具数据示例（仅供参考）
├── skills.example.json        # 技能数据示例（仅供参考）
├── equipments.json            # 装备数据（需自行创建）
├── items.json                 # 道具数据（需自行创建）
└── skills.json                # 技能数据（需自行创建）
```

## 🚀 快速开始

1. **复制示例文件**：
   - 将 `equipments.example.json` 复制为 `equipments.json`
   - 将 `items.example.json` 复制为 `items.json`
   - 将 `skills.example.json` 复制为 `skills.json`

2. **编辑数据**：
   - 打开对应的 `.json` 文件（不是 `.example.json`）
   - 按照格式添加或修改数据

3. **保存生效**：
   - 保存文件后，系统会自动加载新数据

## ⚠️ 重要提示

- ✅ **只编辑 `.json` 文件**（如 `equipments.json`）
- ❌ **不要编辑 `.example.json` 文件**（这些只是示例）
- 📝 **什么文件写什么数据**：
  - `equipments.json` - 只写装备数据
  - `items.json` - 只写道具数据
  - `skills.json` - 只写技能数据

## 📝 数据格式说明

### 装备数据 (equipments.json)

```json
{
  "分类名称": [
    {
      "name": "装备名称",
      "cost": 10,
      "type": "装备类型",
      "rarity": "common",
      "tag": "[子类型][攻击/防御: XXX][属性+1/2]",
      "effect": "(具体的、可代入公式或战斗流程的数值化效果)",
      "description": "(装备的叙事性描述)"
    }
  ]
}
```

### 道具数据 (items.json)

```json
{
  "分类名称": [
    {
      "name": "道具名称",
      "cost": 5,
      "type": "道具类型",
      "rarity": "uncommon",
      "tag": "[标签]（若道具为武器则需要填写，参考武器数据）",
      "effect": "(道具的具体的数值化功能描述)",
      "description": "(道具的叙事性描述)"
    }
  ]
}
```

### 技能数据 (skills.json)

**支持使用中文或英文字段名**：

- 中文格式：`"主动技能"` 和 `"被动技能"`
- 英文格式：`"ActiveSkills"` 和 `"PassiveSkills"`

```json
{
  "主动技能": {
    "战技": [
      {
        "name": "技能名称",
        "cost": 15,
        "type": "主动",
        "rarity": "rare",
        "tag": "[关联属性][目标类型][核心功能][威力: XXX][可选机制]",
        "consume": "[攻击/动作: XXX MP/SP/MP与SP](例如:[动作: 50SP])",
        "effect": "(具体数值化效果与表明属性的检定规则。若涉及伤害，必须明确写出伤害类型及其占比。例如：“造成XXX点伤害，70%物理伤害，30%能量伤害”)",
        "description": "(叙事性描述)"
      }
    ]
  },
  "被动技能": {
    "战技": [
      {
        "name": "被动技能名称",
        "cost": 20,
        "type": "被动",
        "rarity": "epic",
        "tag": "[关联属性][目标类型][核心功能][威力: XXX][可选机制]",
        "effect": "(具体数值化效果与表明属性的检定规则。若涉及伤害，必须明确写出伤害类型及其占比。例如：“造成XXX点伤害，70%物理伤害，30%能量伤害”)",
        "description": "(叙事性描述)"
      }
    ]
  }
}
```

## 🎨 品质等级 (rarity)

- `common` - 普通
- `uncommon` - 优秀
- `rare` - 稀有
- `epic` - 史诗
- `legendary` - 传说
- `mythic` - 神话
- `only` - 唯一

## ⚠️ 注意事项

1. **JSON 格式要求**：
   - 所有字符串必须用双引号 `"` 包裹
   - 数字不需要引号
   - 每个属性后面要有逗号（最后一个除外）
   - 中文标点符号要用英文标点

2. **必填字段**：
   - `name`：名称（不能为空）
   - `cost`：消耗的转生点数（数字）
   - `type`：类型
   - `rarity`：品质
   - `tag`：标签
   - `effect`：效果
   - `description`：描述

3. **特殊字段**：
   - 技能数据需要额外的 `consume` 字段（消耗说明）

4. **分类名称**：
   - 装备：武器、防具、饰品等
   - 道具：消耗品、材料等
   - 技能：主动技能和被动技能，每个下面还有战技、法术、祷告、其它等子分类（可自定义子分类）

## 💡 提示

- 参考 `.example.json` 文件中的示例数据
- 复制示例格式进行修改
- 确保 JSON 格式正确（可使用在线 JSON 校验工具）

## ❓ 常见问题

**Q: 为什么我的数据没有生效？**
A: 请确保：

1. 文件名是 `.json` 而不是 `.example.json`
2. JSON 格式正确（注意逗号、引号）
3. 文件保存成功

**Q: 可以删除示例文件吗？**
A: 不建议删除 `.example.json` 文件，它们是很好的参考模板。

**Q: 如何添加新的分类？**
A: 在对应文件中按照现有格式添加新的分类名称和数据即可。

如有其他问题，请联系技术人员。
