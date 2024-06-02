import { defineComponent } from 'vue';

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

import Vue from 'vue';
import { Router } from 'vue-router';

declare module 'vue/types/vue' {
  interface Vue {
    $router: Router;
    $route: Router.Route;
  }
}