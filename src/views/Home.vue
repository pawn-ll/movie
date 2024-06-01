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
</template>
<script  >
  import DayBoxOffice from '@/components/DayBoxOffice.vue';
  import DayBar from '@/components/DayBar.vue';
  import BoxOfficeList from '@/components/BoxOfficeList.vue'
  
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
       }
     },
     methods: {
         handleSelectMovie(movieCodeValue) {
          this.selectedMovieCode = movieCodeValue;
          console.log(this.selectedMovieCode);
        },
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
</style>
