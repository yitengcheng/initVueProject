/* eslint-disable no-console */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/scss/base.scss';
import VueLazyLoad from 'vue-lazyload';
import infiniteScroll from 'vue-infinite-scroll';
import axios from 'axios';
import loadsh from 'lodash';
import store from './vuex/index';
import ElementUI from 'element-ui';
import { currency } from './utils/currency';
import * as utils from './utils/validation';
import moment from 'moment';
import Icon from 'vue2-svg-icon/Icon.vue';
import ECharts from 'vue-echarts/components/ECharts.vue';
import 'echarts';
import 'echarts-wordcloud';
import JsonExcel from 'vue-json-excel';
import 'amfe-flexible';

Vue.config.productionTip = false;
Vue.use(VueLazyLoad, {
    loading: '/static/loading-svg/loading-balls.svg'
});
Vue.use(infiniteScroll);
Vue.component('icon', Icon);
Vue.component('downloadExcel', JsonExcel);
Vue.component('v-chart', ECharts);
axios.interceptors.response.use(
    response => {
        console.log('success', { data: response.data, status: response.status });
        if (!response.data.success && response.data.status === 100) {
            router.replace('/');
            store.commit('user/updateUser', '');
        }
        return response.data;
    },
    error => {
        console.log('error');
        console.log(error);
        console.log(JSON.stringify(error));
        return Promise.reject(error);
    }
);
Vue.prototype.$http = axios;
Vue.prototype._ = loadsh;
Vue.prototype.$utils = utils;
Vue.prototype.$moment = moment;
Vue.filter('currency', currency);
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
