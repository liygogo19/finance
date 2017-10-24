<template>
    <f7-list id="all_sort_options" class="no-margin no-before-content">
        <f7-list-item @click="toggle_filter(0)" class="option_active" :title=title[0]><div class="option_checked img-5-4 icon_setting"></div></f7-list-item>
        <f7-list-item @click="toggle_filter(1)" :title=title[1]><div class="option_checked img-5-4 icon_setting"></div></f7-list-item>
        <f7-list-item @click="toggle_filter(2)" :title=title[2]><div class="option_checked img-5-4 icon_setting"></div></f7-list-item>
        <f7-list-item @click="toggle_filter(3)" :title=title[3]><div class="option_checked img-5-4 icon_setting"></div></f7-list-item>
        <f7-list-item @click="toggle_filter(4)" :title=title[4]><div class="option_checked img-5-4 icon_setting"></div></f7-list-item>
    </f7-list>
</template>

<script>
    export default {
        props:['$vue'],
        data(){
            return{
                checked:true,
                title:['默认排序','成交总金额从高到低','成交总金额从低到高','成交量从高到低','成交量从低到高']
            }
        },
        mounted(){
            $('#all_sort_options ul li').click(function () {
                $('#all_sort_options ul li').removeClass('option_active');
                $(this).addClass('option_active');
            });
        },
        methods:{
            toggle_filter(index){
                var sort = {'sort':'','order':'','title':this.title[0]};
                switch (index){
                    case 1:
                        sort.sort = 'order_money';
                        sort.order = 'desc';
                        sort.title = this.title[1];
                        break;
                    case 2:
                        sort.sort = 'order_money';
                        sort.order = 'asc';
                        sort.title = this.title[2];
                        break;
                    case 3:
                        sort.sort = 'order_count';
                        sort.order = 'desc';
                        sort.title = this.title[3];
                        break;
                    case 4:
                        sort.sort = 'order_count';
                        sort.order = 'asc';
                        sort.title = this.title[4];
                        break;
                    default:
                        sort.sort = '';
                        sort.order = '';
                        sort.title = this.title[0];
                }
                this.$emit('changeSortOption',sort);
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