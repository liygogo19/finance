/**
 * Created by liyang on 2017/4/24.
 */
import http from 'axios'
import * as actions from './../vuex/login/actions';
import vueObj from '../main'
import api_params from './api_params'

var md5 = require("blueimp-md5");

function getApiUrl(api_url,search_data) {
    var apiUrl,urlId = '';
    if(search_data){
        for(var i in search_data){
            urlId+=i+'='+search_data[i]+'&';
        }
        urlId = '?'+urlId.substring(0,urlId.length-1);
    }
    apiUrl = api_url +urlId;
    return apiUrl;
}

function generateToken() {
    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth() + 1; //Months are zero based
    var curr_year = d.getFullYear();
    var date = curr_year+ "-" +curr_month + "-" +curr_date;
    return date;
}

function generateEncryKey(api_url_name) {
    var date = generateToken();
    var encry_key = date + api_url_name + api_params.access_token_key;
    encry_key = md5(encry_key);
    return encry_key;
}


function extend_object(destination, source) {
    for (var property in source) {
        destination['headers'][property] = source[property];
    }
    return destination;
}

function get_user_token() {
    if(window.localStorage){
        var token = localStorage.user_info ? JSON.parse(actions.b64DecodeUnicode(localStorage.user_info)).token : '';
        if(token){
            return (api_params.token_key_prefix + token);
        }
    }else{
        return;
    }
}

function getResponse(response){
    var response_data = response['data'];
    console.log('get response:',response_data);
    if(response_data['success']){
        return {
            results:response_data['results'],
            headers:response['headers'],
            success:true,
        };
    }else{
        return {
            success:false,
            errors:response_data['errors'],
        };
    }
}

var xhr = {
    get:function (url_name, extendOptions,search_data) {
        var api_url;
        var api_url_name;
        var url_link = api_params[url_name];
        api_url_name = url_link ? url_link : url_name;
        var encry_key = generateEncryKey(api_url_name);
        var token = get_user_token();
        var options = {
            headers: {
                FinaceAuthkey: encry_key,
                FinaceAuthorization: token,
            },
            timeout:5000,
        };
        api_url = getApiUrl(api_params.base_url + api_url_name,search_data);
        console.log(api_url_name+' -- api url:',api_url);
        var final_options = extend_object(options, extendOptions);
        return http.get(api_url, final_options).then(
            response => {
                return getResponse(response);
            }).then(res => {
                console.log(res,'#$##');
                if(!res.success){
                    if(res.errors.code=='401'){
                        vueObj.$f7.addNotification({
                            title: '登陆信息已过期',
                            button: {
                                text: '关闭',
                                color: 'white'
                            },
                            onClose: function(){
                                localStorage.removeItem('user_info');
                                localStorage.removeItem('user_is_login');
                                vueObj.$f7.hideIndicator();
                                vueObj.$router.load({url: '/login/'});
                            }
                        });
                    }
                }
                return res;
        });
    },


    post:function (url_name,body_data,extendOptions,search_data) {
        var api_url;
        var api_url_name;
        var url_link = api_params[url_name];
        api_url_name = url_link ? url_link : url_name;
        var encry_key = generateEncryKey(api_url_name);
        var token = get_user_token();
        var options = {
            headers: {
                FinaceAuthkey: encry_key,
                FinaceAuthorization: token,
            },
            timeout:5000,
        };
        api_url = getApiUrl(api_params.base_url + api_url_name,search_data);
        console.log(api_url_name+' -- api url:',api_url);
        var final_options = extend_object(options, extendOptions);
        var post_data = body_data || {};
        return http.post(api_url,post_data,final_options).then(
            response => {
                return getResponse(response);
            }).then(res => {
            console.log(res,'#$##');
            if(!res.success){
                if(res.errors.code=='401'){
                    vueObj.$f7.addNotification({
                        title: '登陆信息已过期',
                        button: {
                            text: '关闭',
                            color: 'white'
                        },
                        onClose: function(){
                            localStorage.removeItem('user_info');
                            localStorage.removeItem('user_is_login');
                            vueObj.$f7.hideIndicator();
                            vueObj.$router.load({url: '/login/'});
                        }
                    });
                }
            }
            return res;
        });
    },
}

export default xhr;