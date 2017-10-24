import { http } from 'vue'
import {CONFIG_OPTION} from './mutation-types'
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
