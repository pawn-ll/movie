<template>
    <ol v-if="latestMovies">
    <div class="boxoffice-list">
        <p> 近期热门榜</p>
        <li v-for="movie in latestMovies" :key="movie.movieCode" @click="goToMovieDetail(movie.movieCode)" >
         {{movie.movieName}}
       
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
          const response = await axios.get('http://localhost:8081/dailyBoxoffice/week-list'); 
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

<style>

.boxoffice-list.p {
    color:rgb(217, 79, 29);
}
</style>