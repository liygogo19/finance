<template>
    <f7-page class="login-bg" id="login-page">
        <f7-navbar title="登录"></f7-navbar>
        <div class="login-logo icon_setting">

        </div>
        <f7-block>
            <f7-list form id="login-form" class="without-border">
                <!-- Text Input -->
                <form id="login-form">
                    <f7-list-item :class="{ 'form-group--error': $v.username.$error }">
                        <f7-input class="with-icon form_bg username" name="phone"  type="text" @input="$v.username.$touch()"  v-model.lazy.trim="username" placeholder="请输入手机号码" autocomplete="off" />
                        <div v-if="$v.username.$dirty">
                            <span class="form-group__message" v-if="!$v.username.required">* 手机号码不能为空</span>
                            <span class="form-group__message" v-if="$v.username.required && !$v.username.isPhone">* 请输入正确手机号码格式。</span>
                        </div>
                    </f7-list-item>
                    <f7-list-item :class="{ 'form-group--error': $v.password.$error }">
                        <f7-input class="with-icon form_bg password" name="password"  type="password" @input="$v.password.$touch()"  v-model.lazy.trim="password" placeholder="请输入密码"/>
                        <div v-if="$v.password.$dirty">
                            <span class="form-group__message" v-if="!$v.password.required">* 密码不能为空</span>
                        </div>
                        <div>
                            <span class="form-group__message" v-if="errors.password">* {{errors.password}}</span>
                        </div>
                    </f7-list-item>
                </form>
                <f7-block>
                    <f7-button big class="font-16" @click="log_in">登 录</f7-button>
                </f7-block>
            </f7-list>
            <f7-link class="forget-link" href="/forget/password/">忘记密码</f7-link>
        </f7-block>
    </f7-page>
</template>

<script>
    import { required, minLength, maxLength, between, sameAs } from 'vuelidate/lib/validators'
    import validatorTools from 'utility/customizedValidation'
    var validator = require('validator');

    import { mapActions,mapGetters } from 'vuex'

    export default {
        data(){
            return{
                username:'15967867736',
                password:'abc123',
                errors:{
                    password:''
                }
            }
        },
        methods:{
            ...mapActions([
                'logIn',
                'companyFiveMonthAchievment',
                'storeFiveMonthAchievment',
                'personFiveMonthAchievment'
            ]),
            log_in(){
                this.$v.$touch();//validate
                var $vue = this;
                if(!this.$v.$invalid){
                    this.$f7.showIndicator();
                    var data = {'username':this.username,'password':this.password};
                    console.log('login vue',data);
                    this.logIn(data).then((response) => {
                        $vue.$f7.hideIndicator();
                        if(response){
                            if(response.success){
                                console.log($vue,'error test');
                                $vue.$router.load({url: '/account/profile/'});
                            }else{
                                for(var key in response.errors){
                                    $vue.errors[key] = response.errors[key][0];
                                }
                            }
                        }
                    }).catch(res => {
                        alert(res);
                        $vue.$f7.hideIndicator();
                        $vue.errCallbacks.netErr($vue);
                    });
                }
            }
        },
        validations: {
            username: {
                required,
                isPhone: validatorTools.isMobilePhone
            },
            password:{
                required
            }
        }
    }
</script>

<style>
    #login-page .page-content{
        background-image: url("../../img/login/bg_sign@3x.png");
        background-position: left 56px;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .login-logo{
        margin-top: 3rem;
        margin-bottom: 6rem;
        height: 8.5rem;
        background-image: url("../../img/login/logo.svg");
    }

    #login-page .input-field:after,#login-page .item-input-field:after{
        background-color: #ffffff;
    }

    #login-page ::-webkit-input-placeholder
    {
        font-size: 1rem;
        color: #fff!important;
    }

    #login-page :-moz-placeholder
    {
        font-size: 1rem;
        color: #fff!important;
    }

    #login-page :-ms-input-placeholder
    {
        font-size: 1rem;
        color: #fff!important;
    }


    .username{
        background-image: url("../../img/login/user.svg");
    }

    .with-icon.username.focus-state{
        background-image: url("../../img/login/user_s.svg");
    }

    .password{
        background-image: url("../../img/login/password.svg");
    }

    .with-icon.password.focus-state{
        background-image: url("../../img/login/password_s.svg");
    }

    #login-page input{
        color: #ffffff;
    }

    .forget-link{
        color: #ffffff;
        font-size: 0.875rem;
        margin-right: 16px;
        display: flex;
        justify-content: flex-end;
    }

</style>