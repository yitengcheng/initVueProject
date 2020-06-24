import Vue from 'vue';
import Router from 'vue-router';
import Main from './../views/main';

Vue.use(Router);

const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace (location) {
    return originalReplace.call(this, location).catch(err => err);
};

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main
        },
    ],
    
});

