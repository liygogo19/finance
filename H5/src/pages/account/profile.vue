<template>
    <f7-page  id="profile" no-navbar>
        <div class="icon_setting profile-top">
            <template v-if="false">
                <f7-link class="avator_bg avator-link" href="/login/">
                    <div class="avator-img icon_setting"></div>
                    <div class="avator-login">登录</div>
                </f7-link>
            </template>
            <template v-if="true">
                <f7-link class="avator_bg avator-link" href="/account/index/">
                    <div class="icon_setting img_setting avator-size avator_img with-round-border bg-color-1">
                        <img :src="avatorImage" alt="">
                    </div>
                    <div class="avator-login avator-info">
                        <div class="hor-flex-center">
                            {{this.user_info.name || '无'}}
                            <template v-if="this.user_info.level == '2'">
                                <div class="margin-left-1 font-14 font-color-6 title-style">
                                    <span class="icon_setting  title-icon"></span>
                                    <span>店长</span>
                                </div>
                            </template>
                        </div>
                        <span>{{this.user_info.introduce || '暂无'}}</span>
                    </div>
                </f7-link>
            </template>
        </div>
        <f7-link :href="this.user_info.level>1?'/order/company_performance/':'/order/personal_performance/'" class="display-block bg-color-1 padding-col-1-2 font-color-1">
            <f7-grid class="order-num" no-gutter>
                <f7-col>
                    <div class="padding-bot-1-2">{{achievment.finishCount}}</div>
                    <div class="padding-left-3-2 form_bg order-icon font-color-2">本月完成订单(单)</div>
                </f7-col>
                <f7-col>
                    <div class="padding-bot-1-2">{{achievment.money}}</div>
                    <div class="padding-left-3-2 form_bg money-icon font-color-2">本月完成金额(万)</div>
                </f7-col>
            </f7-grid>
        </f7-link>

        <f7-list class="bg-color-1">
            <f7-list-item :media="'<img src='+add_order_img+'>'" link="/order/add_order/" title="添加订单" ></f7-list-item>
            <f7-list-item :media="'<img src='+my_order_img+'>'" link="/account/myOrders/" title="我的订单" ></f7-list-item>
            <f7-list-item v-if="this.user_info.level > '1'" :media="'<img src='+salesman_order_img+'>'" link="/account/employeeOrders/" title="业务员订单" ></f7-list-item>
            <f7-list-item v-if="this.user_info.level == '1'" :media="'<img src='+my_store_img+'>'" link="/store/my-store-shopowner/" title="我的门店" ></f7-list-item>
        </f7-list>

        <f7-list v-if="this.user_info.level > '1'" class="bg-color-1">
            <f7-list-item :media="'<img src='+salesman_img+'>'" link="/account/mySalesmans/" title="我的业务员"></f7-list-item>
            <f7-list-item :media="'<img src='+my_store_img+'>'" link="/store/my-store-shopowner/" title="我的门店" :after="this.user_info.store.length.toString()" ></f7-list-item>
        </f7-list>

        <f7-list class="bg-color-1">
            <f7-list-item v-if="this.user_info.level > '2'" :media="'<img src='+share_img+'>'" link="/invite/invite-friends-boss/" title="邀请好友" ></f7-list-item>
            <f7-list-item v-if="this.user_info.level < '3'" :media="'<img src='+share_img+'>'" link="/invite/invite-friends-salesman/" title="邀请好友" ></f7-list-item>
        </f7-list>


    </f7-page>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import api_params from 'utility/api_params'
   // import Weixin from 'utility/wx_use'
//    var wx = require('weixin-js-sdk');

    export default {
        data(){
            return {
                add_order_img:require('../../img/profile/add_order.svg'),
                my_order_img:require('../../img/profile/my_order.svg'),
                my_store_img:require('../../img/profile/my_store.svg'),
                salesman_order_img:require('../../img/profile/saleaman_order.svg'),
                share_img:require('../../img/profile/share.svg'),
                salesman_img:require('../../img/profile/salesman.svg'),
                achievment:{
                    finishCount:0,
                    money:0
                },
                wx:null
            }
        },
        computed: {
            ...mapGetters({
                user_info:'user_info',
                user_token:'user_token'
            }),
            avatorImage:function () {
                var prefix = api_params.base_url;
                var avator = this.user_info.picture;
                if(avator){
                    return prefix+'../'+avator;
                }
                else {
                    return require('../../img/profile/Headman_70@2x.png');
                }
            }
        },
        methods:{
            achievmentData(data){
                var $vue = this;
                if(data && data.length!=0){
                    $vue.achievment.finishCount = data.finishCount[data.finishCount.length-1];
                    $vue.achievment.money = (data.money[data.money.length-1]/10000).toFixed(0);
                }
                $vue.$f7.hideIndicator();
            },
//            testNet(){
//                console.log(wx,'wx.getNetworkType')
//            }
        },
        mounted(){
            var level = this.$store.state.login.user_info.level;
            var store_ref = this.$store.state.login.user_info.store[0].ref || '';
            var agent_ref = this.$store.state.login.user_info.ref;
            var $vue = this;
            this.$f7.showIndicator();
            console.log('- - - -',$vue);
            if(level > 2){
                this.$store.dispatch('companyFiveMonthAchievment').then((response) => {
                    if(response.success){
                        this.achievmentData(response.results);
                    }
                }).catch(response => {
                    $vue.$f7.hideIndicator();
                    $vue.errCallbacks.netErr($vue);
                });
            }else if(level > 1){
                this.$store.dispatch('getCompanyAchievement',api_params.store_total_achievment).then((response) => {
                    if(response.success){
                        this.achievmentData(response.results.statisticsFiveMonth);

                    }
                }).catch(response => {
                    $vue.$f7.hideIndicator();
                    $vue.errCallbacks.netErr($vue);
                });
            }else{
                this.$store.dispatch('personFiveMonthAchievment',{'agent_ref':agent_ref}).then((response) => {
                    if(response.success){
                        this.achievmentData(response.results);
                    }
                }).catch(response => {
                    $vue.$f7.hideIndicator();
                    $vue.errCallbacks.netErr($vue);
                });
            }


            //var wx = new Weixin.config('http://agent.zhaofangroup.com/account/profile/',['getNetworkType',]);
            //var ret = wxObj.config('http://agent.zhaofangroup.com/account/profile/',['getNetworkType',]);
//            console.log(wx,'retProfile');
//            wx.config(ret);
//            wx.ready(function () {
//                wx.getNetworkType({
//                    success: function (res) {
//                        var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
//                        alert(networkType);
//                    }
//                });
//            });

        }
    }
</script>

<style>
    .profile-top{
        height: 13rem;
        background-repeat: repeat!important;
        background-image: url("../../img/profile/bg_my@3x.png");
        display: flex;
        align-items: center;
    }

    .avator-link{
        flex: 1;
        color: #ffffff;
        margin-left: 1rem;
        margin-right: 1rem;
        padding-right: 3rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        background-image: url("../../img/profile/Back.svg");
        background-size: 12px 21px;
    }

    .avator-img{
        flex: 0 0 4rem;
        height: 4rem;
        background-color: #ffffff;
        border: 1px solid #ffffff;
        border-radius: 50%;
        background-image: url("../../img/profile/Headman_70@3x.png");
    }

    .avator-woman-img{
        width: 4rem;
        height: 4rem;
        background-color: #ffffff;
        border: 1px solid #ffffff;
        border-radius: 50%;
        background-image: url("../../img/profile/headwoman_70@3x.png");
    }

    .avator-login{
        margin-left: 1rem;
    }

    .avator-info{
        height: 4rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .order-icon{
        background-image: url("../../img/profile/order.svg");
    }

    .money-icon{
        background-image: url("../../img/profile/money.svg");
    }

    .with-round-border{
        flex: 0 0 4rem!important;
        border: 1px solid #fff;
        border-radius: 2rem;
    }

    .avator_img>img{
        height: 4rem!important;
        object-fit: cover!important;
        -o-object-fit: cover!important;
    }

</style>