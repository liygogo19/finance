<template>
    <f7-page class="b-part-page">
        <!-- Material Theme Navbar -->
        <f7-navbar title="完善房产信息" back-link="Back" sliding></f7-navbar>

        <property-order :source="'info'"></property-order>
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

</style>