<template>
    <f7-page class="b-part-page order-performance" >
        <f7-navbar title="业务员详情" back-link="Back" sliding></f7-navbar>

        <f7-col v-if="showLoading" width="100" tablet-width="100" class="margin-top-1 align-center margin-top-2">
            <f7-preloader class="spinner-color-3"></f7-preloader>
        </f7-col>

        <template v-if="!showLoading">
            <f7-block class="hor-flex-left bg-color-1 padding-col-1 no-margin-top margin-bot-1">
                <div class="salesman-avator-img icon_setting margin-right-1" :class="{ 'male-avator': agent.sex != '2', 'female-avator': agent.sex == '2' }">
                    <template v-if="agent.picture">
                        <img class="img-4-4" :src="avatorPrefix+agent.picture" alt="">
                    </template>
                </div>
                <div class="col-flex-center-around height-4-4">
                    <div class="font-16 font-color-1">{{agent.name}}</div>
                    <div class="font-color-2 font-14">{{agent.company.name}}</div>
                </div>
                <div v-if="this.user_info.level > 2" class="be-store-owner font-color-2">
                    <div v-if="agent.level == 1" class="col-flex-center just-around" @click="change_manager_confirm">
                        <div class="be-manager-img icon_setting"></div>
                        <div class="margin-top-1-2 font-14">成为店长</div>
                    </div>
                    <div v-if="agent.level == 2" class="col-flex-center just-around margin-right-1">
                        <div class="manager-img icon_setting"></div>
                        <div class="margin-top-1-2 font-14 font-color-orange">店长</div>
                    </div>
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
                        <f7-link class="img-5-4 detail_calendar detail_calendar_zone padding-left-3" open-popover="#store-detail-popover"></f7-link>
                    </div>
                </f7-block-title>

                <f7-block class="bg-white font-16 padding-0 top-line-d8">
                     <f7-link  @click="myClick">
                        <div class="padding-2 col-flex-center">
                            <div class="font-14 font-color-999">本月完成金额(万)</div>
                            <div class="font-24 font-color-3 margin-top-1-2">
                                {{formatMoney(achievementMoney).intPart || '0'}}<span class="font-20">{{formatMoney(achievementMoney).decPart || '.00'}}</span>
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
                            <order-num-chart :height="130" v-if="store_data" :statistic="store_data"></order-num-chart>
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

                <f7-popover id="store-detail-popover">
                    <f7-list>
                        <template>
                            <f7-list-item v-for="(item, index) in store_data.achievementMonth" :title="item" @click="changeMonth(index)"></f7-list-item>
                        </template>
                    </f7-list>
                </f7-popover>
            </div>



            <!--fixed-bot-zone  with-fixed-bot-->
            <div class="hor-flex-center bg-color-1 bar-bot-zone">
                <div class="flex-1 hor-flex-center font-color-2" :class="{disabled:(this.user_info.ref == agent.ref) || (this.user_info.level < 2)}" @click="delete_agent_confirm">
                    <div class="padding-left-3-2 snow-icon-img-n form_bg">冻结</div>
                </div>
                <div class="flex-3 bg-color-4 hor-flex-center font-color-5">
                    <div class="agent-phone padding-left-3-2 white-phone-icon-img form_bg" :tele="agent.phone" >{{agent.phone}}</div>
                </div>
            </div>


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
                agent:{
                    company:{
                        name:''
                    }
                },
                statisticsByMonth:'',
                statisticsFiveMonth:'',
                store_ref:this.$route.params.storeId,
                agent_ref:this.$route.params.agentId,
                showLoading:true,
                current_month:4,
                is_num:true,
                has_data:true,
            }
        },
        methods:{
            ...mapActions([
                'changeManager',
                'deleteAgent'
            ]),
            myClick(){
                this.$router.load({url: '/account/myOrders/'});
            },
            change_manager_confirm(){
                var $vue = this;
                $vue.$f7.modal({
                    title: '确认升为店长?',
                    text: '确认后原店长将被冻结',
                    buttons: [{
                        text: '取消',
                        onClick: function () {
                            return;
                        }
                    },{
                        text: '确认',
                        onClick: function () {
                            $vue.change_manager();
                        }
                    }]
                });
            },
            change_manager(){
                this.$f7.showIndicator();
                var $vue = this;
                this.changeManager({'store_ref':this.store_ref,'agent_ref':this.agent_ref}).then((response) => {
                    this.$f7.hideIndicator();
                    if(response.success){
                        this.$router.refreshPage();
                        console.log('change manager success');
                    }
                }).catch(response => {
                    $vue.$f7.hideIndicator();
                    $vue.errCallbacks.netErr($vue);
                });
            },
            delete_agent_confirm(){
                var $vue = this;
                $vue.$f7.modal({
                    title: '确认冻结?',
                    text: '冻结后不可恢复',
                    buttons: [{
                        text: '取消',
                        onClick: function () {
                            return;
                        }
                    },{
                        text: '确认',
                        onClick: function () {
                            $vue.delete_agent();
                        }
                    }]
                });
            },
            delete_agent(){
                this.$f7.showIndicator();
                var $vue = this;
                this.deleteAgent({'store_ref':this.store_ref,'agent_ref':this.agent_ref}).then((response) => {
                    this.$f7.hideIndicator();
                    if(response.success){
                        this.$router.load({url: '/account/mySalesmans/'});
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
                user_info : 'user_info',
                agent_detail : 'agent_detail'
            }),
            store_data:function () {
                return this.agent_detail.statisticsFiveMonth;
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
            agent_detail(val){
                var data = val;
                this.agent = data.agent;
                this.statisticsByMonth = data.statisticsByMonth;
                this.statisticsFiveMonth = data.statisticsFiveMonth;
                this.showLoading = false;
                console.log(this.agent);
            }
        },
        mounted(){
            var $vue = this;
            this.$store.dispatch('getAgentDetail',{'agent_ref':this.$route.params.agentId}).then(res => {
                if(res.success){
                    this.is_loading = false;
                    if(res.results.statisticsFiveMonth){
                        $vue.has_data=true;
                    }
                    else {
                        $vue.has_data=false;
                    }
                }
            }).catch(response => {
                $vue.$f7.hideIndicator();
                $vue.errCallbacks.netErr($vue);
            });
            this.f7_mobile_widgets.f7_mobile_tele(this,'.agent-phone');
            console.log('storeId:',this.$route.params.storeId);
            console.log('agentId:',this.$route.params.agentId);
        }
    }
</script>

<style>
    .be-store-owner{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-end;
    }
    
    .be-manager-img{
        width: 1.5rem;
        height: 1.5rem;
        background-image: url("../../img/profile/become_manager.svg");
    }

    .manager-img{
        width: 1.5rem;
        height: 1.5rem;
        background-image: url("../../img/profile/manager.svg");
    }

    .detail_calendar{
        background-image: url("../../img/profile/calendar.svg");
    }

    .toogle_money{
        background-image: url("../../img/profile/switch.svg");
    }

    .fixed-bot-zone{
        min-height: 56px;
        position: fixed;
        bottom: 0;
        width: 100%;
        display: flex;
    }

    .white-phone-icon-img{
        background-image: url("../../img/profile/telephone_white.svg");
    }

    .snow-icon-img-n{
        background-image: url("../../img/profile/Frozen_n.svg");
    }

    .detail_calendar_zone{
        position: relative;
        height: calc(1.25rem + 16px);
        width: calc(1.25rem + 16px);
        background-size: 1.25rem;
        background-position: right center;
        background-repeat: no-repeat;
    }

    .bar-bot-zone{
        min-height: 56px;
    }

    .bar-bot-zone>div{
        height: 56px;
    }
</style>