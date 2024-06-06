<template>
  <v-card>
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
</template>

<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      startDate: null,
      endDate: null,
    };
  },
  methods: {
    updateRange() {
      // 如果需要，可以在跳转前处理日期范围数据，例如保存到Vuex store
    },
    navigateToStatsPage() {
        const dateRange = {
            type : 0,
            start: dayjs(this.startDate).format('YYYY-MM-DD'),
            end: dayjs(this.endDate).format('YYYY-MM-DD'),
        };
        const dateRangeString = JSON.stringify(dateRange);
      // 假设你的统计页面路由名为'statistics'
        this.$router.push({ name: 'statis', query: { dateRange:dateRangeString } });
    },
    
  },
};
</script>

<style scoped>
/* 根据需要添加样式 */
</style>