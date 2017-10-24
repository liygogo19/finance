<template>
    <f7-page class="b-part-page order-performance">
        <!-- Material Theme Navbar -->
        <f7-navbar>
            <f7-link href="/account/profile/" class="icon-only link icon-only">
                <i class="icon icon-back"></i>
            </f7-link>
            <f7-nav-center>我的业绩</f7-nav-center>
        </f7-navbar>
        <f7-col v-if="is_loading" width="100" tablet-width="100" class="align-center margin-bot-50-scale">
            <f7-preloader class="spinner-color-3"></f7-preloader>
        </f7-col>
        <div v-if="!is_loading&&has_data">
            <f7-block-title class="bg-color-1 top-line font-color-4 padding-col-2-3 margin-top-1">
                <div class="padding-left-1 width-card-badge hor-flex-center-between">
                    <div class="font-16">{{personal_data.achievementMonth[current_month]}}</div>
                    <f7-link class="img-5-4 detail_calendar detail_calendar_zone padding-left-3" open-popover="#date-picker-popover9"></f7-link>
                </div>
            </f7-block-title>
            <f7-block class="bg-white font-16 padding-0 top-line-d8">
                <div class="padding-2 col-flex-center ">
                    <div class="font-14 font-color-999">本月完成金额(万)</div>
                    <div class="font-24 font-color-3 margin-top-1-2">
                        {{formatMoney(achievementMoney).intPart}}<span class="font-20">{{formatMoney(achievementMoney).decPart}}</span>
                    </div>
                </div>
                <div class="number display-flex padding-top-1">
                    <div class="font-14 color-gray padding-left-1">
                        已完成订单(个)
                        <p class="font-18 font-color-3 margin-top-1-2">
                            {{runningOrder}}
                        </p>
                    </div>
                    <div class="font-14 color-gray padding-left-2">
                        进行中订单(个)
                        <p class="font-18 font-color-3 margin-top-1-2">
                            {{finishedOrder}}
                        </p>
                    </div>
                </div>
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
                        <order-num-chart key="com_num" :height="130" v-if="personal_data" :statistic="personal_data"></order-num-chart>
                    </template>
                    <template v-if="!is_num">
                        <order-money-chart key="com_money" :height="130" v-if="personal_data" :statistic="personal_data"></order-money-chart>
                    </template>
                </div>
                <div class="number display-flex padding-top-1">
                    <div class="font-14 color-gray padding-left-1">
                        累计完成订单(个)<p class="font-18 font-color-3 margin-top-1-2">{{personal_data.total? personal_data.total.finishCount : ''}}</p>
                    </div>
                    <div class="font-14 color-gray padding-left-2">
                        累计完成金额(元)<p class="font-18 font-color-3 margin-top-1-2">{{personal_data.total? personal_data.total.money : ''}}</p>
                    </div>
                </div>
            </f7-block>

            <f7-popover id="date-picker-popover9">
                <f7-list>
                    <template>
                        <f7-list-item v-for="(item, index) in personal_data.achievementMonth" :title="item" @click="changeMonth(index)"></f7-list-item>
                    </template>
                </f7-list>
            </f7-popover>
        </div>
        <div v-if="!is_loading&&!has_data" class="icon_setting achievement_no_data">
            <div class="no_data_img icon_setting">

            </div>
        </div>
    </f7-page>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import OrderNumChart from '../account/chartComponents/orderNumChart'
    import OrderMoneyChart from '../account/chartComponents/orderMoneyChart'
    import validatorTools from 'utility/customizedValidation'
    import widgets_tools from 'utility/widgets_tools'

    export default {
        data(){
            return {
                is_company:true,
                is_num:true,
                is_loading:true,
                current_month:4,
                personal:this.$store.state.login.user_info.ref,
                err:null,
                has_data:true,
            }
        },
        computed: {
            ...mapGetters({
                person_achievement:'person_achievement',
                person_monthly_achievement:'person_monthly_achievement'
            }),
            personal_data:function () {
                return this.person_achievement.statisticsFiveMonth;
            },
            achievementMoney:function () {
                return this.personal_data.money[this.current_month];
            },
            runningOrder:function () {
                return this.personal_data.runningCount[this.current_month];
            },
            finishedOrder:function () {
                return this.personal_data.finishCount[this.current_month];
            }
        },
        components:{
            OrderNumChart:OrderNumChart,
            OrderMoneyChart:OrderMoneyChart
        },
        methods:{
            ...mapActions([
                'getPersonAchievement'
            ]),
            getPersonalPerformance(){
                this.is_company=false;
            },
            changeMonth(index){
                this.$f7.closeModal('#date-picker-popover9', true);
                this.current_month = index;
            },
        },
        created(){
            var $vue = this;
            this.getPersonAchievement({'agent_ref':this.personal}).then(res => {
                if(res.success){
                    
                    setTimeout(function(){
                        $vue.is_loading=false;
                    },700);

                    if(res.results.statisticsFiveMonth){
                        $vue.has_data=true;
                    }
                    else {
                        $vue.has_data=false;
                    }
                }
            }).catch(e => {
                $vue.errCallbacks.netErr($vue);
            });
        }
    }
</script>

<style>
    .achievement_no_data{
        width: 100%;
        height: 100%;
        background-image: url("../../img/achievement/bj@3x.png");
        background-position:center 0.5rem!important;
        display: flex;
        justify-content: center;
    }

    .achievement_no_data .no_data_img{
        width: 13rem;
        height: 13rem;
        background-image: url("../../img/achievement/no_data.svg");
        margin-top: 6rem;
    }
</style>
