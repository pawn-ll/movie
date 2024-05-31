<template>
    <div ref="chartContainer" :style="{ width: '100%', height: '400px' }"></div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted, watchEffect } from 'vue';
  import * as echarts from 'echarts';
  import axios from 'axios';
  
  // 声明 movieCode prop
  let { movieCode } = defineProps({
    movieCode: {
      type: Number,
      required: true,
    },
  });
  
  const chartContainer = ref(null);
  let chartInstance = null;
  
  // 获取票房数据的函数
  async function fetchMoiveData(movieCodeValue) {
    try {
        const response = await axios.get('http://localhost:8081/dailyBoxoffice/histoygram', {
        params: {
          movieCode: movieCodeValue,
        },
      });
      const formattedData = response.data.data;
      return formattedData;
    } catch (error) {
      console.error('Failed to fetch box office data:', error);
      return [];
    }
  }
  
  // 更新图表数据
async function updateChartWithData(movieCodeValue) {
  const data = await fetchMoiveData(movieCodeValue);
  chartInstance = echarts.init(chartContainer.value);
  if (chartInstance) {
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
        },
      },
        xAxis: {
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
}// 初始化图表
async function initChart() {
  await updateChartWithData(movieCode); // 初始加载图表
}

// 使用 watchEffect 监听 movieCode 的变化
watchEffect(async () => {
  console.log('movieCode changed:', movieCode);
  await updateChartWithData(movieCode);
});

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