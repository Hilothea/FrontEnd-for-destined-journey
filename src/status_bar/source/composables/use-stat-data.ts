export function useStatData() {
  const statData = ref<any>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);

  const loadData = () => {
    try {
      // 获取变量数据
      const variables = getVariables({
        type: 'message',
        message_id: getCurrentMessageId(),
      });

      // 提取 stat_data
      const data = _.get(variables, 'stat_data', {});

      if (!data || Object.keys(data).length === 0) {
        throw new Error('无法获取状态数据');
      }

      statData.value = data;
      error.value = null;
    } catch (e) {
      console.error('加载数据失败:', e);
      error.value = e instanceof Error ? e.message : '未知错误';
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    loadData();
  });

  return {
    statData,
    loading,
    error,
    loadData,
  };
}
