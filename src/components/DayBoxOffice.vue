<template>
    
    <div class="box-office-container">
      <div class="header-actions">
        <v-btn @click="previous" class="action-btn">前一天</v-btn>
        <h1 class="custom-h1"> {{ dayStr }} 总票房: {{ boxOfficeTotal }}</h1>
        <v-btn @click="next" class="action-btn">后一天</v-btn>
      </div>
       <div class="search-box-wrapper">
        <SearchBox></SearchBox>
        <TypeBox></TypeBox>
      </div>
      <p v-if="loading">加载中...</p>
       <div class="table-container" >
       <el-table  :data="movies"  style="width: 100%" v-if="!loading">
        <el-table-column prop="movieName" label="电影名称" width="220">
            <template #default="{ row }">
            <span :style="{ fontWeight: 'bold', color: '#333',fontSize:'15px' }">{{ row.movieName }}</span>
            </template>
         </el-table-column>
         <el-table-column prop="sumBoxoffice" label="目前总票房"></el-table-column>
         <el-table-column prop="dayBoxoffice" label="今日票房（万元）"></el-table-column>
         <el-table-column prop="dayBoxofficeRate" label="今日票房占比"></el-table-column>
         <el-table-column prop="dayArrangeRate" label="今日排片率"></el-table-column>
         <!-- 添加一个操作列来处理点击事件 -->
    
         <el-table-column label="查看详情" width="180">
           <template #default="scope">
         <!-- scope.row 将是当前行的数据对象 -->
            <RouterLink :to="{
              name: 'movie-detail', 
              params: { 
                  movieCode : scope.row.movieCode, 
            }
            }">  
             <div @click="selectMovie(scope.row.movieCode)">
                查看
             </div>
            </RouterLink>
           </template>
         </el-table-column>
         
       </el-table>
      </div>
     </div>
</template>

<script>
   import { ref,  onMounted } from 'vue';
   import dayjs from 'dayjs';
   import axios from 'axios';
   import SearchBox from '@/components/SearchBox.vue'
   import TypeBox from '@/components/TypeBox.vue'
   import { apis } from '@/ApiConfig';

   export default {
    components: {
        SearchBox,
        TypeBox,
     },
     methods: {
      
      selectMovie(movieCode) {
        this.$emit('select-movie', movieCode);
        this.$router.push({
             name: 'movie-detail', 
             params: { 
                movieCode : movieCode 
            }
          });
      //  console.log(movieCode);
      },
     },
     setup(props) {
       const loading = ref(true);
       const boxOfficeTotal = ref(0); // 假设这是今日总票房
       const movies = ref([]);
       let day = ref(new Date());
       const dayStr = ref(null);
       let timerId = ref(null);
       const today = dayjs().format('YYYY-MM-DD');

       const  handlePrevious = async() => {
      // 实现你的逻辑，比如改变某个状态
        day.value = dayjs(day.value).subtract(1, 'day');
        const dayString = dayjs(day.value).format('YYYY-MM-DD');
        dayStr.value = dayString;
        const response = await axios.get(apis.dailyBoxoffice,{
            params:{
                date: dayString,
            }
            });
        const sumResponse = await axios.get(apis.dailyBoxofficeSum,{
            params:{
                date: dayString,
            }
            });
        console.log(response);
        movies.value = response.data.data;
        boxOfficeTotal.value = sumResponse.data.data.sumBoxoffice;
        if (timerId != null) {
        clearInterval(timerId);
        timerId = null; // 可选：重置定时器ID，表示定时器已停
      }
    };
    const handleNext = async() => {
      if (dayjs(day.value).format('YYYY-MM-DD') === today) {
        return
      }
        day.value = dayjs(day.value).subtract(-1, 'day');
        const dayString = dayjs(day.value).format('YYYY-MM-DD');
        dayStr.value = dayString;
        const response = await axios.get(apis.dailyBoxoffice,{
            params:{
                date: dayString,
            }
            });
        const sumResponse = await axios.get(apis.dailyBoxofficeSum,{
            params:{
                date: dayString,
            }
            });
        console.log(response);
        movies.value = response.data.data;
        boxOfficeTotal.value = sumResponse.data.data.sumBoxoffice;
        if (timerId != null) {
        clearInterval(timerId);
        timerId = null; // 可选：重置定时器ID，表示定时器已停
      }
    };


       // 异步获取数据
       async function getBoxOffice() {
         try {
          const response = await axios.get(apis.todayDailyBoxoffice); // 替换为你的实际API URL
          const data = await response.data;
          // console.log(response);
          // console.log(data);
          movies.value = data.data;
          loading.value = false;
         } catch (error) {
          console.error('Error fetching box office data:', error);
          loading.value = false;
         }
       }
       async function getDaySum() {
         try {
          const response = await axios.get(apis.todayDailyBoxofficeSum); // 替换为你的实际API URL
          const data = await response.data;
          boxOfficeTotal.value = data.data.sumBoxoffice;
          // console.log(data);
          loading.value = false;
         } catch (error) {
          console.error('Error fetching box office data:', error);
          loading.value = false;
         }
       }

       // 在组件挂载后获取数据
       onMounted(() => {
        const updateData = async () => {
         getBoxOffice();
         getDaySum();
        }
        updateData();
        dayStr.value = dayjs(day.value).format('YYYY-MM-DD');
        timerId = setInterval(updateData, 1000*10 );
       });

       return {
         loading,
         boxOfficeTotal,
         movies,
         previous :handlePrevious,
         next :handleNext,
         dayStr,
       };
     },
   };
   </script>

   <style scoped>

/* 如果需要调整按钮本身的样式 */
.v-btn {
  height: 100px;
  width: 200px;
  /* 示例：增加一些间距 */
  margin: 0 10px;
  /* 更改按钮颜色、大小等 */
  color: #3f51b5;
  font-size: 16px;
  /* 其他样式根据需求添加 */
}
   .box-office-container {
      display: flex;
      flex-wrap: wrap; /* 允许换行 */
      gap: 6px; /* 行间间距，可根据需要调整 */
}
     .custom-h1 {
       color: crimson;
       font-size: 30px;
       margin-left: 3%;
       margin-top: 1%;
       font-weight: bold;
     }
    .search-box-wrapper {
      flex: 1; /* 让h1和SearchBox在一行内平均分配空间，可调整为具体比例 */
    }
    .header-actions {
  display: flex; /* 使用Flexbox布局 */
  justify-content: space-between; /* 横向两端对齐，使元素分散排列 */
  align-items: center; /* 垂直居中对齐 */
  width: 100%;
  margin-bottom: 1rem; /* 可根据需要调整间距 */
}
    .action-btn {
  /* 可以在这里添加按钮的具体样式，例如宽度、高度等 */
  font-size: 20px;
  font-weight: bold;
  color: #000;
  background-color: #26e6e3;
  min-width: 100px; /* 示例按钮宽度 */
}

    .search-box-wrapper {
      display: flex; /* 使SearchBox能够水平居中或调整对齐方式 */
      align-items: center; /* 垂直居中对齐 */
      justify-content: center; /* 添加这一行以实现水平居中 */
      height: 50px;
      margin-left: 20%;
}

    .table-container {
  width: 100%; /* 或其他宽度设置，确保表格宽度符合需求 */
}
   </style>