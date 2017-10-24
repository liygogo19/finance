<template>
    <f7-page class="b-part-page">
        <!-- Material Theme Navbar -->
        <f7-navbar title="添加订单" back-link="Back" sliding></f7-navbar>
        <form id="addOrder_form">
            <f7-list class="bg-color-1">
                <f7-list-item title="卖家姓名" class="with-input with-profile-title" :class="{ 'form-list-error': $v.sellerName.$error }">
                    <input type="text" @input="$v.sellerName.$touch()" v-model.trim="sellerName" name="seller_name" placeholder="请输入卖家姓名">
                </f7-list-item>
                <f7-list-item title="卖家电话" class="with-input with-profile-title" :class="{ 'form-list-error': $v.sellerPhone.$error }" >
                    <input type="number"  @input="$v.sellerPhone.$touch()" name="seller_phone" v-model.trim="sellerPhone" placeholder="请输入卖家电话">
                </f7-list-item>
                <f7-list-item title="房产价格" class="with-input with-profile-title" :class="{ 'form-list-error': $v.housePrice.$error }" >
                    <input type="number"  @input="$v.housePrice.$touch()" name="asset_deal_price" v-model.trim="housePrice" placeholder="请输入房产成交价格(万)">
                </f7-list-item>
                <f7-list-item title="借款金额" class="with-input with-profile-title" :class="{ 'form-list-error': $v.loanMoney.$error }" >
                    <input type="number"  @input="$v.loanMoney.$touch()" name="loan_money" v-model.trim="loanMoney" placeholder="请输入赎楼金额(万)">
                </f7-list-item>
                <f7-list-item title="还款时间" class="item-link with-input with-profile-title" >
                    <input id="bank-paytime-demo" name="loan_repayment_period" type="text" placeholder="请选择银行还款时间(选填)">
                </f7-list-item>
                <f7-list-item title="还款银行" class="with-input with-profile-title" :class="{ 'form-list-error': $v.payBackBank.$error }">
                    <input type="text" id="repayment-bank"  @input="$v.payBackBank.$touch()" v-model.trim="payBackBank" name="loan_repayment_bank" placeholder="请选择还款银行">
                </f7-list-item>
                <f7-list-item title="支行" class="with-input with-profile-title" :class="{ 'form-list-error': $v.payBackBranch.$error }" >
                    <input type="text"   @input="$v.payBackBranch.$touch()" name="paybackBranch" v-model.trim="payBackBranch" placeholder="请输入还款支行，如">
                </f7-list-item>
            </f7-list>
            <f7-list class="bg-color-1">
                <f7-list-item title="买家姓名" class="with-input with-profile-title" :class="{ 'form-list-error': $v.buyerName.$error }" >
                    <input type="text"  @input="$v.buyerName.$touch()" name="buyer_name" v-model.trim="buyerName" placeholder="请输入买家姓名">
                </f7-list-item>
                <f7-list-item title="买家电话" class="with-input with-profile-title" :class="{ 'form-list-error': $v.buyerPhone.$error }" >
                    <input type="number"  @input="$v.buyerPhone.$touch()" name="buyer_phone" v-model.trim="buyerPhone" placeholder="请输入买家电话">
                </f7-list-item>
                <f7-list-item title="房产按揭" class="item-link with-input with-profile-title" >
                    <input id="property-mortgage" name="buyer_loan_is" type="text" placeholder="请选择">
                </f7-list-item>
                <f7-list-item v-show="showPicker" title="贷款方式" class="item-link with-input with-profile-title" >
                    <input type="text" id="loan-method" name="buyer_loan_type" placeholder="请选择">
                </f7-list-item>
                <f7-list-item v-show="showPicker" title="服务提供" class="item-link with-input with-profile-title" >
                    <input type="text" id="service-provision" name="buyer_loan_service_is" placeholder="是否需要我们提供按揭服务">
                </f7-list-item>
            </f7-list>
            <f7-list class="bg-color-1">
                <f7-list-item title="所属门店" class="item-link with-input with-profile-title" >
                    <input type="text" id="stores-owned" name="store_ref" placeholder="请选择">
                </f7-list-item>
            </f7-list>
            <f7-block>
                <f7-button big @click="submitForm">提交订单</f7-button>
            </f7-block>
        </form>
    </f7-page>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import { required, minLength, maxLength, between, sameAs } from 'vuelidate/lib/validators'
    import validatorTools from 'utility/customizedValidation'
    var validator = require('validator');
    import widgets_tools from 'utility/widgets_tools'

    export default {
        computed: {
            ...mapGetters({
                config_options:'config_options',
                user_info:'user_info'
            })
        },
        data(){
            return {
                showPicker:false,
                sellerName:'小林',
                sellerPhone:'13232222222',
                housePrice:'345',
                loanMoney:'50',
                payBackTime:'',
                payBackBank:'工商银行',
                payBackBranch:'荣安支行',
                buyerName:'啵啵',
                buyerPhone:'13876543456',
            }
        },
        validations: {
            sellerName: {
                required,
            },
            sellerPhone: {
                required,
                isPhone: validatorTools.isMobilePhone,
            },
            housePrice:{
                required,
                between: between(10, 1000)
            },
            loanMoney:{
                required,
                between: between(10, 1000)
            },
            payBackBank:{
                required,
            },
            payBackBranch:{
                required,
            },
            buyerName:{
                required,
            },
            buyerPhone:{
                required,
                isPhone: validatorTools.isMobilePhone,
            },
        },
        methods:{
            onF7Init:function () {
                var needMortgage = widgets_tools.generateOptions(this.config_options.boolean.true);
                var loanType = widgets_tools.generateOptions(this.config_options.loan.loanType);
                var needService = widgets_tools.generateOptions(this.config_options.boolean.yes);
                var storeList = widgets_tools.generateStoreOptions(this.user_info.store);

                this.f7_mobile_widgets.f7_mobile_calendar(this,'#bank-paytime-demo');
                this.f7_mobile_widgets.f7_mobile_picker(this,'#property-mortgage', needMortgage.keyArray,needMortgage.valueArray,true,this.changeFunc);
                this.f7_mobile_widgets.f7_mobile_picker(this,'#loan-method', loanType.keyArray,loanType.valueArray,true);
                this.f7_mobile_widgets.f7_mobile_picker(this,'#service-provision', needService.keyArray,needService.valueArray);
                this.f7_mobile_widgets.f7_mobile_picker(this,'#stores-owned',storeList.keyArray,storeList.valueArray,true);
            },
            submitForm(){
                this.$v.$touch();
                if(!this.$v.$error){
                    this.$f7.showIndicator();
                    var formData = this.$f7.formToData('#addOrder_form');
                    if(!formData.loan_repayment_period){
                        delete formData.loan_repayment_period;
                    }
                    var mortgageVal = Number(this.$$('#property-mortgage').data('val'));
                    if(mortgageVal){
                        formData.buyer_loan_is = mortgageVal;
                        formData.buyer_loan_service_is = this.$$('#service-provision').data('val');
                        formData.buyer_loan_type = this.$$('#loan-method').data('val');
                    }
                    else{
                        formData.buyer_loan_is = mortgageVal;
                        delete formData.buyer_loan_service_is;
                        delete formData.buyer_loan_type;
                    }
                    formData.store_ref = this.$$('#stores-owned').data('val');
                    formData.loan_money = parseFloat(this.loanMoney)*10000;
                    formData.asset_deal_price = parseFloat(this.housePrice)*10000;
                    var obj = {
                        'formData':formData,
                        '$vue':this,
                    }
                    console.log(obj);
                    this.$store.dispatch('addOrder',obj).then(response => {
                            this.$f7.hideIndicator();
                    });
                }
            },
            changeFunc(p,values,displayValues){
                var realVal = values[0];
                if(Number(realVal)){
                    this.showPicker =true;
                } else {
                    this.showPicker =false;
                }
            }
        }
    }
</script>

<style>


</style>
