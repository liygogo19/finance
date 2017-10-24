import { http } from 'vue'
import {PERFECT_ORDER, GET_ORDER_LIST, GET_MORE_ORDER, GET_ORDER_DETAIL} from './mutation-types'
import xhr from 'utility/xhr'

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
            console.log('get_order action:',response.results);
            return response.results;
        }
        else{
            $.showTooltip('请求失败');
        }
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function getAgentsOrder({ commit }, obj) {
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
    return xhr.get('get_agents_order',null,formData).then( response => {
        if(response.success){
            if(page<2){
                commit(GET_ORDER_LIST,response.results);
            }
            else {
                commit(GET_MORE_ORDER,response.results);
            }
            console.log('get_agents_order action:',response.results);
            return response.results;
        }
        else{
            $.showTooltip('请求失败');
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
        console.log('order_detail action:',response.results);
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}
