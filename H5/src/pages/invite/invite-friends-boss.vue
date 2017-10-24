<template>
    <f7-page class="invite bg-img-show bg-invite">
        <f7-navbar title="邀请好友" back-link="Back" sliding></f7-navbar>

        <f7-block class="b-part-page order-performance">
            <div class="navbar-size bg-white font-16 hor-flex-center margin-clear">
                <f7-list class="performance-toggle border-size-1 border-color-green border-radius-20">
                    <f7-link href="#" class="width-50 height-100 hor-flex-center" :class="{active:is_invite_manager}" @click="inviteManager">邀请店长</f7-link>
                    <f7-link href="#" class="width-50 height-100 hor-flex-center width-te" :class="{active:!is_invite_manager}" @click="inviteFriend">邀请好友</f7-link>
                </f7-list>
            </div>
        </f7-block>

        <f7-block v-if="is_invite_manager" class="margin-top-4">
            <div class="hor-flex-center">
                <div class="icon-show icon-salesman no-padding"></div>
            </div>
            <div class="hor-flex-center margin-top-3">
                <div class="icon-show invite-code no-padding">
                    <img :src="img_code" class="width-100 height-100">
                </div>
            </div>
            <div class="hor-flex-center margin-top-1 font-18">邀请您的店长加入找饭金融</div>
            <div class="hor-flex-center">
                <f7-button big class="margin-top-3 width-60 font-18 hor-flex-center">分享</f7-button>
            </div>
        </f7-block>

        <f7-block v-if="!is_invite_manager" class="margin-top-4">
            <div class="hor-flex-center">
                <div class="icon-show icon-salesman no-padding"></div>
            </div>
            <!--<div class="hor-flex-center margin-top-3">-->
                <!--<div class="icon-show invite-code no-padding">-->
                    <!--<img :src="img_code_agent" class="width-100 height-100">-->
                <!--</div>-->
            <!--</div>-->

            <!--<f7-accordion class="top-line">-->
                <!--<f7-accordion-item>-->
                    <!--<f7-accordion-content class="accordion-col-height-3-2 padding-side-1">-->
                        <!--<f7-grid class="div-with-margin-col-1-4 font-color-1 padding-col-1-2">-->
                            <!--<f7-block-title class="margin-top-1 padding-col-2-3 font-color-666 height-fixed-20">-->
                                <!--<div class="icon-show icon-store icon-size-20 font-18">123</div>-->
                            <!--</f7-block-title>-->
                        <!--</f7-grid>-->
                    <!--</f7-accordion-content>-->
                    <!--<f7-accordion-toggle class="margin-bot-1 bg-color-2">-->
                        <!--<div class="accordion-toogle-btn icon_setting bg-size-60"></div>-->
                    <!--</f7-accordion-toggle>-->
                <!--</f7-accordion-item>-->
            <!--</f7-accordion>-->

            <template v-for="storeList in list">
                <f7-block>
                    <f7-card>
                        <div @click="getQrImage(storeList.store_ref)">
                            <f7-block-title class="padding-col-2-3 font-color-666 height-fixed-20 bg-color-1 bottom-line">
                                <div class="icon-show icon-store icon-size-20 font-18">{{storeList.name}}</div>
                            </f7-block-title>
                            <f7-card-content class="myStore">
                                <div class="number display-flex border-top-0">
                                    <div class="font-14 color-gray">
                                        <p class="font-18 font-color-3 margin-top-1-2 margin-bot-0 hor-flex-center">{{storeList.count}}</p>
                                        <p class="hor-flex-center margin-clear">本月订单(个)</p>
                                    </div>
                                    <div class="font-14 color-gray">
                                        <p class="font-18 font-color-3 margin-top-1-2 margin-bot-0 hor-flex-center">{{formatMoney(storeList.money).intPart}}{{formatMoney(storeList.money).decPart}}</p>
                                        <p class="hor-flex-center margin-clear">本月金额(万)</p>
                                    </div>
                                </div>
                            </f7-card-content>
                        </div>
                        <div v-if="list[storeList.store_ref]" class="width-100-wrap">
                            <img class="width-100" :src="list[storeList.store_ref]">
                        </div>
                    </f7-card>
                </f7-block>
            </template>
            <div class="hor-flex-center margin-top-1 font-18">邀请好友加入您的店铺</div>
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
                is_invite_manager:true,
                img_code:'',
                img_code_agent:{},
                list:{}
            }
        },
        methods:{
            getQrImage(storeRef){
                if(!this.list[storeRef]){
                    this.$f7.showIndicator();
                    this.$store.dispatch('registerAgentLeader',{'store_ref':storeRef}).then(response =>{
                        this.$f7.hideIndicator();
                        if(response.success){
                            this.$set(this.list,storeRef,response.results[0]);
//                            console.log('invite list',this.list);
//                            console.log('invite',this.$set(this.list,storeRef,response.results[0]));
                        }
                    });
                }else{
                    this.list[storeRef] = '';
                }
            },
            inviteManager:function () {
                if(!this.img_code){
                    this.$f7.showIndicator();
                    this.$store.dispatch('registerAgent').then(response =>{
                        this.$f7.hideIndicator();
                        if(response.success){
                            this.img_code = response.results
                        }
                    });
                }
                this.is_invite_manager=true;
            },
            inviteFriend:function () {
                var $vue = this;
                this.$f7.showIndicator();
                this.$store.dispatch('getStoreList').then(response =>{
                    this.$f7.hideIndicator();
                    console.log(response.results);
                    $vue.list = response.results;
                });

                this.is_invite_manager=false;
            }
        },
        mounted(){
            var $vue = this;
            this.$f7.showIndicator();

            this.$store.dispatch('registerAgent').then(response =>{
                this.$f7.hideIndicator();
                if(response.success){
                    this.img_code = response.results;
                }
            });
        }
    }
</script>