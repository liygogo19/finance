import xhr from '../../utility/xhr.js'
import widgets_tools from 'utility/widgets_tools'
import {
    UPDATE_AGENT_DETAIL
} from './mutation-types'

//store
export function getAgents ({ commit },data) {
    console.log('get agents action:',data);
    return xhr.get("get_agents",'',data).then(response => {
        console.log('return get agents:',response);
        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function changeManager ({ commit },data) {
    console.log('change manager action:',data);
    return xhr.get("change_manager",'',data).then(response => {
        console.log('return change manager:',response);
        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function deleteAgent ({ commit },data) {
    console.log('delete agent action:',data);
    return xhr.get("delete_agents",'',data).then(response => {
        console.log('return delete agent:',response);
        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function getAgentDetail ({ commit },data) {
    console.log('get agent detail action:',data);
    return xhr.get("agent_detail",'',data).then(response => {
        console.log('return get agent detail:',response);
        if(response.success){
            response.results.agent.level = getLevel(response.results.agent.level);
            if(response.results.statisticsFiveMonth){
                var month = response.results.statisticsFiveMonth.month;
                var graphMonth = widgets_tools.generateGraphMonth(month);
                var achievementMonth = widgets_tools.generateAchievementMonth(month);
                response.results.statisticsFiveMonth.graphMonth = graphMonth;
                response.results.statisticsFiveMonth.achievementMonth = achievementMonth;
            }
            commit(UPDATE_AGENT_DETAIL,response.results);
        }
        return response;
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

