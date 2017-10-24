<template>
    <f7-page class="b-part-page">
        <!-- Material Theme Navbar -->
        <f7-navbar title="门店信息" back-link="Back" sliding></f7-navbar>

        <f7-col v-if="showLoading" width="100" tablet-width="100" class="margin-top-1 align-center margin-top-2">
            <f7-preloader class="spinner-color-3"></f7-preloader>
        </f7-col>

        <template v-if="!showLoading">
            <f7-list class="bg-color-1">
                <f7-list-item title="门店名字" class="with-input with-profile-title" :class="{ 'form-list-error': errors.store_name }">
                    <input type="text" placeholder="请输入门店名字" v-model="store_name">
                </f7-list-item>
                <f7-list-item title="地址" class="with-input with-profile-title" :class="{ 'form-list-error': errors.store_address }">
                    <input type="text" placeholder="请输入地址" v-model="store_address">
                </f7-list-item>
                <f7-list-item title="电话" class="with-input with-profile-title" :class="{ 'form-list-error': errors.store_phone }">
                    <input type="number" placeholder="请输入电话" v-model="store_phone">
                </f7-list-item>
            </f7-list>

            <f7-block>
                <f7-button big @click="edit_store">确定</f7-button>
            </f7-block>
        </template>
    </f7-page>
</template>

<script>
    import { required, minLength, maxLength, between, sameAs } from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'
    import validatorTools from 'utility/customizedValidation'
    var validator = require('validator');

    export default {
        data(){
            return {
                store_name : '',
                store_address : '',
                store_phone : '',
                showLoading : true,
                errors:{
                    store_name:'',
                    store_address:'',
                    store_phone:''
                }
            }
        },
        methods:{
            ...mapActions([
                'editStore'
            ]),
            edit_store(){
                var data = {
                    'store_ref':this.$route.params.postId,
                    'store_name':this.store_name,
                    'store_address':this.store_address,
                    'store_phone':this.store_phone
                };

                this.$f7.showIndicator();
                var $vue = this;
                this.editStore(data).then((response) => {
                    this.$f7.hideIndicator();
                    this.errors = {};

                    if(response.success){
                        this.$router.load({url: '/store/store-details/'+this.$route.params.postId});
                    }else{
                        for(var key in response.errors){
                            this.errors[key] = response.errors[key][0];
                        }
                    }
                }).catch(response => {
                    $vue.$f7.hideIndicator();
                    $vue.errCallbacks.netErr($vue);
                });
            }
        },
        computed: {
            ...mapGetters({
                store_detail:'store_detail'
            })
        },
        watch:{
            store_detail: function(val){
                var data = val;
                this.store_name = data.store.name;
                this.store_address = data.store.address;
                this.store_phone = data.store.phone;

                //hide loading
                this.showLoading = false;
            }
        },
        mounted(){
            var year = new Date().getFullYear(),month = new Date().getMonth()+1,date;
            if(month < 10){
                month ='-0'+month;
            }else{
                month ='-'+month;
            }
            date = year + month;

            var $vue = this;
            this.$store.dispatch('storeDetail',{'store_ref':this.$route.params.postId,'search_time':date}).catch(response => {
                $vue.$f7.hideIndicator();
                $vue.errCallbacks.netErr($vue);
            });
        }
    }
</script>
