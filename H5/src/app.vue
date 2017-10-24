<template>
  <!-- App -->
  <div id="app">
    <f7-statusbar></f7-statusbar>
    <f7-views>
      <f7-view id="main-view" navbar-through :dynamic-navbar="true" main>
        <f7-pages>
          <f7-page url="/login/" name="home-page">
          <!--<f7-navbar title="主页" back-link="/account/profile/" sliding></f7-navbar>-->
          <!--<f7-block-title>Navigation</f7-block-title>-->
          <!--<f7-list>-->
            <!--<f7-list-item link="/demo/" title="样式"></f7-list-item>-->
            <!--<f7-list-item link="/login/" title="A01-登录"></f7-list-item>-->
            <!--<f7-list-item link="/signup/normal/b00184378bcbe0f8f414b93504fe4442" title="A02-注册-普通"></f7-list-item>-->
            <!--<f7-list-item link="/signup/employee/SG_2691E" title="A03-注册-员工"></f7-list-item>-->
            <!--<f7-list-item link="/signup/manager/JX_26552" title="A04-注册-经理"></f7-list-item>-->
            <!--<f7-list-item link="/forget/password/" title="A05-忘记密码"></f7-list-item>-->
            <!--<f7-list-item link="/signup/success/" title="A06-注册成功"></f7-list-item>-->

            <!--<f7-list-item link="/order/add_order/" title="B01-添加订单1"></f7-list-item>-->
            <!--<f7-list-item link="/order/order_success/" title="B02-提交成功"></f7-list-item>-->
            <!--<f7-list-item link="/order/seller-information/" title="B03-完善资料1"></f7-list-item>-->
            <!--<f7-list-item link="/order/property-information/" title="B03-完善资料2"></f7-list-item>-->
            <!--<f7-list-item link="/order/buyer-information/" title="B03-完善资料3"></f7-list-item>-->
            <!--<f7-list-item link="/order/order_fail/" title="B04-提交失败"></f7-list-item>-->

            <!--<f7-list-item link="/account/profile/" title="C01-主页"></f7-list-item>-->
            <!--<f7-list-item link="/account/index/" title="C01-个人资料"></f7-list-item>-->

            <!--<f7-list-item link="/order/company_performance/" title="C01-公司业绩"></f7-list-item>-->
            <!--<f7-list-item link="/order/personal_performance/" title="C01-我的业绩"></f7-list-item>-->
            <!--<f7-list-item link="/info/seller-information/" title="C09-完善卖家信息"></f7-list-item>-->
            <!--<f7-list-item link="/info/property-information/" title="C10-完善房产资料"></f7-list-item>-->
            <!--<f7-list-item link="/info/buyer-information/" title="C11-完善买家资料"></f7-list-item>-->
            <!--<f7-list-item link="/store/my-store/" title="C15-我的门店"></f7-list-item>-->
            <!--<f7-list-item link="/store/my-store-shopowner/" title="C15-我的门店-店长"></f7-list-item>-->
            <!--<f7-list-item link="/store/store-information/" title="C16-门店信息"></f7-list-item>-->
            <!--<f7-list-item link="/store/store-details/" title="C15-门店详情"></f7-list-item>-->
            <!--<f7-list-item link="/invite/invite-friends/" title="C18-邀请好友"></f7-list-item>-->
            <!--<f7-list-item link="/invite/invite-friends-boss/" title="C18-邀请好友-boss"></f7-list-item>-->
            <!--<f7-list-item link="/invite/invite-friends-salesman/" title="C18-邀请好友-业务员"></f7-list-item>-->

            <!--<f7-list-item link="/test/" title="测试"></f7-list-item>-->
          <!--</f7-list>-->
        </f7-page>
        </f7-pages>
      </f7-view>
    </f7-views>
    <div class="overlay_cover"></div>
  </div>
  <!-- <div id="app">
    <login v-if="false"></login>
    <profile v-if="true"></profile>
  </div> -->
</template>

<script>
import Login from'./pages/login/login'
import Profile from'./pages/account/profile'
export default {
  components: {
    Login,
    Profile
  },
  methods:{

  },
  computed:{
    is_login(){
      if(localStorage.getItem('user_is_login')=='true'){
        return true;
      }
      return false;
    }
  },
//  created(){
//    console.log(this);
//    this.$router.load('/login/');
//  },
  mounted(){
    var $vue = this;
     console.log(this,'check this');
    this.$store.dispatch('getConfigs').catch(e => {
        $vue.errCallbacks.netErr($vue, '获取配置信息失败');
    });
  }
}
</script>

<style>

</style>