import * as actions from './actions';
import * as getters from './getters';
import {
    UPDATE_AGENT_DETAIL
} from './mutation-types'

const initialState = {
  //agent
  agent_list : '',
  agent_detail : '',
}

const mutations = {
  [UPDATE_AGENT_DETAIL] (state,detail) {
    state.agent_detail = detail;
  }
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}