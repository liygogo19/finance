<template>
    <f7-list id="all_state_options" class="no-margin no-before-content">
        <f7-list-item @click="toggle_filter({title:'所有状态',key:'',})" class="option_active" title="所有状态"><div class="option_checked img-5-4 icon_setting"></div></f7-list-item>
        <template v-for="(value, key, index) in config_options.order.orderStatus">
            <f7-list-item @click="toggle_filter(value)" :title="value.title"><div class="option_checked img-5-4 icon_setting"></div></f7-list-item>
        </template>
    </f7-list>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                config_options:'config_options'
            })
        },
        data(){
            return{
                checked:true,
            }
        },
        mounted(){
            $('#all_state_options ul li').click(function () {
                $('#all_state_options ul li').removeClass('option_active');
                $(this).addClass('option_active');
            });
        },
        methods:{
            toggle_filter(value){
               this.$emit('changeStateOption',value);
            }
        }
    }
</script>

<style>
    .option_active{
        color: #00a299;
    }

    .option_active .option_checked{
        background-image: url("../../../img/profile/gou.svg");
    }
</style>