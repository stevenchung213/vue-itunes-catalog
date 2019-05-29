import Vue from 'vue';
import Main from './Main';
import router from './router';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial);

new Vue({
  el: '#root',
  router,
  render: h => h(Main)
});
