<script lang="ts" setup>
import { getQualityClass } from '../../utils/quality'

interface Props {
  /** 槽位名称 */
  slotName: string
  /** 左侧 emoji 图标 */
  icon: string
  /** 装备名称 */
  equipmentName?: string
  /** 装备品质 */
  quality?: string
  /** 装备描述 */
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  equipmentName: '无装备',
  quality: '',
  description: ''
})

// 判断是否有装备
const hasEquipment = computed(() => props.equipmentName !== '无装备')
</script>

<template>
  <div class="equipment-slot">
    <p class="equipment-label">
      <span>{{ icon }} {{ slotName }}: </span>
      <span
        v-if="hasEquipment"
        class="equipment-name value-main"
        :class="getQualityClass(quality)"
      >
        {{ equipmentName }}<template v-if="quality">({{ quality }})</template>
      </span>
      <span v-else class="equipment-name value-main">无装备</span>
    </p>
    <p v-if="hasEquipment && description" class="equipment-description value-main">
      {{ description }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.equipment-slot {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.equipment-label {
  margin: 0;
  line-height: 1.6;

  > span:first-child {
    font-weight: bold;
    color: #6a514d;
    text-shadow: 0 0 1px rgba(0, 0, 0, 0.08);
  }
}

.equipment-description {
  margin: 0;
  font-size: 0.85em;
  font-style: italic;
  color: #7a655d;
  padding-left: 10px;
  margin-top: 2px;
}
</style>