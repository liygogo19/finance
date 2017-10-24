<template>
    <f7-page class="signUp_success_bg">
        <!-- Material Theme Navbar -->
        <f7-navbar title="注册成功" back-link="Back" sliding></f7-navbar>
        <f7-block class="success_content col-flex-center">
            <div class="font-20 font-color-3">恭喜您注册成功</div>
            <div class="margin-top-1-2 font-color-2">关注“找饭金融”公众号，开启美好生活!</div>
        </f7-block>
        <f7-block class="margin-top-4 col-flex-center">
            <f7-button big class="font-16 width-75">关注“找饭金融”公众号</f7-button>
        </f7-block>
        <f7-block class="col-flex-center font-14 font-color-2 pos-tele">
            客服电话：400-011-2933.
        </f7-block>
    </f7-page>
</template>

<style>
    .signUp_success_bg .page-content{
        background-image: url("../../img/bg/bj_cg@3x.png");
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center 56px;
    }

    .success_content{
        margin-top: 50%;
    }

    .pos-tele{
        position: absolute;
        bottom: 0;
        width: 100%;
    }
</style>