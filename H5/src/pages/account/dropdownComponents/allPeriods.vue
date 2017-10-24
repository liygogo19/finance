<template>
   <div class="no-margin no-before-content height-100 bg-color-2" id="calendar-inline-page">
       <div id="calendar-inline-container">
       </div>
       <div class="hor-flex-center bg-color-1 bar-bot-zone at-bottom width-100">
           <div class="flex-1 hor-flex-center font-color-2" @click="resetDate"><div class="form_bg">重置</div></div>
           <div class="flex-3 bg-color-4 hor-flex-center font-color-5" @click="comfirmDate"><div class="form_bg">确定</div></div>
       </div>
   </div>
</template>

<script>
    export default {
        data(){
            return{
                checked:true,
                calendarInput:'',
                calendarInline:'',
            }
        },
        mounted(){
            this.calendarInline = this.$f7.calendar({
                container: '#calendar-inline-container',
                input: '#calendar-input',
                rangePicker:true,
                header:false,
                firstDay:0,
                yearPicker:false,
                monthPickerTemplate:'<div class="picker-calendar-month-picker customizd_month_picker"><a href="#" class="link icon-only color-red picker-calendar-prev-month left-angle icon_setting bg-size-40"></a><div class="font-20 font-color-1"><span class="current-month-value"></span> <span class="current-year-value"></span></div><a href="#" class="link icon-only picker-calendar-next-month right-angle icon_setting bg-size-40"></a></div>',
//                toolbarCloseText:'完成',
                footer:false,
                monthNames:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                monthNamesShort:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                dayNames:['日','一','二','三','四','五','六',],
                dayNamesShort:['日','一','二','三','四','五','六',],
                disabled: {
                    from: new Date()
                },
            });
        },
        methods:{
            transformDate(time){
                var year = time.getFullYear();
                var month = time.getMonth()+1;
                var date = time.getDate()+1;
                if(month<10){
                    month = '0'+month;
                }
                if(date<10){
                    date = '0'+date;
                }
                return year+'-'+month+'-'+date;
            },
            resetDate(){
                this.calendarInline.setValue([]);
            },
            comfirmDate(){
                var dayArray = this.calendarInline.value;
                var timeOption ={};
                if(!dayArray || dayArray.length!=2){
                    this.resetDate();
                    timeOption = {
                        title:'所有时间',
                        start_time:null,
                        end_time:null
                    };
                }
                else {
                    var startDay = dayArray[0];
                    var endDay = dayArray[1];
                    startDay = this.transformDate(startDay);
                    endDay = this.transformDate(endDay);
                    timeOption = {
                        title:startDay+' 至 '+endDay,
                        start_time:startDay,
                        end_time:endDay
                    }
                }
                this.$emit('changePeriodsOption',timeOption);
            }
        }
    }
</script>

<style>

    #calendar-inline-page .picker-calendar.picker-modal-inline{
       height: 420px;
    }

    #calendar-inline-page .picker-calendar-range .picker-calendar-day.picker-calendar-day-selected span{
        width: 36px;
        border-radius: 50%;
    }

    .customizd_month_picker{
        max-width: none!important;
        width: 100%!important;
    }

    #calendar-inline-page .picker-modal .toolbar,#calendar-inline-page .picker-modal .picker-modal-inner, #calendar-inline-page .picker-modal .toolbar-inner{
        background-color: #f2f2f2;
    }

    /*#calendar-inline-page .picker-calendar-day.picker-calendar-day-selected:first-child span{*/
        /*background-color: #ff2d55;*/
    /*}*/

    #calendar-inline-page .picker-modal .picker-calendar-day.picker-calendar-day-prev{
        color: #333;
    }


    .left-angle{
        background-image: url("../../../img/profile/left.svg");
    }

    .right-angle{
        background-image: url("../../../img/profile/right.svg");
    }

    .at-bottom{
        /*margin-top: 1rem;*/
    }

    #calendar-inline-page .picker-calendar-day.picker-calendar-day-disabled{
        color: #d4d4d4!important;
    }
</style>