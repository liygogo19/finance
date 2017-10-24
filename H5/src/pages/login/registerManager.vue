<template>
    <f7-page  id="register-employee">
        <f7-navbar title="注册" back-link="Back" sliding></f7-navbar>
        <f7-block>
            <f7-list form class="without-border without-margintop">
                <f7-list-item class="slogan-title manager-title">
                    您的好友“张强强”邀请您成为店长
                </f7-list-item>
                <!-- Text Input -->
                <f7-list-item :class="{ 'form-group--error': $v.name.$error }">
                    <f7-input class="with-icon form_bg username-dark" type="text" v-model.lazy.trim="name" @input="$v.name.$touch()" placeholder="请输入真实姓名"/>
                    <div v-if="$v.name.$dirty">
                        <span class="form-group__message" v-if="!$v.name.required">* 名字不能为空</span>
                        <span class="form-group__message" v-if="$v.name.required && !$v.name.isName">* 名字格式错误</span>
                    </div>
                </f7-list-item>
                <f7-list-item class="registerSexRadio" >
                    <f7-input class="with-icon form_bg sex-dark" type="text" id="register-sex"/>
                </f7-list-item>
                <f7-list-item :class="{ 'form-group--error': $v.phone.$error }">
                    <f7-input class="with-icon form_bg telephone" type="text" v-model.lazy.trim="phone" @input="$v.phone.$touch()" placeholder="请输入手机号码"/>
                    <div v-if="$v.phone.$dirty">
                        <span class="form-group__message" v-if="!$v.phone.required">* 手机号码不能为空</span>
                        <span class="form-group__message" v-if="$v.phone.required && !$v.phone.isPhone">* 手机号码格式错误</span>
                    </div>
                </f7-list-item>
                <f7-list-item class="send-code-list" :class="{ 'form-group--error': $v.captcha.$error }">
                    <div>
                        <f7-input class="with-icon form_bg captcha-code send-code" v-model.lazy.trim="captcha" @input="$v.captcha.$touch()" @focus="captcha_is_true=false;" type="text" placeholder="请输入验证码"/>
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
                <f7-list-item class="send-code-list" :class="{ 'form-group--error': $v.phone_code.$error }">
                    <div>
                        <f7-input class="with-icon form_bg verification-code send-code" v-model.lazy.trim="phone_code" @input="$v.phone_code.$touch()" type="text" placeholder="请输入验证码"/>
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
                <f7-list-item :class="{ 'form-group--error': $v.password.$error }">
                    <f7-input class="with-icon form_bg password-dark" type="password" v-model.lazy.trim="password" @input="$v.password.$touch()" placeholder="密码, 至少6位"/>
                    <div v-if="$v.password.$dirty">
                        <span class="form-group__message" v-if="!$v.password.required">* 密码不能为空</span>
                        <span class="form-group__message" v-if="!$v.password.minLength">* 密码至少6位</span>
                        <span class="form-group__message" v-if="!$v.password.maxLength">* 密码至多16位</span>
                        <span class="form-group__message" v-if="$v.password.required && $v.password.minLength && $v.password.maxLength && !$v.password.isPsd">* 密码是大小写字母数字组合</span>
                    </div>
                </f7-list-item>
                <f7-list-item :class="{ 'form-group--error': $v.repeatPassword.$error }">
                    <f7-input class="with-icon form_bg password-dark" type="password" v-model.lazy.trim="repeatPassword" @input="$v.repeatPassword.$touch()"  placeholder="重复密码"/>
                    <div v-if="$v.repeatPassword.$dirty">
                        <span class="form-group__message" v-if="!$v.repeatPassword.required">* 重复密码不能为空</span>
                        <span class="form-group__message" v-if="$v.repeatPassword.required && !$v.repeatPassword.sameAsPassword">* 两次密码不一致</span>
                    </div>
                </f7-list-item>
                <f7-list-item>
                    <f7-input class="with-icon form_bg company" type="text" :value=company disabled/>
                </f7-list-item>
                <f7-list-item :class="{ 'form-group--error': $v.store_name.$error }">
                    <f7-input class="with-icon form_bg store" type="text" placeholder="门店名称，如鄞州一店" @input="$v.store_name.$touch()" v-model.lazy.trim="store_name"/>
                    <div v-if="$v.store_name.$dirty">
                        <span class="form-group__message" v-if="!$v.store_name.required">* 重复密码不能为空</span>
                    </div>
                </f7-list-item>
                <label id="registerNormalCheckbox" class="control control--checkbox read-requirements font-14" @click="radioCheckbox">我已阅读并同意《用户注册协议》
                    <input type="checkbox" checked/>
                    <div class="control__indicator"></div>
                </label>

                <f7-block>
                    <f7-button big class="font-16" :class="{ disabled: disabledButton }" @click="registerManager">注 册</f7-button>
                </f7-block>
            </f7-list>
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
                ref:this.$store.state.login.user_ref,
                company:'',
                name:'',
                phone:'',
                captcha:'',
                phone_code:'',
                password:'',
                repeatPassword:'',
                store_name:'',
                captcha_is_true:false,
                disabledButton:false,
                codeButtonClick:false,
                countDown:null,
                errors:{
                    phone_code:''
                }
            }
        },
        validations: {
            name: {
                required,
                isName: validatorTools.nameValidation
            },
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
                isPsd:validatorTools.psdValidation,
            },
            repeatPassword:{
                required,
                sameAsPassword: sameAs('password')
            },
            store_name:{
                required
            }
        },
        methods:{
            ...mapActions([
                'register',
                'getCaptcha',
                'smsCode',
                'beforeRegister'
            ]),
            onF7Init:function () {
                this.f7_mobile_widgets.f7_mobile_captcha(this,'#send-code-manager');
                this.f7_mobile_widgets.f7_mobile_picker(this,'#register-sex', ['1','2'],['男','女'],true);
            },
            registerManager(){
                this.$v.$touch();

                if(!this.$v.$invalid){
                    this.$f7.showIndicator();
                    var $vue = this;
                    var data = {
                        'ref':this.ref,
                        'name':this.name,
                        'sex':this.$$('#register-sex').data('val'),
                        'phone':this.phone,
                        'phone_code':this.phone_code,
                        'password':this.password,
                        'store_name':this.store_name
                    };
                    this.register(data).then((response) => {
                        this.$f7.hideIndicator();
                        if(response.success){
                            this.$router.load({url: '/account/profile/'});
                        }else{
                            for(var key in response.errors){
                                this.errors[key] = response.errors[key][0];
                            }
                        }
                    }).catch(response => {
                        $vue.errCallbacks.netErr($vue);
                    });
                }
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
                            $vue.codeButtonClick = true;
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
            radioCheckbox(){
                var checked = $('#registerNormalCheckbox input')[0].checked;
                if(checked){
                    this.disabledButton = true;
                }else{
                    this.disabledButton = false;
                }
            }
        },
        computed: {
            ...mapGetters({
                register_captcha:'register_captcha',
                register_finacecaptchakey:'register_finacecaptchakey',
                store_info:'store_info'
            })
        },
        watch:{
            store_info: function(){
                var info = this.$store.state.login.store_info;
                this.company = info.company;
            }
        },
        mounted(){
            this.$store.dispatch('beforeRegister',{'ref':this.$route.params.manager_ref});

            var $vue = this;
            $vue.$f7.showIndicator();
            this.$store.dispatch('getCaptcha').then((response) => {
                $vue.$f7.hideIndicator();
            }).catch(response => {
                $vue.$f7.hideIndicator();
                $vue.errCallbacks.netErr($vue);
            });
        }
    }
</script>