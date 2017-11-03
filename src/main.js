//页面配置
import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
//import NProgress from 'nprogress'
//import 'nprogress/nprogress.css'
import {constantRouterMap as routes} from './routes'
import Mock from './mock'
Mock.bootstrap();
import 'font-awesome/css/font-awesome.min.css'
// import VueI18n from 'vue-i18n'//多语言
// import enLocale from 'element-ui/lib/locale/lang/en';
// import arLocale from 'element-ui/lib/locale/lang/ar'   //tr-TR     ar    en    zh-CN
// Vue.use(VueI18n) //设置语言
// Vue.config.lang = 'en'
//Vue.locale('en',enLocale)
//默认情况下中文语言包依旧是被引入的，可以使用 webpack 的 NormalModuleReplacementPlugin 替换默认语言包。

Vue.use(ElementUI);// 引入component  ：Vue.component(ElementUI)
Vue.use(VueRouter);
Vue.use(Vuex);

//NProgress.configure({ showSpinner: false });

const router = new VueRouter({
  // ES6缩写语法，相当于routes:routes
  routes
})


// 路由钩子: beforeEach
router.beforeEach((to, from, next) => {
  document.title = to.name;
  //NProgress.start();
  if(to.path == '/login'){
    store.dispatch('logOut');
    store.dispatch('RemoveRoutes');
    next();
  }else{
    let user = store.state.user.user,menus,routes;
    if(!user){
      console.log('no user')
      next({path:'/login'});
    }else{
      user = JSON.parse(user),
      routes = store.getters.all_routers,
      menus = user.menus;
     // if(!routes || routes.length ==0){ // 未生成用户菜单
          store.dispatch('GenerateRoutes',{menus}).then( () => { // 生成可访问菜单
            router.addRoutes(store.getters.all_routers) //动态添加可访问路由表
            //console.log(router.options.routes)
            next();
            //next({ ...to }) //hack方法  确保addRoutes完成
          }).catch(() => {
           store.dispatch('logOut');//清空token userinfo
            store.dispatch('RemoveRoutes'); //清空用户routes
            next({path : '/login'});
          });
      //}else{ //已生成用户菜单
      //  store.dispatch('formateRoutes');
      //    next();
     // }   
    }
  }
})


//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App) //createElement
}).$mount('#app')


