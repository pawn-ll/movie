// config.js

const apiBaseUrl = 'http://1.14.58.251:8081';

const apis = {
  // apiBaseUrl: 'http://localhost:8081',
  apiBaseUrl: apiBaseUrl,
  // DailyBoxoffice.vue
  dailyBoxoffice: apiBaseUrl + '/dailyBoxoffice/day',
  dailyBoxofficeSum: apiBaseUrl+'/dailySumBoxoffice/day',
  todayDailyBoxoffice: apiBaseUrl+'/dailyBoxoffice/today',
  todayDailyBoxofficeSum: apiBaseUrl+ '/dailySumBoxoffice/today',
  // MovieDetail.vue
  movieDetail:apiBaseUrl +'/movie/detail',
  weekHistoygram: apiBaseUrl + '/dailyBoxoffice/week-histoygram',
  //SearchResult.vue
  searchResult: apiBaseUrl + '/movie/search',
  //StatisPage.vue
  statisPage: apiBaseUrl + '/statisBoxoffice/statis',
  //Home.vue
  homeCount: apiBaseUrl + '/site/count',
  //BoxofficeList.vue
  boxofficeWeekList: apiBaseUrl + '/dailyBoxoffice/week-list',
  //DayBar.vue
  dayHistoygram : apiBaseUrl + '/dailySumBoxoffice/histoygram'


  
}


export {apiBaseUrl,apis };
