<template>
    <f7-page class="bg-img-show bg-invite">
        <f7-navbar title="邀请好友" back-link="Back" sliding></f7-navbar>

        <f7-block class="margin-top-4">
            <div class="hor-flex-center">
                <div class="icon-show icon-salesman no-padding"></div>
            </div>
            <div class="hor-flex-center margin-top-3">
                <div class="icon-show invite-code no-padding">
                    <img :src="img_code" class="width-100 height-100">
                </div>
            </div>
            <div class="hor-flex-center margin-top-1 font-18">邀请好友关注找饭金融公众号</div>
            <div class="hor-flex-center">
                <f7-button big class="margin-top-3 width-60 font-18 hor-flex-center">分享</f7-button>
            </div>
        </f7-block>
    </f7-page>
</template>

<script>
    export default {
        data(){
            return {
                img_code:''
            }
        },
        methods:{
            inviteManager:function () {
                this.is_invite_manager=true;
            },
            inviteFriend:function () {
                this.is_invite_manager=false;
            }
        },
        mounted(){
            this.$store.dispatch('registerAgent').then(response =>{
                if(response.success){
                    this.img_code = response.results
                }
            })
        }
    }
</script>