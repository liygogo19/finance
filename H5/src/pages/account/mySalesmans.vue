<template>
    <f7-page class="b-part-page page-no-scroll" >
        <f7-navbar title="我的业务员" back-link="Back" sliding></f7-navbar>

        <div class="search_agent_tool">
            <div class="search_input_inner">
                <input type="text" placeholder="请输入业务员姓名" v-model="searchAgentName" @input="searchAgent(searchAgentName)">
                <div class="search_input_btn icon_setting font-color-3" @click="searchAgent">搜索</div>
            </div>
        </div>
        <div class="search_result_area">
            <div class="select_area">
                <div class="border-right-ee" @click="toggleStores"><p>{{store.name}}</p></div>
                <div @click="toggleSorts"><p>{{sortTitle}}</p></div>
            </div>
        </div>

        <div v-show="all_stores" class="district_dropdown_zone">
            <all-stores @changeStoreOption="changeStore"></all-stores>
            <div @click="all_stores=false;" class="dark_bg"></div>
        </div>

        <div v-show="all_sorts" class="district_dropdown_zone">
            <all-sorts @changeSortOption="changeSort"></all-sorts>
            <div @click="all_sorts=false;" class="dark_bg"></div>
        </div>

        <f7-col v-if="is_loading" width="100" tablet-width="100" class="margin-top-1 align-center margin-top-2">
            <f7-preloader class="spinner-color-3"></f7-preloader>
        </f7-col>

        <template v-if="!is_loading">
            <f7-block class="order-list-zone infinite-scroll">
                <f7-grid>
                    <template v-for="agent in agents">
                        <f7-col width="100" tablet-width="50">
                            <f7-link :href="'/salesman/detail/'+agent.store_ref+'/'+agent.agent_ref">
                                <f7-card class="border-radius-5 no-margin margin-top-1">
                                    <f7-card-content class="salesman-card-content">
                                        <div class="salesman-avator-img icon_setting margin-right-1" :class="{ 'male-avator': agent.sex != '2', 'female-avator': agent.sex == '2' }">
                                            <template v-if="agent.picture">
                                                <img class="img-4-4" :src="avatorPrefix+agent.picture" alt="">
                                            </template>
                                        </div>
                                        <div class="col-flex-center-between">
                                            <div class="font-16 font-color-1">
                                                {{agent.name}}
                                                <div class="margin-left-1 font-14 font-color-6 title-style" v-if="agent.agent_level==2"><span class="icon_setting  title-icon"></span> <span>店长</span></div>
                                            </div>
                                            <div class="font-color-2">{{agent.company_name}}－{{agent.store_name}}</div>
                                            <div class="hor-flex-left font-color-2">
                                                <div class="padding-left-3-2 form_bg order-num-icon">{{agent.count}}个</div>
                                                <div class="padding-left-3-2 form_bg money-num-icon margin-left-1">{{formatMoney(agent.money).intPart}}{{formatMoney(agent.money).decPart}}万</div>
                                            </div>
                                        </div>
                                    </f7-card-content>
                                </f7-card>
                            </f7-link>
                        </f7-col>
                    </template>
                    <f7-col width="100" tablet-width="100" class="margin-top-1 align-center">
                        <div v-if="has_agents && !is_loading" class="font-color-2">没有更多业务员~</div>
                        <div v-if="!has_agents" class="font-color-2">无该业务员相关信息~</div>
                    </f7-col>
                </f7-grid>
            </f7-block>
        </template>

    </f7-page>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'

    import AllStores from './dropdownComponents/allStores.vue'
    import AllSorts from './dropdownComponents/allSorts.vue'
    import api_params from 'utility/api_params'

    export default {
        data(){
            return{
                agents:[],
                store:this.$store.state.login.user_info.store[0],
                sortTitle:'默认排序',
                sort:{
                    order_count:'',
                    order_money:''
                },
                is_search:false,
                searchAgentName:'',
                all_stores:false,
                all_sorts:false,
                is_loading:true,
                has_agents:true,
            }
        },
        methods:{
            ...mapActions([
                'getAgents'
            ]),
            toggleStores(){
                this.all_sorts=false;
                this.all_stores=!this.all_stores;
            },
            toggleSorts(){
                this.all_stores=false;
                this.all_sorts=!this.all_sorts;
            },
            hasAgents(){
                this.has_agents = true;
            },
            noAgents(){
                this.has_agents = false;
            },
            //initialize data
            initializeData(){
                this.agents = [];//clear agents array
                this.all_stores = false;//close stores
                this.all_sorts = false;//close sorts
                this.is_loading = true;//loading
                this.has_agents = true;//has order
                this.is_search = false;//no search
            },
            agentsData(){
                var data = {
                    'store_ref':this.store.ref,
                    'order_count':this.sort.order_count,
                    'order_money':this.sort.order_money
                }
                if(this.is_search) data.name = this.searchAgentName;

                return data;
            },
            //filter agents
            filterAgents(value){
                for(var i=0;i<value.length;i++) {
                    if(value[i].agent_level > 0){
                        this.agents.push(value[i]);
                    }
                }
                console.log('agents length:',this.agents.length);
            },
            optionCallback(result){
                if(!result.length){
                    this.noAgents();
                }else {
                    this.hasAgents();
                }
                this.is_loading = false;

                console.log(
                    'agent length:',result.length,
                    'has_agents:',this.has_agents
                );
            },
            changeStore(value){
                this.initializeData();
                this.store = value;//new store ref

                var data = this.agentsData();
                console.log('data:',data);

                var $vue = this;

                this.getAgents(data).then((response) => {
                    if(response.success){
                        this.filterAgents(response.results);
                        this.optionCallback(this.agents);
                    }
                }).catch(e => {
                    $vue.errCallbacks.netErr($vue);
                });
            },
            changeSort(value){
                var search = this.is_search;//sort save is_search
                this.initializeData();
                this.is_search = search;

                console.log('sort:',value);
                this.sortTitle = value.title;
                this.sort.order_count = '';
                this.sort.order_money = '';
                if(value.sort){
                    this.sort[value.sort] = value.order;
                }

                var $vue = this;

                var data = this.agentsData();
                console.log('data:',data);
                this.getAgents(data).then((response) => {
                    if(response.success){
                        this.filterAgents(response.results);
                        this.optionCallback(this.agents);
                    }
                }).catch(e => {
                    $vue.errCallbacks.netErr($vue);
                });
            },
            searchAgent(){
                var $vue = this;
                /*if(this.searchAgentName){*/
                    this.initializeData();
                    this.is_search = true;

                    var data = this.agentsData();
                    console.log('data:',data);

                    this.getAgents(data).then((response) => {
                        if(response.success){
                            this.filterAgents(response.results);
                            this.optionCallback(this.agents);
                        }
                    }).catch(e => {
                        $vue.errCallbacks.netErr($vue);
                    });
                /*}*/
            }
        },
        computed: {
            ...mapGetters({
                user_info:'user_info',
                store_detail:'store_detail'
            }),
            avatorPrefix:function () {
                var prefix = api_params.base_url;
                return prefix+'../';
            }
        },
        components: {
            AllStores: AllStores,
            AllSorts: AllSorts
        },
        mounted:function () {
            var $vue = this;
            var data = this.agentsData();
            console.log('data:',data);

            this.getAgents(data).then((response) => {
                if(response.success){
                    this.filterAgents(response.results);
                    this.optionCallback(this.agents);
                }
            }).catch(e => {
                $vue.errCallbacks.netErr($vue);
            });

//            var $vue = this;
//            this.$$(document).on('infinite', '.order-list-zone.infinite-scroll', function () {
//                if(!$vue.is_loading) return;
//                $vue.is_loading = false;
//
//                console.log('infinite!!!');
//
//                var data = $vue.agentsData();
//                console.log('data:',data);
//
//                $vue.getAgents(data).then((response) => {
//                    if(response.success){
//                        var newAgents = response.results;
//                        if(newAgents.length){
//                            $vue.agents = $vue.filterAgents($vue.agents,newAgents);
//                            $vue.optionCallback($vue.agents);
//                        }else{
//                            $vue.noMore();
//                        }
//                        console.log('return agents:',response.results);
//                    }
//                });
//            });
        }
    }
</script>

<style>
    .salesman-card-content>div{
        display: flex;
    }

    .salesman-avator-img{
        flex: 0 0 4.4rem;
        height: 4.4rem;
    }

    .img-4-4{
        width: 4.4rem;
        height: 4.4rem;
        border: none;
        border-radius: 50%;
        object-fit: cover!important;
        -o-object-fit: cover!important;
    }

</style>