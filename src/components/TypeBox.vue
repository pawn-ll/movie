<template>
  <v-container>
      <v-col cols="12" sm="6" md="4">
          <v-card-text>
            <v-btn @click="showDatePicker = true" style="width:200px ;background-color: #007bff; color: white; font-size: 15px;">统计</v-btn>
          </v-card-text>
        <v-dialog v-model="showDatePicker" persistent max-width="1000px">
          <DateRangePicker @closeDialog="showDatePicker= flase" />
        </v-dialog>
      </v-col>
  </v-container>
</template>

<script>
import {ref } from 'vue';
import DateRangePicker from '@/components/DateRangePicker.vue';

export default {
  components: {
    DateRangePicker,
  },
  setup() {

    const showDatePicker = ref(false);

    return {
      showDatePicker,
    };
  },
};
</script>

<style scoped>
/* 可以添加自定义样式 */
</style>