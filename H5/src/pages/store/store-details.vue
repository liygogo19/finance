<template>
    <f7-page class="b-part-page order-performance" >
        <!-- Material Theme Navbar -->
        <f7-navbar title="我的门店" back-link="Back" sliding></f7-navbar>

        <f7-col v-if="showLoading" width="100" tablet-width="100" class="margin-top-1 align-center margin-top-2">
            <f7-preloader class="spinner-color-3"></f7-preloader>
        </f7-col>

        <template v-if="!showLoading">
            <f7-block class="bg-white font-16 margin-clear padding-top-1 padding-bot-1">
                <div class="icon-show icon-store icon-size-20 font-18 hor-flex-center-between">
                    {{detail.name}}
                    <f7-link :href=ref class="width-card-button padding-side-1-2 border-radius-5 font-color-3 font-size-14">
                        编辑
                    </f7-link>
                </div>
                <div class="margin-top-1-2">
                    <span class="font-color-4">地址：</span>
                    <div class="icon-show-right icon-size-14 icon-location">{{detail.address || '暂无'}}</div>
                </div>
                <div class="margin-top-1-2">
                    <span class="font-color-4">电话：</span>
                    <div class="icon-show-right">{{detail.phone || '暂无'}}</div>
                </div>
            </f7-block>

            <div v-if="!has_data" class="icon_setting store_achievement_no_data">
                <img src="../../img/achievement/bj@3x.png">
                <div class="no_data_img icon_setting"></div>
            </div>

            <div v-if="has_data">
                <f7-block-title class="bg-color-1 top-line font-color-4 padding-col-2-3 margin-top-1">
                    <div class="padding-left-1 width-card-badge hor-flex-center-between">
                        <div class="font-16">{{store_data.achievementMonth[current_month]}}</div>
                        <f7-link class="img-5-4 detail_calendar detail_calendar_zone" open-popover="#store-detail-popover"></f7-link>
                    </div>
                </f7-block-title>
                <f7-block class="bg-white font-16 padding-0 top-line-d8">
                    <f7-link  @click="myClick">
                        <div class="padding-2 col-flex-center">
                            <div class="font-14 font-color-999">本月完成金额(万)</div>
                            <div class="font-24 font-color-3 margin-top-1-2">
                                {{formatMoney(achievementMoney).intPart}}<span class="font-20">{{formatMoney(achievementMoney).decPart}}</span>
                            </div>
                        </div>
                        <div class="number display-flex padding-top-1">
                            <div class="font-14 color-gray padding-left-1">
                                已完成订单(个)<p class="font-18 font-color-3 margin-top-1-2">{{finishedOrder || '0'}}</p>
                            </div>
                            <div class="font-14 color-gray padding-left-2">
                                进行中订单(个)<p class="font-18 font-color-3 margin-top-1-2">{{runningOrder || '0'}}</p>
                            </div>
                        </div>
                    </f7-link>
                </f7-block>

                <f7-block-title class="bg-color-1 top-line font-color-4 padding-col-2-3">
                    <div class="padding-left-1 width-card-badge hor-flex-center-between">
                        <div class="font-16">累计业绩</div>
                        <div class="flex-stretch toogle_money padding-left-2 form_bg bg-icon-size-6-5" @click="is_num=!is_num">{{is_num?'切换到金额':'切换到订单'}}</div>
                    </div>
                </f7-block-title>
                <f7-block class="bg-white font-16 padding-0 top-line-d8">
                    <div class="padding-side-1 padding-bot-1 col-flex-center height-130">
                        <template v-if="is_num">
                            <order-num-chart :id="store_detail.store.ref+'_chart'" :height="130" v-if="store_data" :statistic="store_data"></order-num-chart>
                        </template>
                        <template v-if="!is_num">
                            <order-money-chart :height="130" v-if="store_data" :statistic="store_data"></order-money-chart>
                        </template>
                    </div>
                    <div class="number display-flex padding-top-1">
                        <div class="font-14 color-gray padding-left-1">
                            累计完成订单(个)<p class="font-18 font-color-3 margin-top-1-2">{{store_data.total? store_data.total.finishCount : '0'}}</p>
                        </div>
                        <div class="font-14 color-gray padding-left-2">
                            累计完成金额(元)<p class="font-18 font-color-3 margin-top-1-2">{{store_data.total? store_data.total.money : '0'}}</p>
                        </div>
                    </div>
                </f7-block>
            </div>


            <f7-block-title class="margin-top-1 padding-col-2-3 font-16 font-color-666 bg-color-1 top-line title_bg">
                <div class="border-left-4 height-fixed-20 padding-left-1-2 display-flex">
                    门店员工<span class="flex-align-right font-color-999">{{agents.length}}人</span>
                </div>
            </f7-block-title>
            <f7-list>
                <template v-for="agent in agents">
                    <f7-list-item>
                        <f7-link class="avator_bg avator-link" :href="'/salesman/detail/'+urlId+'/'+agent.agent.ref">
                            <div class="salesman-avator-img icon_setting" :class="{ 'male-avator': agent.sex != '2', 'female-avator': agent.sex == '2' }">
                                <template v-if="agent.agent.picture">
                                    <img class="img-4-4" :src="avatorPrefix+agent.agent.picture" alt="">
                                </template>
                            </div>
                            <div class="avator-login avator-info color-black">
                                <span class="hor-flex-left">
                                    {{agent.agent.name}}
                                    <div v-if="agent.agent.level == 2" class="margin-left-1 font-14 font-color-6 title-style">
                                        <span class="icon_setting  title-icon"></span>
                                        <span>店长</span>
                                    </div>
                                </span>
                                <span class="icon-show icon-telphone icon-size-16 font-14 font-color-999">{{agent.agent.phone}}</span>
                            </div>
                        </f7-link>
                    </f7-list-item>
                </template>
            </f7-list>

            <template v-if="this.user_info.level > '2'">
                <f7-block>
                    <f7-button big class="button bg-color-red button-big margin-top-2" @click="delete_confirm">删除门店</f7-button>
                </f7-block>
            </template>

            <f7-popover v-if="has_data" id="store-detail-popover">
                <f7-list>
                    <template>
                        <f7-list-item v-for="(item, index) in store_data.achievementMonth" :title="item" @click="changeMonth(index)"></f7-list-item>
                    </template>
                </f7-list>
            </f7-popover>
        </template>
    </f7-page>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import OrderNumChart from '../account/chartComponents/orderNumChart'
    import OrderMoneyChart from '../account/chartComponents/orderMoneyChart'
    import validatorTools from 'utility/customizedValidation'
    import widgets_tools from 'utility/widgets_tools'
    import api_params from 'utility/api_params'

    export default {
        data(){
            return {
                detail:{
                    name : '',
                    address : '',
                    phone : ''
                },
                agents:'',
                statistics:'',
                urlId:this.$route.params.postId,
                ref:'/store/edit-store/'+this.$route.params.postId,
                showLoading:true,
                current_month:4,
                is_num:true,
                has_data:true,
            }
        },
        methods:{
            ...mapActions([
                'deleteStore'
            ]),
            delete_confirm(){
                var $vue = this;
                $vue.$f7.modal({
                    title: '确认删除门店?',
                    text: '删除后不可恢复',
                    buttons: [{
                        text: '取消',
                        onClick: function () {
                            return;
                        }
                    },{
                        text: '确认',
                        onClick: function () {
                            $vue.delete_detail_store();
                        }
                    }]
                });
            },
            myClick(){
                //console.log('aaa',this.$route.params.postId)
                this.$router.load({url: '/account/employeeOrders/'+this.$route.params.postId})
            },
            delete_detail_store(){
                this.$f7.showIndicator();
                var $vue = this;
                this.deleteStore({'store_ref':this.urlId}).then((response) => {
                    console.log('return delete store response',response);
                    this.$f7.hideIndicator();
                    if(response.success){
                        this.$router.load({url: '/store/my-store-shopowner/'});
                    }
                }).catch(response => {
                    $vue.$f7.hideIndicator();
                    $vue.errCallbacks.netErr($vue);
                });
            },
            changeMonth(index){
                this.$f7.closeModal('#store-detail-popover', true);
                this.current_month = index;
            }
        },
        computed: {
            ...mapGetters({
                user_info:'user_info',
                store_detail:'store_detail'
            }),
            store_data:function () {
                return this.store_detail.statisticsFiveMonth;
            },
            achievementMoney:function () {
                return this.store_data.money[this.current_month];
            },
            runningOrder:function () {
                return this.store_data.runningCount[this.current_month];
            },
            finishedOrder:function () {
                return this.store_data.finishCount[this.current_month];
            },
            avatorPrefix:function () {
                var prefix = api_params.base_url;
                return prefix+'../';
            }
        },
        components:{
            OrderNumChart:OrderNumChart,
            OrderMoneyChart:OrderMoneyChart
        },
        watch:{
            store_detail: function(val,oldVal) {
                console.log(111111);
                var data = val;
                console.log('datsadiuasdhashd',data);
                this.detail.name = data.store.name;
                this.detail.address = data.store.address;
                this.detail.phone = data.store.phone;
                this.agents = data.agents;
                this.statistics = data.statisticsFiveMonth;
            }
        },
        created(){
            this.$store.state.order.store_detail = null;
            var $vue = this;
            this.$store.dispatch('storeDetail',{'store_ref':this.$route.params.postId}).then(res=>{
                if(res.results.statisticsFiveMonth){
                    $vue.has_data=true;
                }
                else {
                    $vue.has_data=false;
                }
                this.showLoading = false;
            }).catch(response => {
                $vue.$f7.hideIndicator();
                $vue.errCallbacks.netErr($vue);
            });
        }
    }
</script>

<style>
    .store_achievement_no_data{
        padding-top: 0.5rem;
        position: relative;
    }

    .store_achievement_no_data>img{
        width: 100%;
    }

    .store_achievement_no_data .no_data_img{
        transform:translate( -6.5rem , -6.5rem );
        width: 13rem;
        height: 13rem;
        background-image: url("../../img/achievement/no_data.svg");
        position: absolute;
        top: 50%;
        left: 50%;
    }
</style>