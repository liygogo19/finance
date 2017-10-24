import * as actions from './actions';
import * as getters from './getters';


import { CONFIG_OPTION } from './mutation-types'

const initialState = {
  config_options:localStorage.config_options ? JSON.parse(localStorage.config_options) : {},
  perfect_order_detail:{},
  order_list:null,
  order_detail:{},
  company_achievement:{},
  company_monthly_achievement:{},
}

const mutations = {
  [CONFIG_OPTION] (state,config) {
    state.config_options = config;
    if(window.localStorage){
      localStorage.config_options = JSON.stringify(config);
    }
  },
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}
