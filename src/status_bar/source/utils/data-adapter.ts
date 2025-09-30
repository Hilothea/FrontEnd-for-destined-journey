/**
 * 安全获取值，带默认值
 */
export function safeGet<T = any>(obj: any, path: string, defaultValue: T): T {
  return _.get(obj, path, defaultValue)
}

/**
 * 获取可扩展对象中的所有项
 * 自动过滤 $meta 字段
 */
export function getExtensibleItems<T = any>(data: any): Record<string, T> {
  if (!data || typeof data !== 'object') return {}

  return _.omitBy(
    data,
    (value, key) => key === '$meta' || key === '$__META_EXTENSIBLE__$'
  ) as Record<string, T>
}

/**
 * 检查是否为空值
 */
export function isEmpty(value: any): boolean {
  return _.isEmpty(value) || value === '' || value === null || value === undefined
}

/**
 * 处理身份/职业等字段
 * 如果是 ["$__META_EXTENSIBLE__$"]，返回空数组
 */
export function normalizeStringOrArray(value: any): string | string[] {
  if (Array.isArray(value)) {
    if (value.length === 0 || value[0] === '$__META_EXTENSIBLE__$') {
      return []
    }
    return value
  }
  return value || ''
}