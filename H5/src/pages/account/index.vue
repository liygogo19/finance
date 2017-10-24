<template>
    <f7-page id="account-index" >
        <f7-navbar title="个人资料" back-link="Back" sliding></f7-navbar>
        <f7-list class="bg-color-1">
            <f7-list-item @click="choose_imgae" title="头像" class="no-arrow-link font-16">
                    <div class="icon_setting img_setting avator-size avator_img">
                        <img :src="avatorImage" alt="">
                    </div>
            </f7-list-item>
            <f7-list-item class="no-arrow-link font-16" link="/account/edit/name/" title="姓名" :after=this.user_info.name></f7-list-item>
            <f7-list-item class="no-arrow-link font-16" link="/account/edit/phone/" title="手机号码" :after=this.user_info.phone></f7-list-item>
            <f7-list-item class="no-arrow-link font-16" title="所属公司" :after="this.user_info ? this.user_info.company.name : ''"></f7-list-item>
            <f7-list-item v-if="this.user_info.level < '3'" class="no-arrow-link font-16" title="所属门店" :after="this.user_info ? this.user_info.store[0].name : ''"></f7-list-item>

        </f7-list>
        <f7-list class="bg-color-1">
            <f7-list-item link="/account/edit/password/" title="修改密码"></f7-list-item>
        </f7-list>
        <!--<input type="file" @change="upload_imag" id="avator_input" accept="image/png, image/jpeg, image/jpg" />-->
        <f7-button big class="no-radius bg-color-1 font-color-7 ab-bot-2" @click="log_out">退出登录</f7-button>
    </f7-page>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import api_params from 'utility/api_params'

    export default{
        methods:{
            ...mapActions([
                'logOut'
            ]),
            choose_imgae(){
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'],
                    sourceType: ['album', 'camera'],
                    success: function (res) {
                        var localIds = res.localIds;
                        console.log('localIds',localIds);
                    }
                });
                //$('#avator_input').click();
            },
            upload_imag($event){
                let file = $event.target.files[0];
                let param = new FormData();
                param.append('picture',file,file.name);
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };
                this.$store.dispatch('editInformation',param);
            },
            log_out(){
                this.$f7.showIndicator();
                var $vue = this;
                this.logOut().then(response => {
                    this.$f7.hideIndicator();
                    if(response.success){
                        this.$router.load({url: '/login/'});
                    }
                }).catch(e => {
                    $vue.errCallbacks.netErr($vue);
                });
            },
        },
        computed: {
            ...mapGetters({
                user_info:'user_info'
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
        created(){
            this.$store.dispatch('getWxInfo').then(res => {
                wx.ready(function (ee) {
                    console.log(ee);
                    console.log('weixin Api connection successfully^^!!');
                });

                wx.error(function(res){
                    console.log('weixin Api connection failure^^!!',res);
                });

                wx.checkJsApi({
                    jsApiList: ['chooseImage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                    success: function(res) {
                        console.log('chooseImage Api connection successfully^^!!',res);
                    }
                });
            });
        }
    }
</script>

<style>
    #avator_input{
        display: none;
    }
</style>