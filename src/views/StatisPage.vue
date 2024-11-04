<template>
  <button @click="goBack" class="back-button">返回</button>
  <Export />
<div class="table-container" >
       <el-table  :data="movies"  style="width: 100%" >
         <el-table-column prop="movieName" label="电影名称" width="220">
            <template #default="{ row }">
            <span :style="{ fontWeight: 'bold', color: '#333',fontSize:'15px' }">{{ row.movieName }}</span>
            </template>
         </el-table-column>
         <el-table-column prop="statisInterval" label="统计时间"></el-table-column>
         <el-table-column prop="statisSumBoxoffice" label="合计票房（万元）"></el-table-column>
         <el-table-column prop="avgBoxofficeRate" label="平均票房占比"></el-table-column>
         <el-table-column prop="avgArrangeRate" label="平均排片率"></el-table-column>
         <el-table-column prop="avgSeatRate" label="平均入座率"></el-table-column>
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
import { apis } from '@/ApiConfig';
import Export from '@/components/ExportStatis.vue';

export default {
  components:{
    Export,
  },
    data(){
        return{
            isFetching: false,
            loading : ref(true),
            movies : ref([]),
        
        } ;
    },
    computed: {
        dateRange() {
            const dateRangeString = sessionStorage.getItem('dateRange');
            if (dateRangeString) {
            try {
                return JSON.parse(dateRangeString);
            } catch (e) {
            console.error('Error parsing date range:', e);
            return null; // 解析失败时返回null或其他默认值
            }
         }
        return null; // 查询参数不存在时返回null
    },
  },
    methods: {
    goBack  ()  {
        if (typeof window !== 'undefined') { // 确保在浏览器环境中执行
          // 返回上一页
          window.history.back();
      }
    },
    async fetchDataFromBackend() {
      try {
        this.isFetching = true;
        const dateRange = this.dateRange;
        
        const response = await axios.post(apis.statisPage, {
                statisType: dateRange.type,
                statisInterval: dateRange.interval,
                startDate: dateRange.start,
                endDate: dateRange.end,
            },{
                headers: {
                    'Content-Type': 'application/json',
                },
        });
        console.log(response);
        this.movies = response.data.data;
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.isFetching = false;
      }
    },
  
    handleSelected(option, value) {
         console.log('Selected option:', option, 'Value:', value);
         // 处理选中的选项和值并发送请求
       },
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
    mounted() {
    this.fetchDataFromBackend();
  },
    
} 

</script>

<style scoped>
.back-button {
  font-size: 30px;
  font-weight: bolder;
  background: #488ae6;
  height: 50px;
}

</style>