<template>
    <f7-page>
        <!-- Material Theme Navbar -->
        <f7-navbar title="F7组件" back-link="Back" sliding></f7-navbar>
        <!-- Page Content -->
        <f7-block-title>F7-components</f7-block-title>

        <f7-list form>
            <!-- Text Input -->
            <f7-list-item>
                <f7-input type="text" placeholder="Name"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-input type="password" placeholder="Password"></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-input class="with-icon form_bg username-demo" type="text" placeholder="用户名"/>
            </f7-list-item>
            <f7-list-item class="send-code-list">
                <f7-input class="with-icon form_bg username-demo send-code" type="text" placeholder="用户名"/>
                <div class="send-code-block">
                    <div class="code-content" id="send-code-demo">发送验证码</div>
                </div>
            </f7-list-item>
            <f7-block>
                <f7-button big>登 录</f7-button>
            </f7-block>
        </f7-list>
        <f7-block-title class="title-with-icon">List</f7-block-title>
        <f7-list>
            <f7-list-item title="卖家姓名" class="item-link with-input" >
                <input type="text" placeholder="请输入卖家姓名">
            </f7-list-item>
            <f7-list-item title="房产按揭" class="item-link with-input" >
                <input type="text" id="house-mortgage-demo" placeholder="房产按揭">
            </f7-list-item>
            <f7-list-item title="还款时间" class="item-link with-input" >
                <input id="bank-paytime-demo" type="text" placeholder="请选择银行还款时间(选填)">
            </f7-list-item>
        </f7-list>
        <f7-block-title class="user-title-demo form_bg top-line title-with-icon">Profile</f7-block-title>
        <f7-list>
            <f7-list-item title="昵称" class="with-input with-right with-profile-title" >
                <input type="text" placeholder="李芸芸">
            </f7-list-item>
            <f7-list-item title="电话号码" class="with-input with-right with-profile-title" >
                <input type="text" placeholder="13223022020">
            </f7-list-item>
            <f7-list-item :media="'<img src='+store_img+'>'" link="/about/" title="我的门店"  after="2"></f7-list-item>
        </f7-list>
        <f7-block-title>Navigation</f7-block-title>
        <f7-list>
            <f7-list-item link="/about/" title="修改密码"></f7-list-item>
        </f7-list>
        <f7-block-title>
            <f7-block>
                <f7-button id="cus-tele-demo" tele="400-200-3456">拨打电话</f7-button>
            </f7-block>
        </f7-block-title>
    </f7-page>
</template>

<script>
    export default {
        methods:{
            onF7Init:function () {
                this.f7_mobile_widgets.f7_mobile_calendar(this,'#bank-paytime-demo');
                this.f7_mobile_widgets.f7_mobile_picker(this,'#house-mortgage-demo',['0','1'],['需要','不需要']);
                this.f7_mobile_widgets.f7_mobile_tele(this,'#cus-tele-demo');
                this.f7_mobile_widgets.f7_mobile_captcha(this,'#send-code-demo');
            }
        },
        data(){
            return {
                store_img:require('../img/demo/user_h.svg'),
            }
        },
        mounted(){

        }
    }
</script>

<style>
    .user-title-demo.content-block-title{
        background-image: url("../img/demo/user_h.svg");
    }

    .with-icon.username-demo{
        background-image: url("../img/demo/user.svg");
    }

    .with-icon.username-demo.focus-state{
        background-image: url("../img/demo/user_h.svg");
    }
</style>