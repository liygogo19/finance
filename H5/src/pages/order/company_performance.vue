<template>
    <f7-page class="b-part-page order-performance">
        <!-- Material Theme Navbar -->
        <f7-navbar>
            <f7-link href="/account/profile/" class="icon-only link icon-only">
                <i class="icon icon-back"></i>
            </f7-link>
            <f7-nav-center>业绩</f7-nav-center>
        </f7-navbar>
        <f7-col v-if="is_personal_loading || is_company_loading" width="100" tablet-width="100" class="align-center margin-bot-50-scale">
            <f7-preloader class="spinner-color-3"></f7-preloader>
        </f7-col>
        <div v-else>
            <f7-block class="navbar-size bg-white font-16 hor-flex-center margin-clear">
                <f7-list class="performance-toggle border-size-1 border-color-green border-radius-20">
                    <f7-link href="#" class="width-50 height-100 hor-flex-center" :class="{active:is_company}" @click="getCompanyPerformance">{{user_info.level>3?'公司业绩':'门店业绩'}}</f7-link>
                    <f7-link href="#" class="width-50 height-100 hor-flex-center" :class="{active:!is_company}" @click="getPersonalPerformance">我的业绩</f7-link>
                </f7-list>
            </f7-block>

            <div v-if="has_data">
                <f7-block-title class="bg-color-1 top-line font-color-4 padding-col-2-3 margin-top-1">
                    <div class="padding-left-1 width-card-badge hor-flex-center-between">
                        <div class="font-16">{{render_data.achievementMonth[current_month]}}</div>
                        <f7-link class="img-5-4 detail_calendar detail_calendar_zone padding-left-3" open-popover="#date-picker-popover3"></f7-link>
                    </div>
                </f7-block-title>
                <f7-block class="bg-white font-16 padding-0 top-line-d8" >
                    <f7-link  @click="myClick">
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
                                    {{finishedOrder}}
                                </p>
                            </div>
                            <div class="font-14 color-gray padding-left-2">
                                进行中订单(个)
                                <p class="font-18 font-color-3 margin-top-1-2">
                                    {{runningOrder}}
                                </p>
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
                        <template v-if="is_company && is_num">
                            <order-num-chart key="com_num" :height="130" v-if="company_data" :statistic="company_data"></order-num-chart>
                        </template>
                        <template v-if="is_company && !is_num">
                            <order-money-chart key="com_money" :height="130" v-if="company_data" :statistic="company_data"></order-money-chart>
                        </template>
                        <template v-if="!is_company && is_num">
                            <order-num-chart key="per_num" :height="130" v-if="personal_data" :statistic="personal_data"></order-num-chart>
                        </template>
                        <template v-if="!is_company && !is_num">
                            <order-money-chart key="per_num" :height="130" v-if="personal_data" :statistic="personal_data"></order-money-chart>
                        </template>
                    </div>
                    <div class="number display-flex padding-top-1">
                        <div class="font-14 color-gray padding-left-1">
                            累计完成订单(个)<p class="font-18 font-color-3 margin-top-1-2">{{render_data.total? render_data.total.finishCount : ''}}</p>
                        </div>
                        <div class="font-14 color-gray padding-left-2">
                            累计完成金额(元)<p class="font-18 font-color-3 margin-top-1-2">{{render_data.total? render_data.total.money : ''}}</p>
                        </div>
                    </div>
                </f7-block>

                <f7-popover id="date-picker-popover3">
                    <f7-list>
                        <template>
                            <f7-list-item v-for="(item, index) in render_data.achievementMonth" :title="item" @click="changeMonth(index)"></f7-list-item>
                        </template>
                    </f7-list>
                </f7-popover>
            </div>
        </div>

        <div v-if="!is_personal_loading&&!is_company_loading&&!has_data" class="icon_setting achievement_no_data">
            <div class="no_data_img icon_setting"></div>
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
                is_company_loading:true,
                is_personal_loading:true,
                current_month:4,
                personal:this.$store.state.login.user_info.ref,
                err:null,
                has_data:false,
            }
        },
        computed: {
            ...mapGetters({
                user_info:'user_info',
                company_achievement:'company_achievement',
                company_monthly_achievement:'company_monthly_achievement',
                person_achievement:'person_achievement',
                person_monthly_achievement:'person_monthly_achievement'
            }),
            company_data:function () {
                return this.company_achievement.statisticsFiveMonth;
            },
            personal_data:function () {
                return this.person_achievement.statisticsFiveMonth;
            },
            render_data:function () {
              if(this.is_company){
                  return this.company_achievement.statisticsFiveMonth;
              }
              else {
                  return this.person_achievement.statisticsFiveMonth;
              }
            },
            achievementMoney:function () {
                if(this.is_company){
                    return this.company_data.money[this.current_month];
                }
                else {
                    return this.personal_data.money[this.current_month];
                }
            },
            runningOrder:function () {
                if(this.is_company){
                    return this.company_data.runningCount[this.current_month];
                }
                else {
                    return this.personal_data.runningCount[this.current_month];
                }
            },
            finishedOrder:function () {
                if(this.is_company){
                    return this.company_data.finishCount[this.current_month];
                }
                else {
                    return this.personal_data.finishCount[this.current_month];
                }
            }
        },
        components:{
            OrderNumChart:OrderNumChart,
            OrderMoneyChart:OrderMoneyChart
        },
        methods:{
            ...mapActions([
                'getCompanyAchievement',
                'getPersonAchievement'
            ]),
            myClick(){
                //console.log('1222');
                /*this.$router.go('/account/profile/');*/
                //this.$router.push({path: '/account/profile/'});
                //console.log( this.$router.url)
               // this.$router.load({path: '/account/myOrders/'});
               if(!this.is_company){
                    this.$router.load({url: '/account/myOrders/'})
               }
               if(this.is_company){
                    this.$router.load({url: '/account/employeeOrders/'})
               }
            },
            getCompanyPerformance(){
                this.is_company=true;
                if(this.company_data){
                    this.has_data=true;
                }
                else {
                    this.has_data=false;
                }
            },
            getPersonalPerformance(){
                this.is_company=false;
                console.log(this.personal_data,'9999999999999999999999999999999');
                if(this.personal_data){
                    this.has_data=true;
                }
                else {
                    this.has_data=false;
                }
            },
            changeMonth(index){
                this.$f7.closeModal('#date-picker-popover3', true);
                this.current_month = index;
            },
        },
        watch:{
            err:function (newVal,oldVal) {
                if(newVal && !oldVal){
                    console.log(newVal,'sdsdsdeeeeee');
                    this.errCallbacks.netErr(this);
                }
            }
        },
        created(){
            var $vue = this;
            var url = this.user_info.level>2?'company_achievment':'store_total_achievment';
            console.log(url);
            this.getCompanyAchievement(url).then(res => {
                if(res.success){
                    this.is_company_loading = false;
                    if(res.results.statisticsFiveMonth){
                        $vue.has_data=true;
                    }
                }
            }).catch(e => {
                $vue.err = e;
            });
            this.getPersonAchievement({'agent_ref':this.personal}).then(res => {
                if(res.success){
                    this.is_personal_loading = false;
                }
            }).catch(e => {
                $vue.err = e;
            });
        }
    }
</script>
