<template>
    <div>
      <input 
      type="text" 
      v-model="searchKeyword" 
      placeholder="请输入搜索关键词" 
      class="search-input" 
      />
      <button @click="search" class="search-button" >搜索</button>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits,onMounted, getCurrentInstance} from 'vue';
  
  
  // 获取路由器实例
    let router = ref(null);
    // 定义自定义事件
const emit = defineEmits(['search']);

// 使用ref存储搜索关键词
    const searchKeyword = ref('');

// 搜索方法
    function search ()  {
    if (!searchKeyword.value) return; // 防止空值搜索
    emit('search', searchKeyword.value); 
  // 跳转到搜索结果页面，传递搜索关键词
    router.value.push({
        name: 'search',
        params: { 
            movieName: searchKeyword.value
    } 
  });
};
onMounted(() =>{
    const appInstance = getCurrentInstance();
    router.value = appInstance.appContext.config.globalProperties.$router;
    console.log(router.value);
});
  </script>

<style>
.search-input {
  width: 300px;
  height: 40px;
  font-size: 16px;
  padding: 8px; /* 可选，增加内边距使输入框看起来更舒适 */
}

.search-button {
  font-size: 20px;
}
</style>