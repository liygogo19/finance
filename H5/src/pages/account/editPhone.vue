<template>
    <f7-page class="b-part-page" >
        <f7-navbar title="更换手机号码" back-link="Back" sliding></f7-navbar>
        <f7-list class="bg-color-1">
            <f7-list-item :class="{ 'form-group--error': $v.password.$error }">
                <f7-input class="form_bg" type="password" v-model.lazy.trim="password" @input="$v.password.$touch()" placeholder="请输入密码"/>
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
            <f7-list-item :class="{ 'form-group--error': $v.phone.$error }">
                <f7-input class="form_bg" type="text" v-model.lazy.trim="phone" @input="$v.phone.$touch()" placeholder="请输入新手机号码"/>
                <div v-if="$v.phone.$dirty">
                    <span class="form-group__message" v-if="!$v.phone.required">* 手机号码不能为空</span>
                    <span class="form-group__message" v-if="$v.phone.required && !$v.phone.isPhone">* 手机号码格式错误</span>
                </div>
                <div>
                    <span class="form-group__message" v-if="errors.phone">* {{errors.phone}}</span>
                </div>
            </f7-list-item>
            <f7-list-item class="send-code-list" :class="{ 'form-group--error': $v.captcha.$error }">
                <div>
                    <f7-input class="form_bg send-code" v-model.lazy.trim="captcha" @input="$v.captcha.$touch()" type="text"  @focus="captcha_is_true=false;" placeholder="请输入验证码"/>
                    <div class="send-code-block">
                        <div class="code-content" @click="getCode">
                            <img class="contain_img" :src="this.register_captcha" alt="">
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
            <f7-list-item class="send-code-list" :class="{ 'form-group--error': $v.phone_code.$error }">
                <div>
                    <f7-input class="form_bg send-code" v-model.lazy.trim="phone_code" @input="$v.phone_code.$touch()" type="text" placeholder="请输入验证码"/>
                    <div class="send-code-block border-radius-5">
                        <div class="code-content" id="send-code-employee" @click="getSmsCode">{{countDown? countDown+'秒后可重发':'发送验证码'}}</div>
                    </div>
                </div>
                <div v-if="$v.phone_code.$dirty">
                    <span class="form-group__message" v-if="!$v.phone_code.required">* 验证码不能为空</span>
                </div>
                <div>
                    <span class="form-group__message" v-if="errors.phone_code">* {{errors.phone_code}}</span>
                </div>
            </f7-list-item>
        </f7-list>

        <f7-block>
            <f7-button big @click="editPhone">确 定</f7-button>
        </f7-block>
    </f7-page>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'

    import { required, minLength, maxLength, between, sameAs } from 'vuelidate/lib/validators'
    import validatorTools from 'utility/customizedValidation'
    var validator = require('validator');

    export default {
        data(){
            return {
                password:'',
                phone:'',
                captcha:'',
                phone_code:'',
                captcha_is_true:false,
                countDown:null,
                codeButtonClick:false,
                errors:{
                    password:'',
                    phone:'',
                    phone_code:''
                }
            }
        },
        validations: {
            phone: {
                required,
                isPhone: validatorTools.isMobilePhone
            },
            captcha:{
                required
            },
            phone_code:{
                required
            },
            password:{
                required,
                minLength: minLength(6),
                maxLength: maxLength(16),
                isPsd:validatorTools.psdValidation
            }
        },
        methods:{
            ...mapActions([
                'getCaptcha',
                'smsCode',
                'editInformation'
            ]),
            onF7Init:function () {
                this.f7_mobile_widgets.f7_mobile_captcha(this,'#edit-phone-code');
            },
            getCode(){
                this.$f7.showIndicator();

                var $vue = this;
                this.getCaptcha().then((response) => {
                    this.$f7.hideIndicator();
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

                    var $vue = this;
                    this.smsCode({'phone':this.phone,'captcha':this.captcha}).then(res => {
                        console.log('this os res',res);
                        if(!res.success){
                            clearInterval(countTime);
                            this.captcha_is_true = true;
                            this.countDown = null;
                            this.codeButtonClick = false;
                        }
                    }).catch(res => {
                        $vue.$f7.hideIndicator();
                        $vue.errCallbacks.netErr($vue);
                    });
                }
            },
            editPhone(){
                this.$v.$touch();

                if(!this.$v.$invalid){
                    this.$f7.showIndicator();
                    var $vue = this;
                    this.editInformation({'password':this.password,'phone':this.phone,'phone_code':this.phone_code})
                        .then((response) => {
                            this.$f7.hideIndicator();
                            if(response.success){
                                this.$router.load({url: '/account/index/'});
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
        computed: {
            ...mapGetters({
                register_captcha:'register_captcha'
            })
        },
        mounted(){
            this.$f7.showIndicator();
            var $vue = this;
            this.$store.dispatch('getCaptcha').then((response) => {
                this.$f7.hideIndicator();
            }).catch(response => {
                    $vue.$f7.hideIndicator();
                    $vue.errCallbacks.netErr($vue);
                });
            }
    }
</script>