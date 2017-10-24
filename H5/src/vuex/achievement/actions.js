import { http } from 'vue'
import {
    GET_PERSON_ACHIEVEMENT,
    GET_PERSON_MONTHLY_ACHIEVEMENT,
    GET_COMPANY_ACHIEVEMENT,
    GET_COMPANY_MONTHLY_ACHIEVEMENT,
    GET_STORE_ACHIEVEMENT,
    GET_STORE_MONTHLY_ACHIEVEMENT
} from './mutation-types'
import xhr from 'utility/xhr'
import widgets_tools from 'utility/widgets_tools'

export function getPersonAchievement({ commit },data) {
    return xhr.get('person_achievment','',data).then( response => {
        if(response.success && response.results.statisticsFiveMonth){
            var month = response.results.statisticsFiveMonth.month;
            var graphMonth = widgets_tools.generateGraphMonth(month);
            var achievementMonth = widgets_tools.generateAchievementMonth(month);
            response.results.statisticsFiveMonth.graphMonth = graphMonth;
            response.results.statisticsFiveMonth.achievementMonth = achievementMonth;
            commit(GET_PERSON_ACHIEVEMENT,response.results);

            console.log('person_achievment action:',response.results);
        }
        return response;
    });
}

export function getPersonMonthlyAchievement({ commit }, formData) {
    formData = formData || null;
    return xhr.get('person_monthly_achievment',null,formData).then( response => {
        if(response.success){
            commit(GET_PERSON_MONTHLY_ACHIEVEMENT,response.results);
        }
        return response;
    });
}

export function getCompanyAchievement({ commit },url) {
    return xhr.get(url).then( response => {
        if(response.success && response.results.statisticsFiveMonth){
            var month = response.results.statisticsFiveMonth.month;
            var graphMonth = widgets_tools.generateGraphMonth(month);
            var achievementMonth = widgets_tools.generateAchievementMonth(month);
            response.results.statisticsFiveMonth.graphMonth = graphMonth;
            response.results.statisticsFiveMonth.achievementMonth = achievementMonth;
            commit(GET_COMPANY_ACHIEVEMENT,response.results);

            console.log('company_achievment action:',response.results);
        }
        return response;

    });
}

export function getCompanyMonthlyAchievement({ commit }, formData) {
    formData = formData || null;
    return xhr.get('company_monthly_achievment',null,formData).then( response => {
        if(response.success){
            commit(GET_COMPANY_MONTHLY_ACHIEVEMENT,response.results);
        }
        return response;
    }).catch(e => {
        $.showTooltip('操作失败');
    });
}

export function getStoreAchievement({ commit },data) {
    return xhr.get('store_achievment','',data).then( response => {
        console.log('return store achievment',response.results);
        if(response.success){
            var month = response.results.statisticsFiveMonth.month;
            var graphMonth = widgets_tools.generateGraphMonth(month);
            var achievementMonth = widgets_tools.generateAchievementMonth(month);
            response.results.statisticsFiveMonth.graphMonth = graphMonth;
            response.results.statisticsFiveMonth.achievementMonth = achievementMonth;
            commit(GET_STORE_ACHIEVEMENT,response.results);
        }
        return response;
    });
}

export function getStoreMonthlyAchievement({ commit }, formData) {
    formData = formData || null;
    return xhr.get('store_monthly_achievment',null,formData).then( response => {
        if(response.success){
            commit(GET_STORE_MONTHLY_ACHIEVEMENT,response.results);
        }
        return response;
    });
}