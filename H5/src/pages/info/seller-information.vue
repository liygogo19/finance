<template>
    <f7-page class="b-part-page">
        <!-- Material Theme Navbar -->
        <f7-navbar title="完善卖家信息" back-link="Back" sliding></f7-navbar>
        <SellerOrder :source="'info'"></SellerOrder>
    </f7-page>
</template>

<script>
    import SellerOrder from '../orderComponents/seller-order.vue'

    export default {
        components:{
            SellerOrder:SellerOrder,
        }
    }
</script>

<style>

</style>