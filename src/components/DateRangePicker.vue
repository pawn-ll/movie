<template>
  <v-card>
  <v-card-title>
      <v-btn color="primary" @click="displayModeCustom">自定义统计</v-btn>
      <v-btn color="primary" @click="displayModeMonth">月统计</v-btn>
      <v-btn color="primary" @click="displayModeYear">年统计</v-btn>
  </v-card-title>
  <v-card class= "day" v-if="displayMode === 'day'">
    <v-card-title>
      选择日期范围
    </v-card-title>
    
      <v-row>
        <v-col cols="6">
          <v-date-picker v-model="startDate"  :max="endDate" ></v-date-picker>
        </v-col>
        <v-col cols="6">
          <v-date-picker v-model="endDate" :min="startDate" ></v-date-picker>
        </v-col>
      </v-row>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$emit('closeDialog')">关闭</v-btn>
      <v-btn color="primary" :disabled="!startDate||!endDate" @click="navigateToStatsPage">选择</v-btn>
    </v-card-actions>
  </v-card>
  <v-card class="month" v-if="displayMode === 'month'">
    <v-card-title>
      选择年份
    </v-card-title>
    <v-btn color="primary" @click="setYear(2017)">2017</v-btn>
    <v-btn color="primary" @click="setYear(2018)">2018</v-btn>
    <v-btn color="primary" @click="setYear(2019)">2019</v-btn>
    <v-btn color="primary" @click="setYear(2020)">2020</v-btn>
    <v-btn color="primary" @click="setYear(2021)">2021</v-btn>
    <v-btn color="primary" @click="setYear(2022)">2022</v-btn>
    <v-btn color="primary" @click="setYear(2023)">2023</v-btn>
    <v-btn color="primary" @click="setYear(2024)">2024</v-btn>
    <v-card  v-if="year">
      <v-card-title>
      选择月份
    </v-card-title>
    <v-btn color="primary" @click="setMonth(1)">一</v-btn>
    <v-btn color="primary" @click="setMonth(2)">二</v-btn>
    <v-btn color="primary" @click="setMonth(3)">三</v-btn>
    <v-btn color="primary" @click="setMonth(4)">四</v-btn>
    <v-btn color="primary" @click="setMonth(5)">五</v-btn>
    <v-btn color="primary" @click="setMonth(6)">六</v-btn>
    <v-btn color="primary" @click="setMonth(7)">七</v-btn>
    <v-btn color="primary" @click="setMonth(8)">八</v-btn>
    <v-btn color="primary" @click="setMonth(9)">九</v-btn>
    <v-btn color="primary" @click="setMonth(10)">十</v-btn>
    <v-btn color="primary" @click="setMonth(11)">十一</v-btn>
    <v-btn color="primary" @click="setMonth(12)">十二</v-btn>
    </v-card>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$emit('closeDialog')">关闭</v-btn>
      <v-btn color="primary" :disabled="!year || !month" @click="navigateToMonthPage">选择</v-btn>
    </v-card-actions>
  </v-card>

  <v-card class="year" v-if="displayMode === 'year'">
    <v-card-title>
      选择年份
    </v-card-title>
    <v-btn color="primary" @click="setYear(2017)">2017</v-btn>
    <v-btn color="primary" @click="setYear(2018)">2018</v-btn>
    <v-btn color="primary" @click="setYear(2019)">2019</v-btn>
    <v-btn color="primary" @click="setYear(2020)">2020</v-btn>
    <v-btn color="primary" @click="setYear(2021)">2021</v-btn>
    <v-btn color="primary" @click="setYear(2022)">2022</v-btn>
    <v-btn color="primary" @click="setYear(2023)">2023</v-btn>
    <v-btn color="primary" @click="setYear(2024)">2024</v-btn>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="$emit('closeDialog')">关闭</v-btn>
      <v-btn color="primary" :disabled="!year" @click="navigateToYearPage">选择</v-btn>
    </v-card-actions>
  </v-card>
</v-card>
</template>

<script>
import dayjs from 'dayjs';
import { ref } from 'vue';

export default {
  data() {
    return {
      startDate: null,
      endDate: null,
      year: ref(null),
      month: ref(null),
      selectedYearMonth: ref(null),
      displayMode:ref('day')
    };
  },
  methods: {
    updateRange() {
      // 如果需要，可以在跳转前处理日期范围数据，例如保存到Vuex store
    },
    navigateToStatsPage() {
      const startDate = dayjs(this.startDate);
      const endDate = dayjs(this.endDate);
      // 检查日期范围是否超过90天
      if (endDate.diff(startDate, 'day') > 90) {
        // console.error('日期范围不能超过90天');
        alert('日期范围不能超过90天');
        return;
      }
        const dateRange = {
            type : 0,
            start: startDate.format('YYYY-MM-DD'),
            end: endDate.format('YYYY-MM-DD'),
        };
        const dateRangeString = JSON.stringify(dateRange);
        sessionStorage.setItem('dateRange', dateRangeString);
      // 假设你的统计页面路由名为'statistics'
        this.$router.push({ name: 'statis' });
    },
    navigateToMonthPage() {
        const dateRange = {
            type : 1,
            interval: this.selectedYearMonth,
        };
        const dateRangeString = JSON.stringify(dateRange);
        sessionStorage.setItem('dateRange', dateRangeString);
      // 假设你的统计页面路由名为'statistics'
        this.$router.push({ name: 'statis' });
    },
    navigateToYearPage() {
        const dateRange = {
            type : 2,
            interval: this.year,
        };
        const dateRangeString = JSON.stringify(dateRange);
        sessionStorage.setItem('dateRange', dateRangeString);
      // 假设你的统计页面路由名为'statistics'
        this.$router.push({ name: 'statis' });
    },
  displayModeCustom() {
    this.displayMode =  'day';
  },
  displayModeMonth() {
    this.displayMode =  'month';
  },
  displayModeYear() {
    this.displayMode =  'year';
  },
   setYear(year){
  
    this.year = year;
   },
   setMonth(month){
    this.month = month;
    if(month <10){
      this.selectedYearMonth = this.year+"-0"+month;
    }else{
      this.selectedYearMonth = this.year+"-"+month;
    }
    // console.log(this.year );
    // console.log(month );
    // console.log(this.selectedYearMonth);
   },
  },
};
</script>

<style scoped>
/* 根据需要添加样式 */
</style>