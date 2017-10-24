import xhr from '../../utility/xhr.js'
import widgets_tools from 'utility/widgets_tools'
import {
    ADD_STORE_INFO,
    UPDATE_STORE_LIST,
    UPDATE_STORE_DETAIL,
} from './mutation-types'
import * as loginAction from '../login/actions';
//store

export function getStoreList ({ commit }) {
    return xhr.get("store_list").then(response => {
        console.log('return get store list:',response);
        if(response.success){
            commit(UPDATE_STORE_LIST,response.results);
        }
        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function addStore ({ commit },data) {
    console.log('add store action',data);
    return xhr.post("add_store",data).then(response => {
        console.log('return add store:',response);
        if(response.success){
            loginAction.updateUserInfo({ commit });
        }
        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function editStore ({ commit },data) {
    console.log('edit store action',data);
    return xhr.post("edit_store",data,'',{'store_ref':data.store_ref}).then(response => {
        console.log('return edit store:',response);
        if(response.success){
            loginAction.updateUserInfo({ commit });
        }
        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function storeDetail ({ commit },data) {
    console.log('store detail action',data);
    return xhr.get("store_detail",'',data).then(response => {
        console.log('return store detail:',response);
        if(response.success){
            var agents = response.results.agents;
            for(var i=0;i<agents.length;i++) agents[i].agent.level = getLevel(agents[i].agent.level);
            if(response.results.statisticsFiveMonth){
                var month = response.results.statisticsFiveMonth.month;
                var graphMonth = widgets_tools.generateGraphMonth(month);
                var achievementMonth = widgets_tools.generateAchievementMonth(month);
                response.results.statisticsFiveMonth.graphMonth = graphMonth;
                response.results.statisticsFiveMonth.achievementMonth = achievementMonth;
            }
            commit(UPDATE_STORE_DETAIL,response.results);
        }
        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function deleteStore ({ commit },data) {
    return xhr.get("delete_store",'',data).then(response => {
        console.log('return delete store:',response);
        if(response.success){
            loginAction.updateUserInfo({ commit });
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


