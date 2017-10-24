<template>
        <f7-timeline>
            <!-- <f7-timeline-item :date="addTime"  content="提交订单"></f7-timeline-item>
            <f7-timeline-item v-if="status==0||3" :class="{active:status==0}" :date="nowTime" content="审核中"></f7-timeline-item>
            <f7-timeline-item v-if="status==2" :class="{active:status==2}" :date="lastModfied" content="审核退回"></f7-timeline-item>
            <f7-timeline-item v-if="status==1||3 && status!=2 && status!=0 && status!=4" :class="{active:status==1}" :date="passTime" content="审核通过"></f7-timeline-item>
            <f7-timeline-item v-if="status==3" :class="{active:status==3}" :date="lastModfied" content="已完成"></f7-timeline-item>
            <f7-timeline-item v-if="status==4" :class="{active:status==4}" :date="lastModfied" content="否决"></f7-timeline-item> -->
            <f7-timeline-item :date="addTime"  content="提交订单"></f7-timeline-item>
            <f7-timeline-item v-for="(item , index) in list" :date="item.add_time" :content="nowState[item.status]" :class="{active:index==list.length-1}">
            </f7-timeline-item>
        </f7-timeline>
</template>

<script>
    import { mapActions,mapGetters } from 'vuex'
    import widgets_tools from 'utility/widgets_tools'
    export default{
        props:{
          addTime:{
              type:String,
              default:'2017.02.23',
          },
          list:{
            type:Array,
            default:[]
          },
          nowState:{
            type:Object,
            default:{}
          }
        }
    }
</script>