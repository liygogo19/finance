<template>
    <f7-page class="b-part-page">
        <!-- Material Theme Navbar -->
        <f7-navbar>
            <f7-link href="/account/profile/" class="icon-only link icon-only">
                <i class="icon icon-back"></i>
            </f7-link>
            <f7-nav-center>提交失败</f7-nav-center>
        </f7-navbar>

        <f7-block class="col-flex-center">
            <div class="result_bg result_size fail_result margin-top-4 margin-bot-2"></div>
            <div class="font-20 font-color-4 margin-bot-1">订单提交失败</div>
            <div class="font-14 margin-bot-3 font-color-2">请检查您的网络设置</div>
        </f7-block>
    </f7-page>
</template>

<script>
    export default {

    }
</script>

<style>
    .fail_result{
        background-image: url("../../img/order/fail.svg");
    }
</style>
