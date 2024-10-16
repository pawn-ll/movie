<template>
  <button @click="goBack" class="back-button">返回</button>
  <div class="movie-detail" >
    <h1 class="movie-name" v-if="movie.movieName">{{ movie.movieName }}</h1>
    <div class="poster-info-container">
      <div class="movie-poster" v-if="poster">
        <img :src="poster" alt="电影海报" class="movie-poster" @click="showModal = true" />
      </div>
      <div class="modal" v-if="showModal">
        <div class="modal-content">
          <span class="close" @click="showModal = false">&times;</span>
          <img :src="poster" alt="电影海报" class="modal-image" />
        </div>
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
      
      <div class="movie-chart" v-if="line">
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
import { apis } from '@/ApiConfig';

const goBack = () => {
  if (typeof window !== 'undefined') { // 确保在浏览器环境中执行
    // 返回上一页
    window.history.back();
  }
};
const props = defineProps({
  movieCode: {
    type: Number,
    required: true
  }
});
const chartContainer = ref(null);
let chartInstance = null;
const line = ref(true);
const poster = ref('');
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
const showModal =  ref(false);

async function fetchMoiveData(movieCodeValue) {
        // console.log(movieCodeValue);
        try {
            const response = await axios.get(apis.movieDetail,{
            params:{
                movieCode: movieCodeValue,
            }
            })
            // console.log(response);
            movie.value = response.data.data;
        } 
        catch (error) {
          console.error('获取电影详情失败:', error);
        }
};

async function fetchMoivePoster(movieCodeValue) {
        // console.log(movieCodeValue);
        try {
            const response = await axios.get(apis.moviePoster,{
            params:{
                movieCode: movieCodeValue,
            }
            })
            console.log(response);
            poster.value = response.data.data.posterBase64;
            
        } 
        catch (error) {
          console.error('获取电影详情失败:', error);
        }
};
async function fetchMoiveLine(movieCodeValue) {
    try {
        const response = await axios.get(apis.weekHistoygram,{
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
  // console.log(data);
  if(data==null){
    line.value = false;
    return;
  }
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
    fetchMoivePoster(props.movieCode);
    updateChartWithData(props.movieCode);
    // console.log(movie);
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
.back-button {
  font-size: 30px;
  font-weight: bolder;
  background: #488ae6;
  height: 50px;
}
.modal {
  display: block;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal-content {
  margin: 15% auto;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 80%;
  max-height: 80%;
}

.modal-image {
  max-width: 100%;
  max-height: 100%;
  transform: scale(1.3);
  transform-origin: center;
}

.close {
  position: absolute;
  top: 10px;
  right: 25px;
  color: #f1f1f1;
  font-size: 35px;
  font-weight: bold;
  cursor: pointer;
}
</style>