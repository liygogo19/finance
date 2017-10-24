import * as actions from './actions';
import * as getters from './getters';


import { CONFIG_OPTION, PERFECT_ORDER, GET_ORDER_LIST, GET_MORE_ORDER, GET_ORDER_DETAIL, GET_COMPANY_ACHIEVEMENT, GET_COMPANY_MONTHLY_ACHIEVEMENT} from './mutation-types'

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
  [PERFECT_ORDER] (state,order_detail) {
    state.perfect_order_detail = order_detail;
  },
  [GET_ORDER_LIST] (state,order_list) {
    state.order_list = order_list;
  },
  [GET_MORE_ORDER] (state,order_list) {
    state.order_list =  state.order_list.concat(order_list);
  },
  [GET_ORDER_DETAIL] (state,order_detail) {
    state.order_detail = order_detail;
    state.perfect_order_detail = order_detail;
  },
  [GET_COMPANY_ACHIEVEMENT] (state,achievement) {
    state.company_achievement = achievement;
  },
  [GET_COMPANY_MONTHLY_ACHIEVEMENT] (state,achievement) {
    state.company_monthly_achievement = achievement;
  },
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}
