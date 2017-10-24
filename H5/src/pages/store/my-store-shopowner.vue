<template>
    <f7-page class="b-part-page order-performance" >
        <!-- Material Theme Navbar -->
        <f7-navbar title="我的门店" back-link="Back" sliding></f7-navbar>

        <f7-col v-if="showLoading" width="100" tablet-width="100" class="margin-top-1 align-center margin-top-2">
            <f7-preloader class="spinner-color-3"></f7-preloader>
        </f7-col>
        <template v-if="!showLoading">
            <template v-for="storeList in list">
                <f7-block>
                    <f7-card>
                        <div @click="detail(storeList.store_ref)">
                            <f7-block-title class="margin-top-1 padding-col-2-3 font-color-666 height-fixed-20 bg-color-1 top-line bottom-line">
                                <div class="icon-show icon-store icon-size-20 font-18">{{storeList.name}}</div>
                            </f7-block-title>
                            <f7-card-content class="myStore">
                                <div class="number display-flex border-top-0">
                                    <div class="font-14 color-gray">
                                        <p class="font-18 font-color-3 margin-top-1-2 margin-bot-0 hor-flex-center">{{storeList.count}}</p>
                                        <p class="hor-flex-center margin-clear">本月订单(个)</p>
                                    </div>
                                    <div class="font-14 color-gray">
                                        <p class="font-18 font-color-3 margin-top-1-2 margin-bot-0 hor-flex-center">{{Math.round(storeList.money/10000)}}</p>
                                        <p class="hor-flex-center margin-clear">本月金额(万)</p>
                                    </div>
                                </div>
                            </f7-card-content>
                        </div>
                    </f7-card>
                </f7-block>
            </template>

            <f7-block class="hor-flex-center">
                <f7-button big class="margin-top-2 width-60 font-18 border-radius-40 bg-white hor-flex-center border-size-1 border-color-green">
                    <div class="icon-show icon-add-button icon-size-18 font-color-00a299" @click="add_Store">添加门店</div>
                </f7-button>
            </f7-block>
        </template>
    </f7-page>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'

    export default {
        data(){
            return {
                list:[],
                showLoading:true
            }
        },
        methods:{
            add_Store(){
                this.$router.load({url: '/store/store-information/'});
            },
            detail(ref){
                this.$router.load({url: '/store/store-details/'+ref});
            }
        },
        computed: {
            ...mapGetters({
                store_list:'store_list'
            })
        },
        watch:{
            store_list: function(val){
                this.list = val;
                //hide loading
                this.showLoading = false;
            }
        },
        created(){
            var $vue = this;
            this.$store.dispatch('getStoreList').catch(e => {
                $vue.$f7.hideIndicator();
                $vue.errCallbacks.netErr($vue);
            });
        }
    }
</script>