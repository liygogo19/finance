<template>
    <f7-page class="b-part-page">
        <!-- Material Theme Navbar -->
        <f7-navbar title="添加订单" back-link="Back" sliding></f7-navbar>
        <div class="navbar-size bg-addorder font-18 hor-flex-center margin-bot-1 bg_setting font-color-5">
            <span class="margin-right-1">2/3</span>
            <span>完善房产资料</span>
        </div>
        <property-order :source="'order'"></property-order>
    </f7-page>
</template>

<script>
    import PropertyOrder from '../orderComponents/property-order.vue'

    export default{
        components:{
            PropertyOrder:PropertyOrder,
        }
    }
</script>

<style>
    .house-info-icon{
        background-image: url("../../img/order/house.svg");
    }
</style>