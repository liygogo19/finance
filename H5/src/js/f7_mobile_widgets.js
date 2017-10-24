/**
 * Created by liyang on 2017/4/17.
 */

var f7_mobile_widgets = {



    'f7_mobile_picker': function ($vue, idd, values, displayValues,chosen,changeFunc) {


        chosen = chosen || false;
        $vue.$f7.picker({
            input: idd,
            rotateEffect: true,
            overlay:true,
            toolbarTemplate: '<div class="toolbar">' +
            '<div class="toolbar-inner">' +
            '<div class="left">' +
            '<a href="#" class="toolbar-cancell">取消</a>' +
            '</div>' +
            '<div class="right">' +
            '<a href="#" class="close-picker">确认</a>' +
            '</div>' +
            '</div>' +
            '</div>',
            cols: [{
                values:values,
                displayValues:displayValues
            }],
            value:chosen?values:false,
            onOpen: function (picker) {
                $vue.$$('.overlay_cover').addClass('active');
                picker.container.find('.close-picker').on('click', function () {
                    picker.close();
                });
                picker.container.find('.toolbar-cancell').on('click', function () {
                    picker.close();
                });
            },
            formatValue:function (p,values,displayValues) {
                $vue.$$(idd).data('val',values[0]);
                return displayValues[0];
            },
            onChange:function (p,values,displayValues) {
                if(changeFunc){
                    changeFunc(p,values,displayValues);
                }
                else {
                    return;
                }
            },
            onClose: function () {
                $vue.$$('.overlay_cover').removeClass('active');
            }
        });
    },
    'f7_mobile_tele': function ($vue, id) {
        $(document).off('click', id);
        $(document).on('click', id, function () {
            var phoneNum = $(this).attr('tele');
            var agentPhone = phoneNum.split('');
            if(agentPhone[0]==1)
            {
                agentPhone.splice(3, 0, '-');
                agentPhone.splice(8, 0, '-');
            }
            agentPhone = agentPhone.join('');

            $vue.tele = phoneNum;
            $vue.$f7.modal({
                title: '是否拨打客服电话',
                text: agentPhone,
                buttons: [
                    {
                        text: '取消',
                        onClick: function () {
                            return;
                        }
                    },
                    {
                        text: '确认',
                        onClick: function () {

                            window.location.href = 'tel://' + $vue.tele;
                        }
                    }
                ]
            });
        })

    },
    'f7_mobile_calendar':function ($vue,id) {
        $vue.$f7.calendar({
            headerPlaceholder:'选择日期',
            input:id,
            minDate:new Date(),
            toolbarCloseText:'完成',
            monthNames:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            monthNamesShort:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            dayNames:['日','一','二','三','四','五','六',],
            dayNamesShort:['日','一','二','三','四','五','六',],
        });
    },
    'f7_mobile_captcha': function ($vue, id) {
        $(document).off('click', id);
        $(document).on('click', id, function () {
            $vue.$f7.modal({
                title: '<div class="captcha_container"></div>',
                text:  '<div class="captcha_form"><input type="text" class="captcha_input"><input class="captcha_btn" type="submit" value="确定"></div>',
            });

            $('.modal-overlay.modal-overlay-visible').off('click').click(function () {
                $vue.$f7.closeModal();
            });
        })

    },
}

module.exports = f7_mobile_widgets;