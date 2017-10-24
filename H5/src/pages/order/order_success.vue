<template>
    <f7-page class="b-part-page">
        <!-- Material Theme Navbar -->
        <f7-navbar>
            <f7-link href="/account/profile/" class="icon-only link icon-only">
                <i class="icon icon-back"></i>
            </f7-link>
            <f7-nav-center>提交成功</f7-nav-center>
        </f7-navbar>

        <f7-block class="col-flex-center height-100 margin-bot-subtract-4">
            <div class="result_bg result_size success_result margin-top-4 margin-bot-2"></div>
            <div class="font-20 font-color-3 margin-bot-1">订单提交成功</div>
            <div class="font-14 margin-bot-3 font-color-2">客服会在1-2个工作日内打电话给您。</div>
            <f7-button class="width-60 margin-bot-1" big @click="improve">完善资料</f7-button>
            <div class="font-14 font-color-4">您也可以完善资料加快服务进程</div>
            <div class="font-14 font-color-4">资料越完善，客服越快处理</div>
        </f7-block>
        <f7-block class="col-flex-center">
            <div class="font-14 font-color-999">客服电话：400-011-2933</div>
        </f7-block>
    </f7-page>
</template>

<script>
    export default {
        methods:{
            improve(){
                //this.$f7.getCurrentView().router.back({pageName:'home-page', force: true});
                 this.$router.load({url: '/order/seller-information/'});
            }
        },
        mounted(){


        }
    }
</script>

<style>
    .success_result{
        background-image: url("../../img/order/success.svg");
    }
</style>
