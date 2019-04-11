import * as synctractor from 'synctractor';
synctractor.init();
synctractor.monitorFetch();
synctractor.monitorTimeout((_, t) => t !== 12345);

import Vue from 'vue'
import App from './app.vue'

new Vue({
  el: '#app',
  render: h => h(App)
})