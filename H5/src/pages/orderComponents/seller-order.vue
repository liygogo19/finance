<template>
    <form  id="perfect_seller_form" class="margin-top-1">
        <f7-block-title class="bg-color-1 title-with-icon top-line basic-info-icon title_bg font-16">基本信息</f7-block-title>
        <f7-list  class="bg-color-1">
            <!--<f7-list class="bg-color-1">-->
            <f7-list-item title="卖家姓名" class="with-input with-profile-title" :class="{ 'form-list-error': $v.sellerOrderDetail.seller.name.$error }">
                <input type="text" @input="$v.sellerOrderDetail.seller.name.$touch()" v-model.trim="sellerOrderDetail.seller.name" name="seller_name" placeholder="请输入卖家姓名">
            </f7-list-item>
            <f7-list-item  title="性别" class="item-link with-input with-profile-title" >
                <input type="text" id="seller-sex" name="seller_sex" placeholder="请选择">
            </f7-list-item>
            <f7-list-item title="身份证号" class="with-input with-profile-title" :class="{ 'form-list-error': !$v.sellerOrderDetail.seller.id_number.isId }">
                <input type="number" @input="$v.sellerOrderDetail.seller.id_number.$touch()" v-model.trim="sellerOrderDetail.seller.id_number" name="seller_id_number" placeholder="请输入身份证号">
            </f7-list-item>
            <f7-list-item title="户籍" class="with-input with-profile-title" >
                <input type="text" name="seller_household_register" v-model.trim="sellerOrderDetail.seller.household_register" placeholder="如浙江宁波">
            </f7-list-item>
            <f7-list-item  title="婚姻状况" class="item-link with-input with-profile-title" >
                <input type="text" name="seller_marital_status" id="marital-status" placeholder="请选择">
            </f7-list-item>
            <f7-list-item title="现居住地址" class="with-input with-profile-title" >
                <input type="text" name="seller_address" v-model.trim="sellerOrderDetail.seller.address" placeholder="如宁波市鄞州区城南华府3栋1806">
            </f7-list-item>
            <f7-list-item title="联系电话" class="with-input with-profile-title" :class="{ 'form-list-error': $v.sellerOrderDetail.seller.phone.$error }" >
                <input type="number"  @input="$v.sellerOrderDetail.seller.phone.$touch()" name="seller_phone" v-model.trim="sellerOrderDetail.seller.phone" placeholder="请输入联系电话">
            </f7-list-item>
            <f7-list-item title="借款金额" class="with-input with-profile-title" :class="{ 'form-list-error': $v.sellerOrderDetail.loan_money.$error }" >
                <input type="number"  @input="$v.sellerOrderDetail.loan_money.$touch()" name="loan_money" v-model.trim="sellerOrderDetail.loan_money" placeholder="请输入赎楼金额(万)">
            </f7-list-item>
            <f7-list-item title="还款时间" class="item-link with-input with-profile-title" >
                <input  type="text" id="bank-paytime-seller" name="loan_repayment_period" placeholder="请选择银行还款时间(选填)">
            </f7-list-item>
            <f7-list-item title="还款银行" class="with-input with-profile-title" :class="{ 'form-list-error': $v.sellerOrderDetail.loan_repayment_bank.$error }">
                <input type="text" id="repayment-bank"  @input="$v.sellerOrderDetail.loan_repayment_bank.$touch()" v-model.trim="sellerOrderDetail.loan_repayment_bank" name="loan_repayment_bank" placeholder="请选择还款银行">
            </f7-list-item>
            <f7-list-item title="个人征信" class="item-link with-input with-profile-title" >
                <input type="text" name="seller_credit_reporting" id="personal-credit-reporting" placeholder="请选择">
            </f7-list-item>



        </f7-list>

        <f7-block-title class="bg-color-1 title-with-icon top-line work-info-icon title_bg ">工作信息</f7-block-title>
        <f7-list class="bg-color-1">
            <f7-list-item title="工作单位" class="with-input with-profile-title" >
                <input name="seller_company_title" v-model.trim="sellerOrderDetail.seller.company_title" type="text" placeholder="如找饭金融信息服务有限公司">
            </f7-list-item>
            <f7-list-item title="单位地址" class="with-input with-profile-title" >
                <input name="seller_company_address" v-model.trim="sellerOrderDetail.seller.company_address" type="text" placeholder="如宁波市南部商务区荣安大厦B601">
            </f7-list-item>
            <f7-list-item title="工作收入" class="with-input with-profile-title" >
                <input name="seller_work_income" v-model.trim="sellerOrderDetail.seller.work_income" type="number" placeholder="年收入(万)，选填">
            </f7-list-item>
        </f7-list>

        <f7-block-title class="bg-color-1 title-with-icon top-line marry-info-icon title_bg font-16">配偶信息</f7-block-title>
        <f7-list class="bg-color-1">
            <f7-list-item title="配偶姓名" class="with-input with-profile-title" >
                <input name="seller_spouse_name" v-model.trim="sellerOrderDetail.sellerSpouse.name" type="text" placeholder="请输入配偶的姓名">
            </f7-list-item>
            <f7-list-item title="身份证号" class="with-input with-profile-title" :class="{ 'form-list-error': $v.sellerOrderDetail.sellerSpouse.id_number.$error }">
                <input name="seller_spouse_id_number" type="number" @input="$v.sellerOrderDetail.sellerSpouse.id_number.$touch()" v-model.trim="sellerOrderDetail.sellerSpouse.id_number" placeholder="请输入配偶的身份证号">
            </f7-list-item>
            <f7-list-item title="联系电话" class="with-input with-profile-title" :class="{ 'form-list-error': $v.sellerOrderDetail.sellerSpouse.phone.$error }">
                <input name="seller_spouse_phone" type="number" @input="$v.sellerOrderDetail.sellerSpouse.phone.$touch()" v-model.trim="sellerOrderDetail.sellerSpouse.phone" placeholder="请输入配偶的联系电话">
            </f7-list-item>
        </f7-list>

        <f7-block>
            <f7-button v-if="source=='order'" big @click="next('/order/property-information/')">下一步</f7-button>
            <f7-button v-if="source!='order'" big @click="next('/order/detail/'+perfect_order_detail.ref)">确 定</f7-button>
            <f7-button v-if="source!='order'" big @click="next('/info/property-information/')" class="margin-top-1 bg-white color-style-green border-size-1 border-color-green">继续完善</f7-button>
        </f7-block>
    </form>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import { required, minLength, maxLength, between, sameAs } from 'vuelidate/lib/validators'
    import validatorTools from 'utility/customizedValidation'
    var validator = require('validator');
    import widgets_tools from 'utility/widgets_tools'

    export default {
        props:{
          source:{
              required:true,
          }
        },
        data(){
            return {
                test:false,
                sellerOrderDetail:{
                    loan_money:'',
                    loan_repayment_period:'',
                    loan_repayment_bank:'',
                    seller:{
                        name:'',
                        phone:'',
                        id_number:'',
                        sex: '',
                        household_register: '',
                        marital_status: '',
                        address: '',
                        company_title: '',
                        company_address: '',
                        work_income: '',
                        credit_reporting: '',
                        loan_is: '',
                        loan_type: '',
                        loan_service_is: ''
                    },
                    sellerSpouse:{
                        name:'',
                        phone:'',
                        id_number:'',
                    }
                },

            }
        },
        validations: {
            sellerOrderDetail:{
                loan_money:{
                    required,
                    between: between(10, 1000)
                },
                loan_repayment_bank:{
                    required,
                },
                seller:{
                    name:{
                        required,
                    },
                    phone:{
                        required,
                        isPhone: validatorTools.isMobilePhone,
                    },
                    id_number:{
                        isId:validatorTools.isIdentifyCard,
                    }
                },
                sellerSpouse:{
                    phone:{
                        isPhone: validatorTools.optionalIsPhone,
                    },
                    id_number:{
                        isId:validatorTools.isIdentifyCard,
                    }
                }
            },
        },
        computed: {
            ...mapGetters({
                perfect_order_detail:'perfect_order_detail',
                config_options:'config_options',
            })
        },
        methods:{
            onF7Init:function () {
                var sexType = widgets_tools.generateOptions(this.config_options.people.sex);
                var marriageType = widgets_tools.generateOptions(this.config_options.people.maritalStatus);
                var consumerCredit = widgets_tools.generateOptions(this.config_options.boolean.yes);
                this.f7_mobile_widgets.f7_mobile_picker(this,'#seller-sex', sexType.keyArray,sexType.valueArray);
                this.f7_mobile_widgets.f7_mobile_calendar(this,'#bank-paytime-seller');
                this.f7_mobile_widgets.f7_mobile_picker(this,'#marital-status', marriageType.keyArray,marriageType.valueArray);
                this.f7_mobile_widgets.f7_mobile_picker(this,'#personal-credit-reporting',consumerCredit.keyArray,consumerCredit.valueArray);
            },
            next(url){
                this.$v.$touch();
                if(!this.$v.$error){
                    this.$f7.showIndicator();
                    var formData = this.$f7.formToData('#perfect_seller_form');
                    formData.seller_sex = this.$$('#seller-sex').data('val');
                    formData.seller_marital_status = this.$$('#marital-status').data('val');
                    formData.seller_credit_reporting = this.$$('#personal-credit-reporting').data('val');
                    formData.order_ref=this.perfect_order_detail.ref;
                    if(formData.loan_money) formData.loan_money*=10000;
                    if(formData.seller_work_income) formData.seller_work_income*=10000;
                    console.log('#$#',formData);
                    var obj = {
                        'formData':formData,
                        '$vue':this,
                        'url':url,
                    }
                    this.$store.dispatch('editOrder',obj).then(res => {
                        this.$f7.hideIndicator();
                    });
                }
            }
        },
        mounted(){
            var sexType = widgets_tools.generateOptions(this.config_options.people.sex);
            var marriageType = widgets_tools.generateOptions(this.config_options.people.maritalStatus);
            var consumerCredit = widgets_tools.generateOptions(this.config_options.boolean.yes);
            widgets_tools.deepCopy(this.sellerOrderDetail,this.perfect_order_detail);
            if(this.perfect_order_detail.loan_money){
                this.sellerOrderDetail.loan_money = this.perfect_order_detail.loan_money/10000;
            }
            if(this.sellerOrderDetail.seller_work_income){
                this.sellerOrderDetail.seller_work_income = this.perfect_order_detail.seller_work_income/10000;
            }
            var paybackTime = this.sellerOrderDetail.loan_repayment_period;
            if(paybackTime){
                this.$$('#bank-paytime-seller').val(paybackTime);
            }
            if(this.sellerOrderDetail.seller.sex){
                this.$$('#seller-sex').val(sexType.valueArray[sexType.keyArray.indexOf(String(this.sellerOrderDetail.seller.sex))]);
                this.$$('#seller-sex').data('val',this.sellerOrderDetail.seller.sex);
            }
            if(this.sellerOrderDetail.seller.marital_status){
                this.$$('#marital-status').val(marriageType.valueArray[marriageType.keyArray.indexOf(String(this.sellerOrderDetail.seller.marital_status))]);
                this.$$('#marital-status').data('val',this.sellerOrderDetail.seller.marital_status);
            }
            if(this.sellerOrderDetail.seller.credit_reporting){
                this.$$('#personal-credit-reporting').val(consumerCredit.valueArray[consumerCredit.keyArray.indexOf(String(this.sellerOrderDetail.seller.credit_reporting))]);
                this.$$('#personal-credit-reporting').data('val',this.sellerOrderDetail.seller.credit_reporting);
            }
        }
    }
</script>