<template>
  <div ref="chartContainer" :style="{ width: '100%', height: '400px' }"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import * as echarts from 'echarts';
import axios from 'axios';

const chartContainer = ref(null);
let chartInstance = ref(null);

// 数据结构示例
const mockData = [
  { date: '2023-05-01', boxOffice: 10000 },
  { date: '2023-05-02', boxOffice: 15000 },
  // 更多数据...
];

// 获取票房数据的函数
async function fetchBoxOfficeData() {
  try {
    const response = await axios.get('http://localhost:8081/dailySumBoxoffice/histoygram'); // 替换为你的后端接口地址
    // 处理返回的数据，格式化为适合 Echarts 的数据结构
    // console.log(response.data);
    const formattedData = response.data.data;
    return formattedData;
  } catch (error) {
    console.error('Failed to fetch box office data:', error);
    return [];
  }
}

// 初始化图表
async function initChart() {
  const data = await fetchBoxOfficeData();
//   console.log(data);

  chartInstance = echarts.init(chartContainer.value);
  
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: data.xaxis,
    },
    yAxis: {
      type: 'value',
      show :true,
    },
    
    series: [
      {
        name: '票房',
        type: 'bar',
        data: data.yaxis,
      },
    ],
  };

  chartInstance.setOption(option);
}

// 销毁图表实例
onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
});

onMounted(async () => {
  await initChart();
});
</script>
<style scoped>

</style>