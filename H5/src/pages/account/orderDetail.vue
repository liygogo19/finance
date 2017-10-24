<template>
    <f7-page class="b-part-page order-detail-page" >
        <f7-navbar :title="user_info.ref==order_detail.agent_ref?'我的订单':'业务员订单'" back-link="Back" sliding></f7-navbar>
        <f7-col v-if="is_loading" width="100" tablet-width="100" class="align-center margin-bot-50-scale">
            <f7-preloader class="spinner-color-3"></f7-preloader>
        </f7-col>
        <div v-else>
            <f7-block-title class="font-color-5 font-16 order-with-bottom icon_setting hor-flex-center-between">
                <div>订单编号：<span>{{order_detail.ref}}</span></div>
                <div>{{state_name[order_detail.status]}}</div>
            </f7-block-title>
            <f7-block class="bg-color-1 padding-col-1 hor-flex-center-between ">
                <div class="col-flex-left">
                    <div class="margin-bot-1-2">赎楼服务</div>
                    <div class="font-14 font-color-4 margin-bot-1-2">提交时间：{{order_detail.add_time}}</div>
                    <div class="font-14 font-color-4">所属门店：{{store_name[order_detail.store_ref]}}</div>
                </div>
                <div class="align-start font-color-3">¥ {{formatMoney(order_detail.loan_money).intPart}}{{formatMoney(order_detail.loan_money).decPart}}万</div>
            </f7-block>

            <f7-block-title class="bg-color-1 font-color-4 padding-col-2-3">
                <div class="padding-left-1 width-card-badge hor-flex-center-between">
                    <div class="font-16">订单进程</div>
                </div>
            </f7-block-title>
            <f7-list class="bg-color-1">
                <f7-block class="no-margin-top top-line" inner>
                    <!-- <OrderProgress :status="order_detail.status" :addTime="order_detail.add_time" :lastModfied="order_detail.update_time" :passTime="order_detail.pass_time"></OrderProgress> -->
                    <OrderProgress 
                     :list="order_detail.statusList" 
                     :addTime="order_detail.add_time"
                     :nowState="state_name"
                     >
                    </OrderProgress>
                    <div v-if="order_detail.status == 0 || order_detail.status == 1" class="margin-top-1 tool-tip-zone hor-flex-center-between" v-show="showTooltip">
                        <div class="padding-left-2 form_bg tip-bulb-img font-14 font-color-8 bg-pos-lef-1-2 hor-flex-left">完善订单资料可加快审核进程。</div>
                        <div class="tool-tip-delete icon_setting delete-icon-size" @click="hideTooltip" ></div>
                    </div>
                </f7-block>
            </f7-list>

            <f7-block-title class="bg-color-1 font-color-4 padding-col-2-3">
                <div class="padding-left-1 width-card-badge hor-flex-center-between">
                    <div class="font-16">卖家信息</div>
                    <div v-if="user_info.ref==order_detail.agent_ref"  >
                        <f7-link v-if="order_detail.status==0 || order_detail.status==2" href="/info/property-information/" class="width-card-button padding-side-1-2 border-radius-5 font-color-3">
                            编辑
                        </f7-link>
                        <span v-else class="width-card-button padding-side-1-2 border-radius-5 font-color-bbb border-color-bbb">
                            编辑
                        </span>
                    </div>
                </div>
            </f7-block-title>
            <f7-accordion class="bg-color-1 top-line">
                <f7-accordion-item>
                    <f7-accordion-content class="accordion-col-height-3-2 padding-side-1">
                        <f7-grid class="div-with-margin-col-1-4 font-color-1  padding-col-1-2">
                            <f7-col width="30" class="font-color-2">卖家姓名</f7-col>
                            <f7-col width="70">{{order_detail.seller.name||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">性别</f7-col>
                            <f7-col width="70">{{seller_sex_option[order_detail.seller.sex]||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">身份证号</f7-col>
                            <f7-col width="70">{{order_detail.seller.id_number||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">户籍</f7-col>
                            <f7-col width="70">{{order_detail.seller.household_register||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">婚姻状况</f7-col>
                            <f7-col width="70">{{seller_marry_option[order_detail.seller.marital_status]||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">现居住地址</f7-col>
                            <f7-col width="70">{{order_detail.seller.address||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">联系电话</f7-col>
                            <f7-col width="70">{{order_detail.seller.phone||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">借款金额</f7-col>
                            <f7-col width="70">{{order_detail.loan_money?Number(order_detail.loan_money/10000).toFixed(0)+'万':'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">还款时间</f7-col>
                            <f7-col width="70">{{order_detail.loan_repayment_period||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">还款银行</f7-col>
                            <f7-col width="70">{{order_detail.loan_repayment_bank||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">个人征信</f7-col>
                            <f7-col width="70">{{seller_credit_option[order_detail.seller.credit_reporting]||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">工作单位</f7-col>
                            <f7-col width="70">{{order_detail.seller.company_title||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">单位地址</f7-col>
                            <f7-col width="70">{{order_detail.seller.company_address||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">工作收入</f7-col>
                            <f7-col width="70">{{order_detail.seller.work_income?(order_detail.seller.work_income/10000).toFixed(0)+'万':'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">配偶姓名</f7-col>
                            <f7-col width="70">{{order_detail.sellerSpouse.name||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">身份证号</f7-col>
                            <f7-col width="70">{{order_detail.sellerSpouse.id_number||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">联系电话</f7-col>
                            <f7-col width="70">{{order_detail.sellerSpouse.phone||'-'}}</f7-col>
                        </f7-grid>
                    </f7-accordion-content>
                    <f7-accordion-toggle class="margin-bot-1 bg-color-2">
                        <div class="accordion-toogle-btn icon_setting bg-size-60"></div>
                    </f7-accordion-toggle>
                </f7-accordion-item>
            </f7-accordion>

            <f7-block-title class="bg-color-1 font-color-4 padding-col-2-3">
                <div class="padding-left-1 width-card-badge hor-flex-center-between">
                    <div class="font-16">房产信息</div>
                    <div v-if="user_info.ref==order_detail.agent_ref"  >
                        <f7-link v-if="order_detail.status==0 || order_detail.status==2" href="/info/property-information/" class="width-card-button padding-side-1-2 border-radius-5 font-color-3">
                            编辑
                        </f7-link>
                        <span v-else class="width-card-button padding-side-1-2 border-radius-5 font-color-bbb border-color-bbb">
                            编辑
                        </span>
                    </div>
                </div>
            </f7-block-title>
            <f7-accordion class="bg-color-1  top-line">
                <f7-accordion-item>
                    <f7-accordion-content class="accordion-col-height-3-2 padding-side-1">
                        <f7-grid class="div-with-margin-col-1-4 font-color-1 padding-col-1-2">
                            <f7-col width="30" class="font-color-2">房产类型</f7-col>
                            <f7-col width="70">{{asset_type[order_detail.asset_type]||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">房产名称</f7-col>
                            <f7-col width="70">{{order_detail.asset_title||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">房产地址</f7-col>
                            <f7-col width="70">{{order_detail.asset_address||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">建筑面积</f7-col>
                            <f7-col width="70">{{order_detail.asset_square||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">房龄</f7-col>
                            <f7-col width="70">{{order_detail.asset_age||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">房产状态</f7-col>
                            <f7-col width="70">{{asset_status[order_detail.asset_status]||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">房产价格</f7-col>
                            <f7-col width="70">{{order_detail.asset_deal_price?(order_detail.asset_deal_price/10000).toFixed(0)+'万':'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">已付房款</f7-col>
                            <f7-col width="70">{{order_detail.asset_payed?(order_detail.asset_payed/10000).toFixed(0)+'万':'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">共有房产人</f7-col>
                            <f7-col width="70">{{seller_credit_option[order_detail.other_owner]||'-'}}</f7-col>
                        </f7-grid>
                    </f7-accordion-content>
                    <f7-accordion-toggle class="margin-bot-1 bg-color-2">
                        <div class="accordion-toogle-btn icon_setting bg-size-60"></div>
                    </f7-accordion-toggle>
                </f7-accordion-item>
            </f7-accordion>

            <f7-block-title class="bg-color-1 font-color-4 padding-col-2-3">
                <div class="padding-left-1 width-card-badge hor-flex-center-between">
                    <div class="font-16">买家信息</div>
                    <div v-if="user_info.ref==order_detail.agent_ref"  >
                        <f7-link v-if="order_detail.status==0 || order_detail.status==2" href="/info/property-information/" class="width-card-button padding-side-1-2 border-radius-5 font-color-3">
                            编辑
                        </f7-link>
                        <span v-else class="width-card-button padding-side-1-2 border-radius-5 font-color-bbb border-color-bbb">
                            编辑
                        </span>
                    </div>
                </div>
            </f7-block-title>
            <f7-accordion class="bg-color-1  top-line">
                <f7-accordion-item>
                    <f7-accordion-content class="accordion-col-height-3-2 padding-side-1">
                        <f7-grid class="div-with-margin-col-1-4 font-color-1 padding-col-1-2">
                            <f7-col width="30" class="font-color-2">买家姓名</f7-col>
                            <f7-col width="70">{{order_detail.buyer.name||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">性别</f7-col>
                            <f7-col width="70">{{seller_sex_option[order_detail.buyer.sex]||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">身份证号</f7-col>
                            <f7-col width="70">{{order_detail.buyer.id_number||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">户籍</f7-col>
                            <f7-col width="70">{{order_detail.buyer.household_register||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">婚姻状况</f7-col>
                            <f7-col width="70">{{seller_marry_option[order_detail.buyer.marital_status]||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">现居住地址</f7-col>
                            <f7-col width="70">{{order_detail.buyer.address||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">联系电话</f7-col>
                            <f7-col width="70">{{order_detail.buyer.phone||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">房产按揭</f7-col>
                            <f7-col width="70">{{seller_credit_option[order_detail.buyer.loan_is]||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">贷款方式</f7-col>
                            <f7-col width="70">{{loan_type[order_detail.buyer.loan_type]||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">服务提供</f7-col>
                            <f7-col width="70">{{seller_credit_option[order_detail.buyer.loan_service_is]||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">个人征信</f7-col>
                            <f7-col width="70">{{seller_credit_option[order_detail.buyer.credit_reporting]||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">工作单位</f7-col>
                            <f7-col width="70">{{order_detail.buyer.company_title||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">单位地址</f7-col>
                            <f7-col width="70">{{order_detail.buyer.company_address||'-'}}</f7-col>
                            <f7-col width="30" class="font-color-2">工作收入</f7-col>
                            <f7-col width="70">{{order_detail.buyer.work_income?(order_detail.buyer.work_income/10000).toFixed(0)+'万':'-'}}</f7-col>
                        </f7-grid>
                    </f7-accordion-content>
                    <f7-accordion-toggle class="margin-bot-1 bg-color-2">
                        <div class="accordion-toogle-btn icon_setting bg-size-60"></div>
                    </f7-accordion-toggle>
                </f7-accordion-item>
            </f7-accordion>

            <f7-block-title v-if="user_info.ref!=order_detail.agent_ref" class="bg-color-1 font-color-4 padding-col-2-3">
                <div class="padding-left-1 width-card-badge hor-flex-center-between">
                    <div class="font-16">业务员</div>
                </div>
            </f7-block-title>
            <f7-list v-if="user_info.ref!=order_detail.agent_ref" class="bg-color-1">
                <f7-link :href="'/salesman/detail/'+order_detail.store_ref+'/'+order_detail.agent_ref">
                    <f7-block class="no-margin-top top-line div-hor-flex-left" inner>
                        <div class="salesman-avator-img icon_setting male-avator margin-right-1"></div>
                        <div class="col-flex-center-between just-around">
                            <div class="font-16 font-color-1">小林</div>
                            <div class="font-color-2 font-14">优米房产－鄞州二店</div>
                        </div>
                    </f7-block>
                </f7-link>
            </f7-list>

            <f7-block-title class="bg-color-1 font-color-4 padding-col-2-3">
                <div class="padding-left-1 width-card-badge hor-flex-center-between">
                    <div class="font-16">客服人员</div>
                </div>
            </f7-block-title>
            <f7-list class="bg-color-1">
                <f7-block class="no-margin-top top-line" inner>
                    <f7-grid class="div-with-margin-col-1-4 font-color-2">
                        <f7-col width="30" >产品客服</f7-col>
                        <f7-col width="70" class="font-color-1">许旺（0574-93829839）</f7-col>
                        <f7-col width="30">运营专员</f7-col>
                        <f7-col width="70" class="font-color-1">还未匹配</f7-col>
                    </f7-grid>
                </f7-block>
            </f7-list>
        </div>

    </f7-page>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import widgets_tools from 'utility/widgets_tools'
    import OrderProgress from './orderProgress.vue'

    export default{
        data(){
            return{
                showTooltip: true,
                order_num:this.$route.params.orderId,
                is_loading:true,
                seller_sex_option:{},
                seller_marry_option:{},
                seller_credit_option:{},
                asset_status:{},
                asset_type:{},
            }
        },
        methods:{
            hideTooltip:function () {
                this.showTooltip=false;
            }
        },
        components:{
            OrderProgress:OrderProgress,
        },
        computed: {
            ...mapGetters({
                config_options:'config_options',
                order_detail:'order_detail',
                user_info:'user_info',

            }),
            state_name:function () {
                var status = this.config_options? this.config_options.order.orderStatus : [];
                return widgets_tools.generateStatusOptions(status);
            },
            store_name:function () {
                var stores = this.user_info? this.user_info.store : [];
                return widgets_tools.generateStoreNames(stores);
            },
        },
        created(){
            var $vue = this;
            this.$store.dispatch('getOrderDetail',{
                order_ref:this.order_num,
            }).then(()=>{
                setTimeout(function(){
                    $vue.is_loading=false;
                },700);
            });

            this.seller_sex_option = widgets_tools.generateStatusOptions(this.config_options.people.sex);
            this.seller_marry_option = widgets_tools.generateStatusOptions(this.config_options.people.maritalStatus);
            this.seller_credit_option = widgets_tools.generateStatusOptions(this.config_options.boolean.yes);
            this.asset_status = widgets_tools.generateStatusOptions(this.config_options.asset.assetStatus);
            this.asset_type = widgets_tools.generateStatusOptions(this.config_options.asset.assetType);
            this.loan_type = widgets_tools.generateStatusOptions(this.config_options.loan.loanType);
        }
    }
</script>

<style>
    .div-hor-flex-left .content-block-inner{
        display: flex;
    }

    .order-with-bottom{
        height: 2rem;
        background-image: url("../../img/bg/bj.png");
        background-repeat: repeat-x!important;
    }

    .width-card-badge{
        position: relative;
        height: 1.30rem;
    }

    .width-card-badge:before{
        content: '';
        display: block;
        height: 1.30rem;
        position: absolute;
        left: 0;
        top: 0;
        background-color: #00a299;
        width: 3px;
    }

    .width-card-button{
        height: 1.4rem;
        border: 1px solid #00a299;
        line-height: 1.4rem;
    }

    .div-with-margin-col-1-4>div{
        margin-top: 0.30rem;
        margin-bottom: 0.30rem;
    }

    .tool-tip-zone{
        height: 2rem;
        border: 1px solid #fce7c3;
        background-color: #fffaf0;
    }

    .tool-tip-zone>div{
        height: 1rem;
    }

    .delete-icon-size{
        width: 2rem;
        height: 2rem;
        background-size: 40%;
    }

    .accordion-toogle-btn{
        height: 1rem;
        width: 2.70rem;
        background-color: #ffffff;
        -webkit-border-bottom-left-radius: 3px;
        -webkit-border-bottom-right-radius: 3px;
        -moz-border-radius-bottomleft: 3px;
        -moz-border-radius-bottomright: 3px;
        margin: 0 auto;
        position: relative;
        background-image: url("../../img/profile/open.svg");
    }

    .accordion-item-expanded .accordion-toogle-btn{
        background-image: url("../../img/profile/close.svg");
    }

    .order-detail-page .content-block-inner:before{
        content: '';
        display: none;
    }

</style>