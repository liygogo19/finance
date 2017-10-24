import * as actions from './actions';
import * as getters from './getters';


import {PERFECT_ORDER, GET_ORDER_LIST, GET_MORE_ORDER, GET_ORDER_DETAIL} from './mutation-types'

const initialState = {
  perfect_order_detail:{},
  order_list:null,
  order_detail:{},
  company_achievement:{},
  company_monthly_achievement:{},
}

const mutations = {
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
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}
