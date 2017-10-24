<template>
    <f7-page class="b-part-page">
        <!-- Material Theme Navbar -->
        <f7-navbar title="添加门店" back-link="Back" sliding></f7-navbar>

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
            <f7-button big @click="add_store">确定</f7-button>
        </f7-block>
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
                store_name:'',
                store_address:'',
                store_phone:'',
                errors:{
                    store_name:'',
                    store_address:'',
                    store_phone:''
                }
            }
        },
        methods:{
            ...mapActions([
                'addStore'
            ]),
            add_store(){
                var data = {
                    'store_name':this.store_name,
                    'store_address':this.store_address,
                    'store_phone':this.store_phone
                };
                console.log('add store vue',data);

                this.$f7.showIndicator();
                var $vue = this;
                this.addStore(data).then((response) => {
                    this.$f7.hideIndicator();
                    this.errors = {};

                    if(response.success){
                        this.$router.load({url: '/store/my-store-shopowner/'});
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
        }
    }
</script>
