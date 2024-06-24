<template>
    <div class ="container"> 
    <div class="left-side"> 
      <DayBoxOffice @selectMovie="handleSelectMovie" />
    </div>
    
    <div class="right-side">
      <DayBar />
      <BoxOfficeList />
      <!-- <BarChart :movieCode="selectedMovieCode" /> -->
    </div>
  
    <!-- <BarChart /> -->
  </div>
  <div class="page-footer ">
    <p>  今日网站访问量： {{ todayVisits }}</p>
    
   </div>
</template>
<script  >
  import DayBoxOffice from '@/components/DayBoxOffice.vue';
  import DayBar from '@/components/DayBar.vue';
  import BoxOfficeList from '@/components/BoxOfficeList.vue';
  import { ref } from 'vue';
  import axios from 'axios';
  import { apis } from '@/ApiConfig';
  
    export default  {
      components: {
      DayBoxOffice,
      DayBar,
      BoxOfficeList,
      // BarChart,
     },
     data() {
       return {
        selectedMovieCode: 545277882671173,
        // totalVisits: ref(0), // 网站总访问量
        todayVisits: ref(0), // 今日网站访问量
       }
     },
     methods: {
         handleSelectMovie(movieCodeValue) {
          this.selectedMovieCode = movieCodeValue;
          console.log(this.selectedMovieCode);
        },
        async fetchWebsiteVisits() {
          try {
          const response = await axios.get(apis.homeCount); // 请替换为实际的API路径
          // console.log(response);
          // this.totalVisits = response.data.data.siteVisitorCount;
          this.todayVisits = response.data.data.siteVisitorTodayCount;
        
        } catch (error) {
        console.error('Error fetching website visits:', error);
        }
        },
      },
      created() {
        this.fetchWebsiteVisits();
      },
   };
</script>
<style scoped>
.container {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin-left: 2%;
}

.left-side {
  flex: 2;
}

.right-side {
  flex: 1;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .left-side,
  .right-side {
    flex: 1;
  }
}
.page-footer {
  /* 新增样式，使底部固定在页面底部 */
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff; /* 根据需要调整背景色 */
  padding: 1rem; /* 可选，增加内边距 */
  text-align: center; /* 文本居中 */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1); /* 可选，底部阴影效果 */
  font-size: 20px;
  color: coral;
}
</style>
