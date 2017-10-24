<template>
    <f7-list id="all_store_options" class="no-margin no-before-content">
        <template v-for="(item,key) in user_info.store">
            <f7-list-item @click="toggle_filter(item)" :class="{
                    option_active:item.ref == (store_ref ? store_ref : user_info.store[0].ref)
                }" :title="item.name">
                <!-- 上面的三目运算符：如果store_ref（门店id）存在那么item.ref等于这个id，如果不存在那么使用user_info（所有数据的第一个ref值） -->
                <div class="option_checked img-5-4 icon_setting"></div>
                
            </f7-list-item>
        </template>
    </f7-list>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'

    export default {
        data(){
            return{
                checked:true,
                /*store_ref 是门店的id 通过判断这个id来匹配select中哪一选项(例如鄞州一号)高亮*/
                store_ref:this.$route.params.storeId
            }
        },
        computed:{
            ...mapGetters({
                config_options:'config_options',
                user_info:'user_info'
            })
        },
        mounted(){
            var $vue = this;
            $('#all_store_options ul li').click(function () {
                $('#all_store_options ul li').removeClass('option_active');
                $(this).addClass('option_active');
                //console.log($vue.$route.params.storeId);
            });
        },
        methods:{
            toggle_filter(item){
                this.$emit('changeStoreOption',this.copyObject(item));
            },
            copyObject:function (item) {
                var res = {};
                for(var key in item){
                    res[key] = item[key];
                }
                return res;
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