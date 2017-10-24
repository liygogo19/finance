<template>
    <f7-page class="b-part-page" >
        <!-- Material Theme Navbar -->
        <f7-navbar title="完善买家资料" back-link="Back" sliding></f7-navbar>
        <BuyerOrder :source="'info'"></BuyerOrder>
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