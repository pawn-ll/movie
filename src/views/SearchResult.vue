<template>
    <button @click="goBack" class="back-button">返回</button>
    <div class="search-result container">
        <header class="header-flex">
            <h1 class="title">搜索结果</h1>
            <SearchBox @search="onSearch"/>
        </header>
      <div v-if="loading" class="loading">加载中...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="totalPages < 1">
        <p>暂无搜索结果</p>
      </div>
      <div v-if="results.length > 0">
        <ul class="result-list">
          <li v-for="result in results" :key="result.movieCode" class="result-item">
            <div class="left">
                <router-link :to="{ name: 'movie-detail', params: { movieCode: result.movieCode }}">
                    <img :src="result.posterBase64" alt="电影海报" class="movie-poster" />
                </router-link>
            </div>
            <div class="right">
              <div class="meta-data">
                <router-link :to="{ name: 'movie-detail', params: { movieCode: result.movieCode }}" class="movie-name">
                    {{ result.movieName }}
                </router-link>
                <p class="director">导演：{{ result.director }}</p>
                <p class="type">类型：{{ result.type }}</p>
                <p class="length">时长：{{ result.length }}</p>
                <p class="actor">主演：{{ result.actor }}</p>
              </div>
            </div>
          </li>
        </ul>
        <nav v-if="totalPages > 1" class="pagination">
          <button 
            :disabled="currentPage === 1" 
            @click="loadPage(currentPage - 1)" class="page-btn prev">上一页</button>
          <span class="page-info">第{{ currentPage }}页 / 共{{ totalPages }}页</span>
          <button 
            :disabled="currentPage === totalPages" 
            @click="loadPage(currentPage + 1)" class="page-btn next">下一页</button>
        </nav>
      </div>
    </div>
  </template>

<script setup>
import { ref, computed, onMounted} from 'vue';
import SearchBox from '@/components/SearchBox.vue'
import { apis } from '@/ApiConfig';
import axios from 'axios';

const props = defineProps({
  movieName: {
    type: String,
    required: true
  }
});

const goBack = () => {
  if (typeof window !== 'undefined') { // 确保在浏览器环境中执行
    // 返回上一页
    window.history.back();
  }
};
const currentPage = ref(1);
const pageSize = 5;
const results = ref([]);
const loading = ref(false);
const error = ref(null);
const totalPages = ref();

async function fetchResults(movieNameValue) {
  try {
    loading.value = true;
    console.log(movieNameValue);
    const response = await axios.post(apis.searchResult, {
        movieName: movieNameValue,
        current: currentPage.value,
        size: pageSize,
        },{
         headers: {
            'Content-Type': 'application/json',
        },
  });
    results.value = response.data.data.records; 
    totalPages.value = response.data.data.pages; // 假设API返回了总页数
    console.log(totalPages.value);
    error.value = null;
  } catch (err) {
    console.log(err);
    error.value = '请求失败，请重试';
  } finally {
    loading.value = false;
  }
};

const onSearch = (query) => {
  fetchResults(query); // 更新movieName prop并重新获取搜索结果
};

// 加载新页面
const loadPage = (pageNumber) => {
  currentPage.value = pageNumber;
  fetchResults(props.movieName);
};

// 在组件挂载后，首次加载数据
onMounted(() => {
    // console.log(props.movieName);
    fetchResults(props.movieName);
});


</script>
<style scoped>
.back-button {
  font-size: 30px;
  font-weight: bolder;
  background: #488ae6;
  height: 50px;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
.header-flex {
  display: flex;
  align-items: center; /* 使标题和SearchBox垂直居中对齐 */
}
.title {
  text-align: left;
  margin-bottom: 10px;
  font-size: 30px;
  color: rgb(207, 58, 28);
  font-weight: bold;
}

.loading {
  text-align: center;
  margin-bottom: 20px;
}

.error {
  color: red;
  text-align: center;
  margin-bottom: 20px;
}

.result-list {
  list-style-type: none;
  padding: 0;
}

.result-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.left {
  width: 30%;
  margin-right: 20px;
}

.movie-poster {
  width: 100%;
  height: auto;
  border-radius:10px;
}

.right {
  width: 50%;
}

.meta-data {
  margin-top: 10px;
}

.movie-name {
    color: palevioletred;
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
}

.director, .type, .length, .actor {
  margin-top: 5px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.page-btn, .page-info {
  cursor: pointer;
}

.prev, .next {
  padding: 8px 15px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 14px;
  transition: background-color 0.2s ease-in-out;
}

.prev:hover, .next:hover {
  background-color: #f0f0f0;
}

.page-info {
  font-weight: bold;
  margin: 0 10px;
}
</style>