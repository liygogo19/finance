<template>
    <f7-page class="b-part-page page-no-scroll" >
        <f7-navbar>
            <f7-nav-left back-link="Back" sliding></f7-nav-left>
            <f7-nav-center class="no-padding-right">我的订单</f7-nav-center>
            <f7-nav-right id="add_order_btn" class="hor-flex-center"  >
                <f7-link href="/order/add_order/" class="font-16 no-padding width-100">添加</f7-link>
            </f7-nav-right>
        </f7-navbar>

        <div class="search_agent_tool">
            <div class="search_input_inner">
                <input type="text" v-model="order_num" placeholder="请输入订单编号" @input="sendOrderNum()">
                <div class="search_input_btn icon_setting font-color-3" @click="sendOrderNum">搜索</div>
            </div>
        </div>
        <div class="search_result_area border-bot-1">
            <div class="select_area">
                <div class="border-right-ee" @click="toggleState"><p>{{state_option.title}}</p></div>
                <div @click="togglePeriods"><p>{{periods_option.title}}</p></div>
            </div>
        </div>
        <div v-show="all_states" class="district_dropdown_zone">
            <all-states @changeStateOption="changeState"></all-states>
            <div @click="all_states=false;" class="dark_bg"></div>
        </div>
        <div v-show="all_periods" class="district_dropdown_zone">
            <all-periods @changePeriodsOption="changePeriods"></all-periods>
        </div>
        <f7-block class="order-list-zone infinite-scroll">
            <f7-grid>
                <template v-for="item in order_list">
                    <f7-col width="100" tablet-width="50">
                        <f7-link :href="'/order/detail/'+item.ref">
                            <f7-card class="border-radius-5 no-margin margin-top-1">
                                <f7-card-header class="scale-y-1 font-14 font-color-2">订单编号：{{item.ref}}<span :class="state_color[item.status]">{{state_name[item.status]}}</span></f7-card-header>
                                <f7-card-content class="flex-card-content min-inner-height-4">
                                    <div class="flex-1">
                                        <div class="font-16 font-color-1 margin-bot-1-2">赎楼服务</div>
                                        <div class="font-14 font-color-4">{{item.add_time}}</div>
                                    </div>
                                    <div class="font-20 font-color-3 title-style no-border order-money-num flex-2 height-auto">
                                        <div class="hor-flex-right">
                                            <div class="icon_setting order-money-icon icon-16"></div><div class="margin-left-1">{{formatMoney(item.loan_money).intPart}}{{formatMoney(item.loan_money).decPart}}<span class="margin-left-1-2">万</span></div>
                                        </div>
                                    </div>
                                </f7-card-content>
                            </f7-card>
                        </f7-link>
                    </f7-col>
                </template>
                <f7-col width="100" tablet-width="100" class="margin-top-1 align-center">
                    <f7-preloader v-if="has_more" class="spinner-color-3"></f7-preloader>
                    <div v-if="!has_more&&has_order" class="font-color-2">没有更多订单~</div>
                    <div v-if="!has_order" class="font-color-2">无该订单相关信息~</div>
                </f7-col>
            </f7-grid>
        </f7-block>
    </f7-page>
</template>

<script>
    //import AllStores from './dropdownComponents/allStores.vue'
    import AllStores from './dropdownComponents/allStores.vue'
    import AllStates from './dropdownComponents/allStates.vue'
    import AllPeriods from './dropdownComponents/allPeriods.vue'
    import { mapActions,mapGetters } from 'vuex'
    import widgets_tools from 'utility/widgets_tools'

    export default {
        data(){
            return{
                all_states:false,
                all_periods:false,
                state_option:{
                    title:'所有状态',
                    key:'',
                },
                periods_option:{
                    title:'所有时间',
                    start_time:null,
                    end_time:null
                },
                state_color:{
                    0:'font-color-6',
                    1:'font-color-3',
                    2:'font-color-7',
                    3:'font-color-4',
                    4:'font-color-2',
                },
                default_per_page:20,
                is_loading:true,
                has_more:true,
                next_page:2,
                order_num:'',
                has_order:true,
            }
        },
        computed: {
            ...mapGetters({
                config_options:'config_options',
                user_info:'user_info',
                order_list:'order_list'
            }),
            state_name:function () {
                var status = this.config_options? this.config_options.order.orderStatus : [];
                return widgets_tools.generateStatusOptions(status);
            },
            filter_option:function () {
                var options = {
                    formData:{
                        status:this.state_option.key,
                        agent_ref:this.user_info.ref,
                        'per-page':this.default_per_page,
                    }
                }

                if(this.periods_option.start_time&&this.periods_option.end_time){
                    options.formData.start_time = this.periods_option.start_time;
                    options.formData.end_time = this.periods_option.end_time;
                }

                if(this.state_option.status){
                    options.formData.status = this.state_option.status;
                }

                return options;

            }
        },
        watch:{
//            state_option:function () {
//                this.sendOptions();
//            },
//            periods_option:function (newVal,oldVal) {
//                console.log(newVal,oldVal,'new-old');
//                this.sendOptions();
//            },
            filter_option:function () {
                this.sendOptions();
            }
        },
        methods:{
            toggleStores(){
                this.all_states=false;
                this.all_periods=false;
            },
            toggleState(){
                this.all_periods=false;
                this.all_states=!this.all_states;
            },
            togglePeriods(){
                this.all_states=false;
                this.all_periods=!this.all_periods;
            },
            changeState(value){
                this.state_option = value;
                this.all_states=false;
            },
            changePeriods(value){
                this.periods_option = value;
                this.all_periods=false;
            },
            sendOptions(){
                this.$store.state.order.order_list = null;
                this.is_loading = false;
                this.has_more = true;
                this.has_order = true;
                this.next_page = 2;

                var $vue = this;
                this.$store.dispatch('getOrder',this.filter_option).then(result => {
                    this.optionCallback(result);
                }).catch(result => {
                    $vue.errCallbacks.netErr($vue);
                });
            },
            optionCallback(result){
                if(!result || result.length<this.default_per_page){
                    this.is_loading = false;
                    this.has_more = false;
                }
                else {
                    this.is_loading = true;
                    this.has_more = true;
                    this.next_page++;
                }
            },
            sendOrderNum(event){
               
                this.all_states=false;
                this.all_periods=false;
                // if(!this.order_num){
                //     $.showTooltip('请输入订单编号');
                //     return;
                // }
                this.has_more = true;
                this.has_order = true;
                this.$store.state.order.order_list = null;

                var $vue = this;
                this.$store.dispatch('getOrder',{
                    formData:{
                        order_ref:this.order_num,
                        agent_ref:this.user_info.ref,
                    },
                }).then( result => {
                    console.log(result,'result');
                    this.is_loading = false;
                    this.has_more = false;
                    if(!result || result.length<1){
                        this.has_order = false;
                    }
                }).catch(result => {
                    $vue.errCallbacks.netErr($vue);
                });
            }
        },
        components: {
            AllStates: AllStates,
            AllPeriods: AllPeriods,
            AllStores: AllStores
        },
        mounted:function () {
            this.$store.state.order.order_list = null;
            var formData = {
                'per-page':this.default_per_page,
                agent_ref:this.user_info.ref,
            };
            var obj={
                formData:formData
            }
            var $vue = this;
            this.$store.dispatch('getOrder',obj).then(result => {
                this.optionCallback(result);
                this.next_page=2;
            }).catch(result => {
                $vue.errCallbacks.netErr($vue);
            });

            this.$$(document).on('infinite', '.order-list-zone.infinite-scroll', function () {
                
                if(!$vue.is_loading) return;
                $vue.is_loading = false;
                var options = $vue.filter_option;
                console.log('options',options);
                options.formData.page = $vue.next_page;
                $vue.$store.dispatch('getOrder',options).then( result => {
                    $vue.optionCallback(result);
                }).catch(result => {
                    $vue.errCallbacks.netErr($vue);
                });
            });
        }
    }
</script>

<style>
    .flex-card-content .card-content-inner{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .flex-card-content .card-content-inner>div{
        flex: 1;
    }

    .order-money-num{
        height: 1.5rem;
        line-height: 1.5rem;
        display: flex;
        justify-content: flex-end;
    }

    .order-money-num-with-salesman{
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between!important;
        font-size: 16px;
    }

    .order-money-icon{
        width: 1.25rem;
        height: 1.25rem;
        background-image: url("../../img/profile/money.svg");
    }

    .order-list-zone{
        height: calc(100% - 5.625rem);
        overflow: scroll;
        margin-top: 0!important;
        margin-bottom: 0!important;
        padding-bottom: 1rem!important;
    }

    .min-inner-height-4 .card-content-inner>div{
        height: 3.5rem!important;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>