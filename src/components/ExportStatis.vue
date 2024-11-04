<template>
    <button @click="exportUsers" class="button">导出 Excel</button>
  </template>
  
  <script setup>
  import { ref,  onMounted } from 'vue';
  import axios from 'axios';
  import { apis } from '@/ApiConfig';

  // 定义响应式变量
    const dateRange = ref(null);

// 获取并解析 sessionStorage 中的 dateRange
    const getDateRange = () => {
        const dateRangeString = sessionStorage.getItem('dateRange');
        if (dateRangeString) {
        try {
            return JSON.parse(dateRangeString);
        } catch (e) {
            console.error('Error parsing date range:', e);
            return null;
        }
    }
    return null;
};
  
  const exportUsers = async () => {
      try {
          const response = await axios.post(apis.exportStatis, {
                statisType: dateRange.value.type,
                statisInterval: dateRange.value.interval,
                startDate: dateRange.value.start,
                endDate: dateRange.value.end,

            },{
              responseType: 'blob'
          });
  
          // 创建一个隐藏的 <a> 元素来触发下载
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', '用户数据.xlsx');
          document.body.appendChild(link);
          link.click();
      } catch (error) {
          console.error('导出失败:', error);
      }
  }
  // 在组件挂载时调用 getDateRange 方法
    onMounted(() => {
        dateRange.value = getDateRange();
        // console.log(dateRange.value);
    })
  ;
  </script>

<style scoped>
.button {
  font-size: 30px;
  font-weight: bolder;
  background: #48e6c6;
  height: 50px;
}

</style>