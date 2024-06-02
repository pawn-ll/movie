<template>
    <ol v-if="latestMovies">
    <div class="boxoffice-list">
        <p class="custom-p"> 近期热门榜</p>
        <li v-for="movie in latestMovies" :key="movie.movieCode" @click="goToMovieDetail(movie.movieCode)" >
        <div class=" left">{{movie.movieName}}</div> 
        <div class=" right">{{ movie.sumBoxoffice }}</div>
       
        </li>
    </div>
    </ol> 
 
    
</template>

<script setup>
import { ref,  onMounted , getCurrentInstance } from 'vue';
import axios from 'axios';


let latestMovies = ref([]);
let router = ref(null);


async function getList(){
    try {
          const response = await axios.get('http://1.14.58.251:8081/dailyBoxoffice/week-list'); 
        //   console.log(data);
          latestMovies.value = response.data.data;
         } 
         catch (error) {
          console.error('Error fetching box office data:', error);
         }
};
function goToMovieDetail(movieCode) {
      router.value.push({
         name: 'movie-detail', 
         params: { 
            movieCode : movieCode
         } 
    });
};

onMounted(() =>{
    getList();
    const appInstance = getCurrentInstance();
    router.value = appInstance.appContext.config.globalProperties.$router;
    console.log(router.value);
});

</script>

<style scoped>
.boxoffice-list{
    margin-right: 10%;
}
.custom-p {
    color: crimson;
    font-size: 25px;
    font-weight: bold;
    margin-left: 30%;
}

li {
    line-height: 3em; /* 将2em替换为你希望的行距 */
    margin-left: auto;
    font-size: 15px;
    display: flex; /* 使li成为弹性容器 */
    justify-content: space-between; /* 子元素在主轴（水平方向）上均匀分布 */
}
.right {
    flex: 1; /* 让.left和.right占据可用空间 */
    text-align: center; /* 使内容居中，因为justify-content: space-between;会拉伸子元素 */
    text-align: right;
  }

  .left {
    text-align: left; /* 重置.left的文本对齐，使其左对齐 */
    color: rgb(233, 34, 137);
    font-weight: bold;
  }
</style>