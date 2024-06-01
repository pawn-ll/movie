<template>
    <div class="box-office-container">
       <h1 class="custom-h1">今日电影总票房:  {{ boxOfficeTotal }}</h1>
       <p v-if="loading">加载中...</p>

       <el-table  :data="movies"  style="width: 100%" v-if="!loading">
         <el-table-column prop="movieName" label="电影名称"></el-table-column>
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
</template>

<script>
   import { ref,  onMounted } from 'vue';
   import axios from 'axios';

   export default {
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

       // 异步获取数据
       async function getBoxOffice() {
         try {
          const response = await axios.get('http://localhost:8081/dailyBoxoffice/today'); // 替换为你的实际API URL
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
          const response = await axios.get('http://localhost:8081/dailySumBoxoffice/today'); // 替换为你的实际API URL
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
         getBoxOffice();
         getDaySum();
       });

       return {
         loading,
         boxOfficeTotal,
         movies,
       };
     },
   };
   </script>

   <style scoped>
     .custom-h1 {
       color: crimson;
       font-size: 35px;
       margin-left: 3%;
       font-weight: bold;
     }
   </style>