// Import Vue
import Vue from 'vue'
import Vuelidate from 'vuelidate'
// Import F7
import Framework7 from 'framework7'
import Framework7Vue from 'framework7-vue'
import store from './vuex/store'

import Routes from './routes.js'
import App from './app'
//import Weixin from 'weixin-jssdk'
import Weixin from 'utility/wx_use.js'



Vue.use(Framework7Vue)

import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
import AppStyles from './css/app.css'

require('./js/jquery-mvalidate')



// Init F7 Vue Plugin
//import validator
Vue.use(Vuelidate)


import f7_mobile_widgets from './js/f7_mobile_widgets'
Vue.prototype.f7_mobile_widgets = f7_mobile_widgets;
Vue.prototype.formatMoney = function (money) {
  var res = {
    intPart:'',
    decPart:'',
  };
  var resArray = (money/10000).toFixed(2).split('.');
  res.intPart = resArray[0];
  res.decPart = '.'+resArray[1];
  return res;
};
Vue.prototype.errCallbacks={
  netErr:function ($vue,text) {
      var title = text || '网络异常，请重试';
      $vue.$f7.addNotification({
          title: title,
          button: {
              text: '关闭',
              color: 'white'
          }
      });
  },
};

var urlRoot;

if(process.env.NODE_ENV=='development'){
    urlRoot = 'http://localhost:8086';
}
else {
    urlRoot = 'http://agent.zhaofangroup.com';
}

// Init App
var vueObj = new Vue({
  el: '#app',
  store,
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    material: true,
    materialRipple:false,
    routes: Routes,
    pushState:true,
    cache:true,
    uniqueHistory:true,
    allowDuplicateUrls:false,
    animateNavBackIcon: false,
    reload:false,
    reloadPrevious:true,
    pushStateSeparator:'',
    pushStateRoot:urlRoot,
    notificationHold:1500,
    preroute: function (view, options) {
        var url = options.url;
        console.log('indexPage',url);
        var pat1 =  new RegExp('forget');
        var pat2 =  new RegExp('login');
        var pat3 =  new RegExp('signup');
        if(url=='/'&&!localStorage.user_is_login){
            view.router.loadPage('/login/');
            return false;
        }
        if(url=='/'&&localStorage.user_is_login){
            view.router.loadPage('/account/profile/');
            return false;
        }
        if(!pat1.test(url)&&!pat2.test(url)&&!pat3.test(url)&&!localStorage.user_is_login)
        {
            view.router.loadPage('/login/');
            return false;
        }
        if(pat2.test(url)&&localStorage.user_is_login){
            view.router.loadPage('/account/profile/');
            return false;
        }
        else return true;
    },
  },
  // Register App Component
  components: {
    app: App
  },
});

export default vueObj;
