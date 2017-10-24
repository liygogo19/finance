<template>
    <f7-page class="b-part-page" >
        <f7-navbar>
            <f7-nav-left back-link="Back" sliding></f7-nav-left>
            <f7-nav-center class="no-padding-right">修改姓名</f7-nav-center>
            <f7-nav-right id="nickename_save_btn" class="hor-flex-center"  >
                <div @click="changeNickname" class="font-16">保存</div>
            </f7-nav-right>
        </f7-navbar>

        <f7-list class="bg-color-1">
            <f7-list-item class="with-input with-profile-title" :class="{ 'form-group--error': $v.name.$error }">
                <div class="item-input form_bg item-input-field not-empty-state">
                    <input id="ume_nickename" type="text" v-model.trim="name" @input="$v.name.$touch()">
                    <span id="nickname_cancel_btn" class="icon_setting width-fixed-1 position-absolute top-1-2 right-0"></span>
                </div>
                <div v-if="$v.name.$dirty">
                    <span class="form-group__message" v-if="!$v.name.required">* 名字不能为空</span>
                    <span class="form-group__message" v-if="$v.name.required && !$v.name.isName">* 名字格式错误</span>
                </div>
            </f7-list-item>
        </f7-list>

    </f7-page>
</template>

<script>
    import { required, minLength, maxLength, between, sameAs } from 'vuelidate/lib/validators'
    import {mapActions, mapGetters} from 'vuex'
    import validatorTools from 'utility/customizedValidation'
    var validator = require('validator');

    export default{
        data(){
            return {
                name : this.$store.state.login.user_info.name
            }
        },
        validations: {
            name: {
                required,
                isName: validatorTools.nameValidation
            }
        },
        methods: {
            ...mapActions([
                'editInformation'
            ]),
            changeNickname(){
                this.$v.$touch();

                if(!this.$v.$invalid){
                    this.$f7.showIndicator();
                    var $vue = this;
                    this.editInformation({'name':this.name}).then((response) => {
                        this.$f7.hideIndicator();
                        if(response.success){
                            this.$router.load({url: '/account/index/'});
                        }else{

                        }
                    }).catch(response => {
                        $vue.$f7.hideIndicator();
                        $vue.errCallbacks.netErr($vue);
                    });
                }
            }
        },
        mounted(){
            var $vue = this;
            $(function () {
                $(document).on('click','#nickname_cancel_btn',function () {
                    $(this).addClass('hidden');
                    $vue.name = '';
                });

                $(document).on('input propertychange','#ume_nickename',function () {
                    if(!$(this).val()){
                        $('#nickname_cancel_btn').addClass('hidden');
                    }
                    else if($('#nickname_cancel_btn').hasClass('hidden')) {
                        $('#nickname_cancel_btn').removeClass('hidden');
                    }
                });
            })
        },
    }
</script>

<style>
    #nickname_cancel_btn{
        height: 1rem;
        border-radius: 50%;
        flex:0 0 1rem;
        text-align: center;
        background-color: rgba(0 , 0 , 0 , 0.2);
        background-size: 50%;
        background-image: url("../../img/profile/delete.svg");
        transition: all 400ms;
        -moz-transition: all 400ms;
        -webkit-transition: all 400ms;
        -o-transition: all 400ms;
    }
</style>