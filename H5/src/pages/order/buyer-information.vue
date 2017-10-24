<template>
    <f7-page class="b-part-page" >
        <!-- Material Theme Navbar -->
        <f7-navbar title="添加订单" back-link="Back" sliding></f7-navbar>
        <div class="navbar-size bg-addorder font-18 hor-flex-center bg_setting font-color-5">
            <span class="margin-right-1">3/3</span>
            <span>完善买家资料</span>
        </div>
        <BuyerOrder :source="'order'"></BuyerOrder>
    </f7-page>
</template>

<script>
    import BuyerOrder from '../orderComponents/buyer-order.vue'

    export default{
        components:{
            BuyerOrder:BuyerOrder,
        }
    }
</script>