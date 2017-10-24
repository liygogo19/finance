<template>
    <form id="perfect_property_form">
        <f7-block-title class="bg-color-1 title-with-icon top-line house-info-icon title_bg font-16">房产信息</f7-block-title>
        <f7-list class="bg-color-1">
            <f7-list-item title="房产类型" class="item-link with-input with-profile-title" >
                <input type="text" name="asset_type" id="house-type" placeholder="请选择">
            </f7-list-item>
            <f7-list-item title="房产名称" class="with-input with-profile-title" >
                <input type="text" v-model.trim="asset_order_detail.asset_title" name="asset_title" placeholder="如宁波市鄞州区城南华府">
            </f7-list-item>
            <f7-list-item title="房产地址" class="with-input with-profile-title" >
                <input type="text" v-model.trim="asset_order_detail.asset_address" name="asset_address" placeholder="如宁波市鄞州区城南华府3栋1806">
            </f7-list-item>
            <f7-list-item title="建筑面积" class="with-input with-profile-title" >
                <input type="number" v-model.trim="asset_order_detail.asset_square" name="asset_square" placeholder="请输入房产面积(平方米)">
            </f7-list-item>
            <f7-list-item title="房龄" class="with-input with-profile-title" >
                <input type="number" v-model.trim="asset_order_detail.asset_age" name="asset_age" placeholder="多少年">
            </f7-list-item>
            <f7-list-item title="房产状态" class="item-link with-input with-profile-title" >
                <input type="text" name="asset_status" id="house-status" placeholder="请选择">
            </f7-list-item>
            <f7-list-item title="房产金额" class="with-input with-profile-title" >
                <input type="number" v-model.trim="asset_order_detail.asset_deal_price" name="asset_deal_price" placeholder="多少钱">
            </f7-list-item>
            <f7-list-item title="已付房款" class="with-input with-profile-title" >
                <input type="number" v-model.trim="asset_order_detail.asset_payed" name="asset_payed" placeholder="请输入买家首付款(万)">
            </f7-list-item>
        </f7-list>

        <f7-list class="bg-color-1">
            <f7-list-item title="共有房产人" class="item-link with-input with-profile-title" >
                <input type="text" name="other_owner" id="joint-owner" placeholder="是否有除配偶外的共有房产人">
            </f7-list-item>
        </f7-list>

        <f7-block>
            <f7-button v-if="source=='order'" big @click="next('/order/buyer-information/')">下一步</f7-button>
            <f7-button v-if="source!='order'" big @click="next('/order/detail/'+perfect_order_detail.ref)">确 定</f7-button>
            <f7-button v-if="source!='order'" big @click="next('/info/buyer-information/')" class="margin-top-1 bg-white color-style-green border-size-1 border-color-green">继续完善</f7-button>

        </f7-block>
    </form>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import widgets_tools from 'utility/widgets_tools'

    export default {
        props:{
            source:{
                required:true,
            }
        },
        data(){
            return {
                asset_order_detail:{
                    asset_type: '',
                    asset_title: '',
                    asset_status: '',
                    asset_address: '',
                    asset_age: '',
                    asset_deal_price: '',
                    asset_square: '',
                    asset_payed: ''
                }
            }
        },
        computed: {
            ...mapGetters({
                perfect_order_detail:'perfect_order_detail',
                config_options:'config_options',
            })
        },
        methods:{
            onF7Init:function () {
                var houseType = widgets_tools.generateOptions(this.config_options.asset.assetType);
                var houseStatus = widgets_tools.generateOptions(this.config_options.asset.assetStatus);
                var houseShare = widgets_tools.generateOptions(this.config_options.boolean.yes);

                this.f7_mobile_widgets.f7_mobile_picker(this,'#house-type',houseType.keyArray,houseType.valueArray);
                this.f7_mobile_widgets.f7_mobile_picker(this,'#house-status',houseStatus.keyArray,houseStatus.valueArray);
                this.f7_mobile_widgets.f7_mobile_picker(this,'#joint-owner',houseShare.keyArray,houseShare.valueArray);
            },
            next(url){
                this.$f7.showIndicator();
                var formData = this.$f7.formToData('#perfect_property_form');
                formData.asset_type = this.$$('#house-type').data('val');
                formData.asset_status = this.$$('#house-status').data('val');
                formData.other_owner = this.$$('#joint-owner').data('val');
                formData.order_ref=this.perfect_order_detail.ref;
                if(formData.asset_deal_price) formData.asset_deal_price*=10000;
                if(formData.asset_payed) formData.asset_payed*=10000;
                console.log('property_form',formData);
                var obj = {
                    'formData':formData,
                    '$vue':this,
                    'url':url,
                }
                this.$store.dispatch('editOrder',obj).then(res => {
                    this.$f7.hideIndicator();
                });
            }
        },
        mounted(){
            widgets_tools.deepCopy(this.asset_order_detail,this.perfect_order_detail);
            if(this.perfect_order_detail.asset_deal_price){
                this.asset_order_detail.asset_deal_price = this.perfect_order_detail.asset_deal_price/10000;
            }
            if(this.perfect_order_detail.asset_payed){
                this.asset_order_detail.asset_payed = this.perfect_order_detail.asset_payed/10000;
            }

            var houseType = widgets_tools.generateOptions(this.config_options.asset.assetType);
            var houseStatus = widgets_tools.generateOptions(this.config_options.asset.assetStatus);
            var houseShare = widgets_tools.generateOptions(this.config_options.boolean.yes);

            if(this.asset_order_detail.asset_type){
                this.$$('#house-type').val(houseType.valueArray[houseType.keyArray.indexOf(String(this.asset_order_detail.asset_type))]);
                this.$$('#house-type').data('val',this.asset_order_detail.asset_type);
            }
            if(this.asset_order_detail.asset_status){
                this.$$('#house-status').val(houseStatus.valueArray[houseStatus.keyArray.indexOf(String(this.asset_order_detail.asset_status))]);
                this.$$('#house-status').data('val',this.asset_order_detail.asset_status);
            }
            if(this.asset_order_detail.other_owner){
                this.$$('#joint-owner').val(houseShare.valueArray[houseShare.keyArray.indexOf(String(this.asset_order_detail.other_owner))]);
                this.$$('#joint-owner').data('val',this.asset_order_detail.other_owner);
            }
        }
    }
</script>