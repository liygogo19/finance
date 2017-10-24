<template>
    <f7-page class="b-part-page" >
        <!-- Material Theme Navbar -->
        <f7-navbar>
            <f7-link href="/account/profile/" class="icon-only link icon-only">
                <i class="icon icon-back"></i>
            </f7-link>
            <f7-nav-center>添加订单</f7-nav-center>
        </f7-navbar>
        <div class="navbar-size bg-addorder font-18 hor-flex-center bg_setting font-color-5">
            <span class="margin-right-1">1/3</span>
            <span>完善卖家资料</span>
        </div>
        <SellerOrder :source="'order'"></SellerOrder>
    </f7-page>
</template>

<script>
    import SellerOrder from '../orderComponents/seller-order.vue'

    export default{
        components:{
            SellerOrder:SellerOrder,
        }
    }
</script>

<style>
    .bg-addorder{
        background-image: url("../../img/bg/bg_addorder@1x.png");
    }

    .basic-info-icon{
        background-image: url("../../img/order/information.svg");
    }

    .work-info-icon{
        background-image: url("../../img/order/work.svg");
    }

    .marry-info-icon{
        background-image: url("../../img/order/marry.svg");
    }
</style>