import xhr from '../../utility/xhr.js'
import index from './index.js'
import {
    UPDATE_USER_INFO,
    ADD_STORE_INFO,
    LOG_OUT,
} from './mutation-types'

//update user info
export function updateUserInfo ({ commit }) {
    console.log('update user info action');
    return xhr.get("update_info").then(response => {
        console.log('return update user info:',response);

        if(response.success){
            response.results.level = getLevel(response.results.level);
            commit(UPDATE_USER_INFO,response.results);
        }else{
            for(var key in response.errors){
                console.log(key + ':' + response.errors[key]);
            }
        }

        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

//login
export function logIn ({ commit },data) {
    console.log('login action',data);
    return xhr.post("log_in",data).then(response => {
        console.log('return login:',response);

        if(response && response.success){
            response.results.level = getLevel(response.results.level);
            commit(UPDATE_USER_INFO,response.results);
        }

        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function logOut ({ commit }) {
    return xhr.get("log_out").then(response => {
        console.log('return log_out:',response);

        if(response.success){
            commit(LOG_OUT);
        }else{
            for(var key in response.errors){
                console.log(key + ':' + response.errors[key]);
            }
        }

        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

//achievement before login success
export function personFiveMonthAchievment ({ commit },data) {
    return xhr.get("person_five_month_achievment",'',data).then(response => {
        console.log('return person_five_month_achievment:',response);

        if(!response.success){
            for(var key in response.errors){
                console.log(key + ':' + response.errors[key]);
            }
        }

        return response;
    })
}

export function companyFiveMonthAchievment ({ commit }) {
    return xhr.get("company_five_month_achievment").then(response => {
        console.log('return company_five_month_achievment:',response);

        if(!response.success){
            for(var key in response.errors){
                console.log(key + ':' + response.errors[key]);
            }
        }

        return response;
    })
}

export function storeFiveMonthAchievment ({ commit },data) {
    return xhr.get("store_five_month_achievment",'',data).then(response => {
        console.log('return store_five_month_achievment:',response);

        if(!response.success){
            for(var key in response.errors){
                console.log(key + ':' + response.errors[key]);
            }
        }

        return response;
    })
}

//reshuffle password
export function reshufflePassword ({ commit },data) {
    console.log('reshuffle password',data);
    return xhr.post("reshuffle_password",data).then(response => {
        console.log('return reshuffle password:',response);
        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

//register
export function beforeRegister ({ commit },data) {
    console.log('before register action',data);
    return xhr.get("before_register",'',data).then(response => {
        console.log('return before register:',response);
        commit(ADD_STORE_INFO,response.results);
        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function register ({ commit },data) {
    console.log('register action',data);
    return xhr.post("register",data).then(response => {
        console.log('return register:',response);

        if(response.success){
            response.results.level = getLevel(response.results.level);
            commit(UPDATE_USER_INFO,response.results);
        }
        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

//before register code
export function registerLeader () {
    return xhr.get('register_leader').then(response => {
        console.log('return before_register_leader:',response);
        if(!response.success){
            for(var key in response.errors){
                console.log(key + ':' + response.errors[key]);
            }
        }

        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function registerAgentLeader ({ commit },data) {
    console.log(data);
    return xhr.get('register_agent_leader','',data).then(response => {
        console.log('return before_register_agent_leader:',response);
        if(!response.success){
            for(var key in response.errors){
                console.log(key + ':' + response.errors[key]);
            }
        }

        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function registerAgent () {
    return xhr.get('register_agent').then(response => {
        console.log('return before_register_agent:',response);
        if(!response.success){
            for(var key in response.errors){
                console.log(key + ':' + response.errors[key]);
            }
        }

        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

//captcha
export function getCaptcha () {
    return xhr.get("get_captcha").then(response => {
        console.log('return get_captcha:',response);
        index.state.register_captcha = response.results[0];
        index.state.register_finacecaptchakey = response.headers['finacecaptchakey'];
        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

//sms code
export function smsCode ({ commit },data) {
    console.log('smsCode action:',data);
    return xhr.post("request_sms_code",data,{'FinaceCaptchakey':index.state.register_finacecaptchakey}).then(response => {
        console.log('return request_sms_code:',response);
        // index.state.register_captcha = response.results[0];
        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

//edit user information
export function editInformation ({ commit },data) {
    console.log('edit information action',data);
    return xhr.post("edit_information",data).then(response => {
        console.log('return edit information:',response);
        if(response.success){
            commit(UPDATE_USER_INFO,response.results);
        }

        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

//get level
export function getLevel (level) {
    var userLevel = 1;
    if(level == 'leader'){
        userLevel = 3;
    }else if(level == 'manager'){
        userLevel = 2;
    }else if(level == 'agent'){
        userLevel = 1;
    }
    return userLevel;
}

//unicode
export function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

export function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}
