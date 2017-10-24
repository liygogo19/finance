import * as actions from './actions';
import * as getters from './getters';
import {
    ADD_STORE_INFO,
    UPDATE_STORE_LIST,
    UPDATE_STORE_DETAIL,
} from './mutation-types'

const initialState = {
  //store
  store_info : '',
  store_list : '',
  store_detail : '',
}

const mutations = {
  [ADD_STORE_INFO] (state,info) {
    state.store_info = info;
  },
  [UPDATE_STORE_LIST] (state,list) {
    state.store_list = list;
    console.log(state.store_list);
  },
  [UPDATE_STORE_DETAIL] (state,detail) {
    state.store_detail = detail;
  }
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}