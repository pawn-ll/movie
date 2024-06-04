<template>
  <div class="movie-detail">
    <h1 class="movie-name">{{ movie.movieName }}</h1>
    <div class="poster-info-container">
      <div class="movie-poster">
        <img :src="movie.posterBase64" alt="电影海报" class="movie-poster" />
      </div>
      <div class="movie-meta">
      
        <p v-if="movie.director"><span class="inner-label">导演:</span> {{ movie.director }}</p>
        <p v-if="movie.scripter"><span class="inner-label">编剧:</span> {{ movie.scripter }}</p>
        <p v-if="movie.actor"><span class="inner-label">演员:</span> {{ movie.actor }}</p>
        <p v-if="movie.type"><span class="inner-label">类型:</span> {{ movie.type }}</p>
        <p v-if="movie.length"><span class="inner-label">影片时长:</span> {{ movie.length }}</p>
        <p v-if="movie.area"><span class="inner-label">制片地区:</span> {{ movie.area }}</p>
        <p v-if="movie.releaseDate"><span class="inner-label">上映日期:</span> {{ movie.releaseDate }}</p>
        <p v-if="movie.sumBoxOffice"><span class="inner-label">总票房:</span> {{ movie.sumBoxOffice }}</p>
        
      </div>
      
      <div class="movie-chart" >
        <p>电影首周票房</p>
        <div ref="chartContainer" :style="{ width: '100%', height: '300px' }"></div>
      </div>
    </div>

    <p class="introduction">{{ movie.introduction }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import * as echarts from 'echarts';


const props = defineProps({
  movieCode: {
    type: Number,
    required: true
  }
});
const chartContainer = ref(null);
let chartInstance = null;
const movie = ref({
  movieName: '',
  poster: '',
  posterBase64: '',
  director: '',
  scripter: '',
  actor: '',
  type: '',
  length: '',
  area: '',
  releaseDate: '',
  sumBoxOffice: '',
  introduction:''
});

async function fetchMoiveData(movieCodeValue) {
        // console.log(movieCodeValue);
        try {
            const response = await axios.get('http://1.14.58.251:8081/movie/detail',{
            params:{
                movieCode: movieCodeValue,
            }
            })
            console.log(response);
            movie.value = response.data.data;
            
        } 
        catch (error) {
          console.error('获取电影详情失败:', error);
        }
};
async function fetchMoiveLine(movieCodeValue) {
    try {
        const response = await axios.get('http://1.14.58.251:8081/dailyBoxoffice/week-histoygram',{
        params:{
            movieCode: movieCodeValue,
        }
        })
        const formattedData = response.data.data;
        return formattedData;
    }
    catch (error) {
        console.error('获取电影首周票房失败:', error);
    }
}

async function updateChartWithData(movieCodeValue) {
  const data = await fetchMoiveLine(movieCodeValue);
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
          show :true,
          name: '时间', // 添加x轴名称
          nameLocation: 'end', // 将名称放在中间位置
          nameGap: 20, // 调整名称与轴线的距离
      },
        yAxis: {
          type: 'value',
          show :true,
          name: '票房（万元）', // 添加y轴名称
          nameLocation: 'end', // 将名称放在中间位置
          nameGap: 20, // 调整名称与轴线的距离
      },
      
        series: [
        {
            name: '票房',
            type: 'line',
            data: data.yaxis,
        },
      ],
    };
  
    chartInstance.setOption(option);
  }
}// 初始化图表
onMounted(() => {
    // console.log(props.movieCode);
    fetchMoiveData(props.movieCode);
    updateChartWithData(props.movieCode);
    console.log(movie);
});
</script>

<style scoped>
.movie-detail {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
  padding: 1rem;
}

.movie-name {
  margin-left: 2%;
  text-align: left;
  margin-bottom: 1rem;
  font-size: 30px;
  font-weight: bold;
  color: palevioletred;
}

.poster-info-container {
  display: grid;
  grid-template-columns: 150px minmax(0, 300px) 1fr;
  grid-gap: 1rem;
  /* align-items: center; */
}

.movie-poster {
  grid-column: 1;
  grid-row: 1 / span 2;
}

.movie-poster img {
  width: 150px;
  height: 210px;
  object-fit: cover;
}

.movie-meta {
  grid-column: 2;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.movie-meta p {
  margin: 0;
}

.movie-chart {
  grid-column: 3;
  grid-row: 1 / span 2;
  text-align: center; 
}
.movie-chart p {
    color: crimson;
    font-size: 20px;
    font-weight: bold;
    margin-left: 1%;
}
.introduction {
  text-align: justify;
  margin-top: 1rem;
  padding: 1rem;
  border-top: 1px solid #ccc;
}
.inner-label{
  font-size: 20px;
  color: burlywood;
  font-weight: bold;
}
</style>