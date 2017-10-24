import { http } from 'vue'
import {CONFIG_OPTION, PERFECT_ORDER, GET_ORDER_LIST, GET_MORE_ORDER, GET_ORDER_DETAIL, GET_COMPANY_ACHIEVEMENT, GET_COMPANY_MONTHLY_ACHIEVEMENT} from './mutation-types'
import xhr from 'utility/xhr'
import widgets_tools from 'utility/widgets_tools'

export function getConfigs({ commit }) {
    var config_options = localStorage.config_options;
    if(config_options && widgets_tools.result_isvalid(JSON.parse(config_options).valid_time,2))
    {
        var time = Date.parse(new Date());
        config_options = JSON.parse(config_options);
        config_options.valid_time = time;
        localStorage.config_options = JSON.stringify(config_options);
        return false;
    }
    else {
        return xhr.get('config').then(response => {
            if(response.success){
                var config_list = response.results.config;
                var cur_time = Date.parse(new Date());
                config_list['valid_time'] = cur_time;
                commit(CONFIG_OPTION,config_list);
            }
            else{

            }

        });
    }
}

export function addOrder({ commit }, obj) {
    var $vue = obj.$vue;
    var formData = obj.formData;
    //var UmejiaCaptchakey = index.state.UmejiaCaptchakey;
    return xhr.post('add_order', formData).then( response => {
        if(response.success){
            commit(PERFECT_ORDER,response.results);
            $vue.$router.load({url: '/order/order_success/'});
        }
        else{
            $vue.$router.load({url: '/order/order_fail/'});
        }
    }).catch(res => {
        $vue.$router.load({url: '/order/order_fail/'});
    });
}

export function editOrder({ commit }, obj) {
    var $vue = obj.$vue;
    var formData = obj.formData;
    var url = obj.url;
    //var UmejiaCaptchakey = index.state.UmejiaCaptchakey;
    return xhr.post('edit_order', formData).then( response => {
        if(response.success){
            commit(PERFECT_ORDER,response.results);
            $vue.$router.load({url: url});
        }
        else{
            $vue.$router.load({url: '/order/order_fail/'});
        }
    }).catch(res => {
        $vue.$router.load({url: '/order/order_fail/'});
    });
}

export function getOrder({ commit }, obj) {
    //var $vue = obj.$vue;
    var formData = null;
    if(obj) {
        formData = obj.formData || null;
    }
    if(!formData['per-page']){
        formData['per-page']=10;
    }
    var page = formData['page'] || 1;
    //var UmejiaCaptchakey = index.state.UmejiaCaptchakey;
    return xhr.get('get_order',null,formData).then( response => {
        if(response.success){
            if(page<2){
                commit(GET_ORDER_LIST,response.results);
            }
            else {
                commit(GET_MORE_ORDER,response.results);
            }
            return response.results;
        }
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function getOrderDetail({ commit }, formData) {
    return xhr.get('order_detail', null,formData).then( response => {
        if(response.success){
            commit(GET_ORDER_DETAIL,response.results);
        }
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function getCompanyAchievement({ commit }) {
    return xhr.get('company_achievment').then( response => {
        if(response.success){
            commit(GET_COMPANY_ACHIEVEMENT,response.results);
        }
        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function getCompanyMonthlyAchievement({ commit }, formData) {
    formData = formData || null;
    return xhr.get('company_monthly_achievment',null,formData).then( response => {
        if(response.success){
            commit(GET_COMPANY_MONTHLY_ACHIEVEMENT,response.results);
        }
        return response;
    });
}