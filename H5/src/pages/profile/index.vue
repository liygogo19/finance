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
                <f7-link class="avator_bg avator-link" href="/demo/">
                    <div class="avator-img icon_setting"></div>
                    <div class="avator-login avator-info">
                        <span>李芸芸</span>
                        <span>优米房产合伙人</span>
                    </div>
                </f7-link>
            </template>
        </div>
        <div class="bg-color-1 padding-col-1-2">
            <f7-grid class="order-num" no-gutter>
                <f7-col>
                    <div class="padding-bot-1-2">0</div>
                    <div class="padding-left-3-2 form_bg order-icon font-color-2">本月完成订单(单)</div>
                </f7-col>
                <f7-col>
                    <div class="padding-bot-1-2">0</div>
                    <div class="padding-left-3-2 form_bg money-icon font-color-2">本月完成金额(万)</div>
                </f7-col>
            </f7-grid>
        </div>

        <f7-list class="bg-color-1">
            <f7-list-item :media="'<img src='+add_order_img+'>'" link="/demo/" title="添加订单" ></f7-list-item>
            <f7-list-item :media="'<img src='+my_order_img+'>'" link="/demo/" title="我的订单" ></f7-list-item>
            <f7-list-item :media="'<img src='+salesman_order_img+'>'" link="/demo/" title="业务员订单" ></f7-list-item>
            <f7-list-item v-if="false" :media="'<img src='+my_store_img+'>'" link="/demo/" title="我的门店" ></f7-list-item>
        </f7-list>

        <f7-list class="bg-color-1">
            <f7-list-item :media="'<img src='+salesman_img+'>'" link="/demo/" title="我的业务员" after="233" ></f7-list-item>
            <f7-list-item v-if="false" :media="'<img src='+my_order_img+'>'" link="/demo/" title="我的订单" ></f7-list-item>
            <f7-list-item :media="'<img src='+my_store_img+'>'" link="/demo/" title="我的门店" after="2" ></f7-list-item>
        </f7-list>

        <f7-list class="bg-color-1">
            <f7-list-item :media="'<img src='+share_img+'>'" link="/demo/" title="邀请好友" ></f7-list-item>
        </f7-list>

    </f7-page>
</template>

<script>
    export default {
        data(){
            return {
                add_order_img:require('../../img/profile/add_order.svg'),
                my_order_img:require('../../img/profile/my_order.svg'),
                my_store_img:require('../../img/profile/my_store.svg'),
                salesman_order_img:require('../../img/profile/saleaman_order.svg'),
                share_img:require('../../img/profile/share.svg'),
                salesman_img:require('../../img/profile/salesman.svg'),
            }
        },
        mounted(){

        }
    }
</script>

<style>
    .profile-top{
        height: 13rem;
        background-repeat: repeat;
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
        width: 4rem;
        height: 4rem;
        background-color: #ffffff;
        border: 1px solid #ffffff;
        border-radius: 50%;
        background-image: url("../../img/profile/Headman_70@3x.png");
    }

    .avator-g-img{
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

</style>