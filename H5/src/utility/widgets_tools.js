/**
 * Created by liyang on 2017/5/15.
 */

var widgets_tools = {
    hide_loading:function (start, end, callback) {
        var real_time = end - start;
        if(real_time>1000){
            callback();
        }
        else{
            var timer = setTimeout(callback,real_time);
        }
    },
    result_isvalid:function (time,valid_time) {
        var cur_time = Date.parse(new Date());
        var hours = (cur_time-time)/(1000 * 60 * 60);
        if(hours<valid_time){
            return true;
        }
        else{
            return false;
        }
    },
    count_down:function ($vue, $id) {
        var countdown = 60;
        var timeInterval = null;
        $($id).on('click',function () {
            if($vue.smsBtn){
                $vue.smsBtn = false;
                $($id).html('60秒后可重发');
                timeInterval = setInterval(function () {
                    if(countdown==0){
                        countdown = 60;
                        $vue.smsBtn = true;
                        clearInterval(timeInterval);
                        $($id).html('发送验证码');
                    }
                    else {
                        countdown--;
                        $($id).html(countdown+'秒后可重发');
                    }
                },1000)
            }
        });
    },
    generateOptions:function (obj,key1,key2) {
        var key = key1 || 'key';
        var title = key2 || 'title';
        var resultObj = {
            keyArray:[],
            valueArray:[],
        }

        for(var i in obj){
            resultObj.keyArray.push(obj[i][key]);
            resultObj.valueArray.push(obj[i][title]);
        }

        return resultObj;
    },
    generateStoreOptions:function (obj) {
        var resultObj = {
            keyArray:[],
            valueArray:[],
        };

        $.each(obj,function (index,val) {
            resultObj.keyArray.push(val['ref']);
            resultObj.valueArray.push(val['name']);
        })

        return resultObj;
    },
    generateStatusOptions:function (obj) {
        var resultObj = {};

        $.each(obj,function (index,val) {
            resultObj[val.key]=val.title;
        })

        return resultObj;
    },
    generateStoreNames:function (obj) {
        var resultObj = {};

        $.each(obj,function (index,val) {
            resultObj[val.ref]=val.name;
        })

        return resultObj;
    },
    generateGraphMonth:function (monthArray) {
        var resultArray = [];
        $.each(monthArray,function (index,val) {
            val = new Date(val).getMonth();
            resultArray.push(val);
        })
       return resultArray;
    },
    generateAchievementMonth:function (monthArray) {
        var resultArray = [];
        $.each(monthArray,function (index,val) {
            var year = new Date(val).getFullYear()+'年';
            var month = new Date(val).getMonth()+'月';
            resultArray.push(year+month);
        })
        return resultArray;
    },
    deepCopy:function (newObj,oldObj) {
        for (var key in oldObj) {
            newObj[key] = (typeof oldObj[key]==='object')? this.deepCopy(oldObj[key]): oldObj[key];
        }
        return newObj;
    }
    //error_district_img:require('../img/widgets/default.png'),
    //error_agent_img:require('../img/index_pages/index_background/sell_house.png'),
    //mode_error_img:require('../img/slider_imgs/timg-1.jpeg'),
}

module.exports = widgets_tools;