<template>
    <f7-page id="forget-page">
        <f7-navbar title="忘记密码" back-link="Back" sliding></f7-navbar>
        <f7-list>
            <f7-list-item :class="{ 'form-group--error': $v.phone.$error }">
                <f7-input class="with-icon form_bg telephone" type="text" v-model.lazy.trim="phone" @input="$v.phone.$touch()" placeholder="请输入手机号码"/>
                <div v-if="$v.phone.$dirty">
                    <span class="form-group__message" v-if="!$v.phone.required">* 手机号码不能为空</span>
                    <span class="form-group__message" v-if="$v.phone.required && !$v.phone.isPhone">* 手机号码格式错误</span>
                </div>
            </f7-list-item>
            <f7-list-item class="send-code-list" :class="{ 'form-group--error': $v.captcha.$error }">
                <div>
                    <f7-input class="with-icon form_bg captcha-code send-code" v-model.lazy.trim="captcha" @input="$v.captcha.$touch()"  @focus="captcha_is_true=false;" type="text" placeholder="请输入验证码"/>
                    <div class="send-code-block">
                        <div class="code-content" @click="getCode" >
                            <img class="contain_img" :src="register_captcha" alt="">
                        </div>
                    </div>
                </div>
                <div v-if="$v.captcha.$dirty">
                    <span class="form-group__message" v-if="!$v.captcha.required">* 图形验证码不能为空</span>
                </div>
                <div>
                    <span class="form-group__message" v-if="captcha_is_true">* 图形验证码错误</span>
                </div>
            </f7-list-item>

            <f7-list-item class="send-code-list" :class="{ 'form-group--error': $v.verification.$error }">
                <div>
                    <f7-input class="with-icon form_bg verification-code send-code" v-model.lazy.trim="verification" @input="$v.verification.$touch()" type="text" placeholder="请输入验证码"/>
                    <div class="send-code-block border-radius-5">
                        <div class="code-content" id="send-code-employee" @click="getSmsCode">{{countDown? countDown+'秒后可重发':'发送验证码'}}</div>
                    </div>
                </div>
                <div v-if="$v.verification.$dirty">
                    <span class="form-group__message" v-if="!$v.verification.required">* 验证码不能为空</span>
                </div>
                <div>
                    <span class="form-group__message" v-if="errors.phone_code">* {{errors.phone_code}}</span>
                </div>
            </f7-list-item>
            <f7-list-item :class="{ 'form-group--error': $v.password.$error }">
                <f7-input class="with-icon form_bg password-dark" name="password"  type="password" @input="$v.password.$touch()"  v-model.lazy.trim="password" placeholder="请输入密码"/>
                <div v-if="$v.password.$dirty">
                    <span class="form-group__message" v-if="!$v.password.required">* 密码不能为空</span>
                </div>
            </f7-list-item>

            <f7-block>
                <f7-button big class="font-16" @click="register">重 置</f7-button>
            </f7-block>
        </f7-list>
    </f7-page>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    import { required, minLength, maxLength, between, sameAs } from 'vuelidate/lib/validators'
    import validatorTools from 'utility/customizedValidation'
    var validator = require('validator');

    export default {
        data(){
            return{
                phone:'',
                captcha:'',
                verification:'',
                password:'',
                captcha_is_true:false,
                countDown:null,
                codeButtonClick:false,
                errors:{
                    phone_code:''
                }
            }
        },
        validations: {
            phone: {
                required,
                isPhone: validatorTools.isMobilePhone,
            },
            captcha:{
                required,
            },
            verification:{
                required,
            },
            password:{
                required,
                minLength: minLength(6),
                maxLength: maxLength(16),
                isPsd:validatorTools.psdValidation,
            },
        },
        methods:{
            ...mapActions([
                'getCaptcha',
                'smsCode',
                'reshufflePassword'
            ]),
            onF7Init:function () {
                // this.f7_mobile_widgets.f7_mobile_captcha(this,'#send-code-employee');
            },
            getCode(){
                var $vue = this;
                $vue.$f7.showIndicator();
                this.getCaptcha().then(response => {
                    $vue.$f7.hideIndicator();
                }).catch(response => {
                    $vue.$f7.hideIndicator();
                    $vue.errCallbacks.netErr($vue);
                });
            },
            getSmsCode(){
                if(this.codeButtonClick) return;
                this.$v.phone.$touch();
                this.$v.captcha.$touch();

                console.log('getSmsCode vue',{'phone':this.phone,'captcha':this.captcha});
                if(!this.$v.phone.$error&&!this.$v.captcha.$error){
                    this.codeButtonClick = true;
                    this.countDown=60;
                    var $vue = this;
                    var countTime = setInterval(function () {
                        $vue.countDown--;
                        if($vue.countDown<1){
                            $vue.codeButtonClick = false;
                            clearInterval(countTime);
                        }
                    },1000);

                    this.smsCode({'phone':this.phone,'captcha':this.captcha}).then(res => {
                        console.log(res,'this os res');
                        if(!res.success){
                            clearInterval(countTime);
                            this.captcha_is_true = true;
                            this.countDown = null;
                            this.codeButtonClick = false;
                        }
                    }).catch(res => {
                        $vue.errCallbacks.netErr($vue);
                    });
                }
            },
            register(){
                var $vue = this;
                this.$v.$touch();

                if(!this.$v.$invalid){
                    $vue.$f7.showIndicator();
                    var data = {'phone':this.phone,'phone_code':this.verification,'password':this.password};
                    this.reshufflePassword(data).then((response) => {
                        $vue.$f7.hideIndicator();
                        if(response.success){
                            this.$router.load({url: '/login/'});
                        }else{
                            for(var key in response.errors){
                                this.errors[key] = response.errors[key][0];
                            }
                        }
                    }).catch(res => {
                        $vue.$f7.hideIndicator();
                        $vue.errCallbacks.netErr($vue);
                    });
                }
            }
        },
        mounted(){
            var $vue = this;
            $vue.$f7.showIndicator();
            this.$store.dispatch('getCaptcha').then((response) => {
                $vue.$f7.hideIndicator();
            }).catch(res => {
                $vue.$f7.hideIndicator();
                $vue.errCallbacks.netErr($vue);
            });
        },
        computed: {
            ...mapGetters({
                register_captcha: 'register_captcha',
            })
        }
    }
</script>

<style>
    #forget-page .list-block li{
        background-color: #ffffff;
    }
</style>