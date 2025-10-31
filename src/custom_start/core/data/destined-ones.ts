import { DestinedOne } from '../types';
import { loadCustomDestinedOnes, mergeData } from '../utils/loader';

interface DestinedOnes {
  [key: string]: DestinedOne[];
}

/**
 * 初始命定之人对象
 */
const DestinedOnes: DestinedOnes = {};

// 加载并合并自定义初始命定之人数据
let mergedDestinedOnesData: DestinedOnes | null = null;

// 初始化命定之人数据（加载自定义数据并合并）
async function initDestinedOnesData(): Promise<void> {
  const customDestinedOnes = await loadCustomDestinedOnes();
  mergedDestinedOnesData = mergeData(DestinedOnes, customDestinedOnes) as DestinedOnes;
}

// 获取所有命定之人数据
export function getAllDestinedOnes(): DestinedOnes {
  return mergedDestinedOnesData || DestinedOnes;
}

initDestinedOnesData();
