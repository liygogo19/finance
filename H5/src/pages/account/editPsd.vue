<template>
    <f7-page class="b-part-page" >
        <f7-navbar title="修改密码" back-link="Back" sliding></f7-navbar>
        <f7-list class="bg-color-1">
            <f7-list-item :class="{ 'form-group--error': $v.password.$error }">
                <f7-input class="form_bg" type="password" v-model.lazy.trim="password" @input="$v.password.$touch()" placeholder="请输入原密码"/>
                <div v-if="$v.password.$dirty">
                    <span class="form-group__message" v-if="!$v.password.required">* 密码不能为空</span>
                    <span class="form-group__message" v-if="!$v.password.minLength">* 密码至少6位</span>
                    <span class="form-group__message" v-if="!$v.password.maxLength">* 密码至多16位</span>
                    <span class="form-group__message" v-if="$v.password.required && $v.password.minLength && $v.password.maxLength && !$v.password.isPsd">* 密码是大小写字母数字组合</span>
                </div>
                <div>
                    <span class="form-group__message" v-if="errors.password">* {{errors.password}}</span>
                </div>
            </f7-list-item>
            <f7-list-item :class="{ 'form-group--error': $v.new_password.$error }">
                <f7-input class="form_bg" type="password" v-model.lazy.trim="new_password" @input="$v.new_password.$touch()" placeholder="请输入新密码(至少6位)"/>
                <div v-if="$v.new_password.$dirty">
                    <span class="form-group__message" v-if="!$v.new_password.required">* 密码不能为空</span>
                    <span class="form-group__message" v-if="!$v.new_password.minLength">* 密码至少6位</span>
                    <span class="form-group__message" v-if="!$v.new_password.maxLength">* 密码至多16位</span>
                    <span class="form-group__message" v-if="$v.new_password.required && $v.new_password.minLength && $v.new_password.maxLength && !$v.new_password.isPsd">* 密码是大小写字母数字组合</span>
                </div>
            </f7-list-item>
            <f7-list-item :class="{ 'form-group--error': $v.repeat_password.$error }">
                <f7-input class="form_bg" type="password" v-model.lazy.trim="repeat_password" @input="$v.repeat_password.$touch()"  placeholder="重复新密码"/>
                <div v-if="$v.repeat_password.$dirty">
                    <span class="form-group__message" v-if="!$v.repeat_password.required">* 重复密码不能为空</span>
                    <span class="form-group__message" v-if="$v.repeat_password.required && !$v.repeat_password.sameAsPassword">* 两次密码不一致</span>
                </div>
            </f7-list-item>
        </f7-list>

        <f7-block>
            <f7-button big @click="editPwd">提 交</f7-button>
        </f7-block>
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
                password : '',
                new_password : '',
                repeat_password : '',
                errors:{
                    password:''
                }
            }
        },
        validations: {
            password:{
                required,
                minLength: minLength(6),
                maxLength: maxLength(16),
                isPsd:validatorTools.psdValidation,
            },
            new_password:{
                required,
                minLength: minLength(6),
                maxLength: maxLength(16),
                isPsd:validatorTools.psdValidation,
            },
            repeat_password:{
                required,
                sameAsPassword: sameAs('new_password')
            }
        },
        methods: {
            ...mapActions([
                'editInformation'
            ]),
            editPwd(){
                this.$v.$touch();

                var $vue = this;
                if(!this.$v.$invalid){
                    this.$f7.showIndicator();
                    this.editInformation({'password':this.password,'new_password':this.new_password})
                        .then((response) => {
                            this.$f7.hideIndicator();
                            if(response.success){
                                this.$router.load({url: '/account/index/'});
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
    }
</script>