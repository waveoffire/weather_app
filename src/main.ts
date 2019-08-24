import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueResource from "vue-resource";
import vueMoment from "vue-moment";
import "moment/locale/pl";
import * as moment from "moment";
Vue.use(vueMoment, {
  moment
});
Vue.use(vueMoment);
Vue.config.productionTip = false;
Vue.use(VueResource);
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
