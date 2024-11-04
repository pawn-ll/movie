// config.js

// const apiBaseUrl = 'http://116.198.228.160:8081';
const apiBaseUrl = 'http://localhost:8081';

const apis = {
  apiBaseUrl: apiBaseUrl,
  // DailyBoxoffice.vue
  dailyBoxoffice: apiBaseUrl + '/dailyBoxoffice/day',
  dailyBoxofficeSum: apiBaseUrl+'/dailySumBoxoffice/day',
  todayDailyBoxoffice: apiBaseUrl+'/dailyBoxoffice/today',
  todayDailyBoxofficeSum: apiBaseUrl+ '/dailySumBoxoffice/today',
  // MovieDetail.vue
  movieDetail:apiBaseUrl +'/movie/detail',
  weekHistoygram: apiBaseUrl + '/dailyBoxoffice/week-histoygram',
  moviePoster: apiBaseUrl + '/movie/poster',
  //SearchResult.vue
  searchResult: apiBaseUrl + '/movie/search',
  //StatisPage.vue
  statisPage: apiBaseUrl + '/statisBoxoffice/statis',
  //Home.vue
  homeCount: apiBaseUrl + '/site/count',
  //BoxofficeList.vue
  boxofficeWeekList: apiBaseUrl + '/dailyBoxoffice/week-list',
  //DayBar.vue
  dayHistoygram : apiBaseUrl + '/dailySumBoxoffice/histoygram',
  //ExportStatis.vue
  exportStatis: apiBaseUrl + '/statisBoxoffice/export',



  
}


export {apiBaseUrl,apis };
