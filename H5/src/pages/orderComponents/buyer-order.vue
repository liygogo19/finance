<template>
    <form id="perfect_buyer_form" class="margin-top-1">
        <f7-block-title class="bg-color-1 title-with-icon top-line basic-info-icon title_bg font-16">基本信息</f7-block-title>
        <f7-list class="bg-color-1">
            <f7-list-item title="买家姓名" class="with-input with-profile-title" :class="{ 'form-list-error': $v.buyer_order_detail.buyer.name.$error }" >
                <input type="text"  @input="$v.buyer_order_detail.buyer.name.$touch()" name="buyer_name" v-model.trim="buyer_order_detail.buyer.name" placeholder="请输入买家姓名">
            </f7-list-item>
            <f7-list-item title="性别" class="item-link with-input with-profile-title" >
                <input type="text" name="buyer_sex" id="buyer-sex" placeholder="请选择">
            </f7-list-item>
            <f7-list-item title="身份证号" class="with-input with-profile-title" :class="{ 'form-list-error': !$v.buyer_order_detail.buyer.id_number.isId }">
                <input type="number" v-model.trim="buyer_order_detail.buyer.id_number" @input="$v.buyer_order_detail.buyer.id_number.$touch()" name="buyer_id_number" placeholder="请输入身份证号">
            </f7-list-item>
            <f7-list-item title="户籍" class="with-input with-profile-title" >
                <input type="text" v-model.trim="buyer_order_detail.buyer.household_register" name="buyer_household_register" placeholder="如浙江宁波">
            </f7-list-item>
            <f7-list-item title="婚姻状况" class="item-link with-input with-profile-title" >
                <input type="text" name="buyer_marital_status" id="buyer-marital-status" placeholder="请选择">
            </f7-list-item>
            <f7-list-item title="现居住地址" class="with-input with-profile-title" >
                <input type="text" v-model.trim="buyer_order_detail.buyer.address" name="buyer_address" placeholder="如宁波市鄞州区城南华府3栋1806">
            </f7-list-item>
            <f7-list-item title="联系电话" class="with-input with-profile-title" :class="{ 'form-list-error': $v.buyer_order_detail.buyer.phone.$error }" >
                <input type="number" v-model.trim="buyer_order_detail.buyer.phone"  @input="$v.buyer_order_detail.buyer.phone.$touch()" name="buyer_phone" placeholder="请输入联系电话">
            </f7-list-item>
            <f7-list-item title="房产按揭" class="item-link with-input with-profile-title" >
                <input id="buyer-property-mortgage" name="buyer_loan_is" type="text" placeholder="请选择">
            </f7-list-item>
            <f7-list-item v-show="showPicker" title="贷款方式" class="item-link with-input with-profile-title" >
                <input type="text" name="buyer_loan_type" id="buyer-loan-method" placeholder="请选择">
            </f7-list-item>
            <f7-list-item v-show="showPicker" title="服务提供" class="item-link with-input with-profile-title" >
                <input type="text" name="buyer_loan_service_is" id="buyer-service-provision" placeholder="是否需要我们提供按揭服务">
            </f7-list-item>
            <f7-list-item  title="个人征信" class="item-link with-input with-profile-title" >
                <input type="text" name="buyer_credit_reporting" id="buyer-personal-credit-reporting" placeholder="请选择">
            </f7-list-item>
        </f7-list>

        <f7-block-title class="bg-color-1 title-with-icon top-line work-info-icon title_bg font-16">工作信息</f7-block-title>
        <f7-list class="bg-color-1">
            <f7-list-item title="工作单位" class="with-input with-profile-title" >
                <input type="text" v-model.trim="buyer_order_detail.buyer.company_title" name="buyer_company_title" placeholder="如找饭金融信息服务有限公司">
            </f7-list-item>
            <f7-list-item title="单位地址" class="with-input with-profile-title" >
                <input type="text" v-model.trim="buyer_order_detail.buyer.company_address"  name="buyer_company_address" placeholder="如宁波市南部商务区荣安大厦B601">
            </f7-list-item>
            <f7-list-item title="工作收入" class="with-input with-profile-title" >
                <input type="number" v-model.trim="buyer_order_detail.buyer.work_income" name="buyer_work_income" placeholder="年收入(万)，选填">
            </f7-list-item>
        </f7-list>
        <f7-block>
            <f7-button v-if="source=='order'" big @click="next('/account/profile/')">确 定</f7-button>
            <f7-button v-if="source!='order'" big @click="next('/order/detail/'+perfect_order_detail.ref)">确 定</f7-button>
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
                showPicker:false,
                buyer_order_detail:{
                    buyer: {
                        name: '',
                        sex: '',
                        id_number: '',
                        household_register: '',
                        marital_status: '',
                        address: '',
                        phone: '',
                        company_title: '',
                        company_address: '',
                        work_income: '',
                        credit_reporting: '',
                        loan_is: '',
                        loan_type: '',
                        loan_service_is: ''
                    },
                },
            }
        },
        validations: {
            buyer_order_detail:{
                buyer: {
                    name: {
                        required,
                    },
                    phone: {
                        required,
                        isPhone: validatorTools.isMobilePhone,
                    },
                    id_number:{
                        isId:validatorTools.isIdentifyCard,
                    }
                },
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
                var needMortgage = widgets_tools.generateOptions(this.config_options.boolean.true);
                var loanType = widgets_tools.generateOptions(this.config_options.loan.loanType);
                var needService = widgets_tools.generateOptions(this.config_options.boolean.yes);

                this.f7_mobile_widgets.f7_mobile_picker(this,'#buyer-sex',sexType.keyArray,sexType.valueArray);
                this.f7_mobile_widgets.f7_mobile_picker(this,'#buyer-marital-status',marriageType.keyArray,marriageType.valueArray);
                this.f7_mobile_widgets.f7_mobile_picker(this,'#buyer-property-mortgage', needMortgage.keyArray,needMortgage.valueArray,true,this.changeFunc);
                this.f7_mobile_widgets.f7_mobile_picker(this,'#buyer-loan-method',loanType.keyArray,loanType.valueArray,true);
                this.f7_mobile_widgets.f7_mobile_picker(this,'#buyer-service-provision',needService.keyArray,needService.valueArray);
                this.f7_mobile_widgets.f7_mobile_picker(this,'#buyer-personal-credit-reporting',needService.keyArray,needService.valueArray);
            },
            next(url){
                this.$f7.showIndicator();
                var formData = this.$f7.formToData('#perfect_buyer_form');
                formData.buyer_sex = this.$$('#buyer-sex').data('val');
                formData.buyer_marital_status = this.$$('#buyer-marital-status').data('val');
                formData.buyer_credit_reporting = this.$$('#buyer-personal-credit-reporting').data('val');
                var mortgageVal = Number(this.$$('#buyer-property-mortgage').data('val'));
                if(mortgageVal){
                    formData.buyer_loan_is = mortgageVal;
                    formData.buyer_loan_service_is = this.$$('#buyer-service-provisionn').data('val');
                    formData.buyer_loan_type = this.$$('#buyer-loan-method').data('val');
                }
                else{
                    formData.buyer_loan_is = mortgageVal;
                    delete formData.buyer_loan_service_is;
                    delete formData.buyer_loan_type;
                }
                formData.order_ref=this.perfect_order_detail.ref;
                if(formData.buyer_work_income) formData.buyer_work_income*=10000;
                var obj = {
                    'formData':formData,
                    '$vue':this,
                    'url':url,
                }
                this.$store.dispatch('editOrder',obj).then(res => {
                    this.$f7.hideIndicator();
                });
            },
            changeFunc(p,values,displayValues){
                var realVal = values[0];
                if(Number(realVal)){
                    this.showPicker =true;
                } else {
                    this.showPicker =false;
                }
            }
        },
        mounted(){
            widgets_tools.deepCopy(this.buyer_order_detail,this.perfect_order_detail);
            if(this.perfect_order_detail.buyer.work_income){
                this.buyer_order_detail.buyer.work_income = this.perfect_order_detail.buyer.work_income/10000;
            }

            var needMortgage = widgets_tools.generateOptions(this.config_options.boolean.true);
            var loanType = widgets_tools.generateOptions(this.config_options.loan.loanType);
            var needService = widgets_tools.generateOptions(this.config_options.boolean.yes);
            var sexType = widgets_tools.generateOptions(this.config_options.people.sex);

            this.buyerName = this.perfect_order_detail.buyer.name;
            this.buyerPhone = this.perfect_order_detail.buyer.phone;
            var is_loan = this.perfect_order_detail.buyer.loan_is;
            var loan_type = this.perfect_order_detail.buyer.loan_type;
            var loan_service_is = this.perfect_order_detail.buyer.loan_service_is;
            if(is_loan){
                this.showPicker = true;
                var rightIndex = needMortgage.keyArray.indexOf(String(is_loan));
                var rightVal = needMortgage.valueArray[rightIndex];
                this.$$('#buyer-property-mortgage').val(rightVal);
                this.$$('#buyer-property-mortgage').data('val',is_loan);
                this.$$('#buyer-loan-method').val(loanType.valueArray[loanType.keyArray.indexOf(String(loan_type))]);
                this.$$('#buyer-loan-method').data('val',loan_type);
                this.$$('#buyer-service-provision').val(needService.valueArray[needService.keyArray.indexOf(String(loan_service_is))]);
                this.$$('#buyer-service-provision').data('val',loan_service_is);
            }

            if(this.buyer_order_detail.buyer.sex){
                this.$$('#buyer-sex').val(sexType.valueArray[sexType.keyArray.indexOf(String(this.buyer_order_detail.buyer.sex))]);
                this.$$('#buyer-sex').data('val',this.buyer_order_detail.buyer.sex);
            }
            if(this.buyer_order_detail.buyer.marital_status){
                this.$$('#buyer-marital-status').val(marriageType.valueArray[marriageType.keyArray.indexOf(String(this.buyer_order_detail.buyer.marital_status))]);
                this.$$('#buyer-marital-status').data('val',this.buyer_order_detail.buyer.marital_status);
            }
            if(this.buyer_order_detail.buyer.credit_reporting){
                this.$$('#buyer-personal-credit-reporting').val(consumerCredit.valueArray[consumerCredit.keyArray.indexOf(String(this.buyer_order_detail.buyer.credit_reporting))]);
                this.$$('#buyer-personal-credit-reporting').data('val',this.buyer_order_detail.buyer.credit_reporting);
            }

        }
    }
</script>