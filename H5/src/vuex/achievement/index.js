import * as actions from './actions';
import * as getters from './getters';


import {
  GET_PERSON_ACHIEVEMENT,
  GET_PERSON_MONTHLY_ACHIEVEMENT,
  GET_COMPANY_ACHIEVEMENT,
  GET_COMPANY_MONTHLY_ACHIEVEMENT,
  GET_STORE_ACHIEVEMENT,
  GET_STORE_MONTHLY_ACHIEVEMENT
} from './mutation-types'

const initialState = {
  person_achievement:{},
  person_monthly_achievement:{},
  company_achievement:{},
  company_monthly_achievement:{},
  store_achievement:{},
  store_monthly_achievement:{},
}

const mutations = {
  [GET_PERSON_ACHIEVEMENT] (state,achievement) {
    state.person_achievement = achievement;
  },
  [GET_PERSON_MONTHLY_ACHIEVEMENT] (state,achievement) {
    state.person_monthly_achievement = achievement;
  },
  [GET_COMPANY_ACHIEVEMENT] (state,achievement) {
    state.company_achievement = achievement;
  },
  [GET_COMPANY_MONTHLY_ACHIEVEMENT] (state,achievement) {
    state.company_monthly_achievement = achievement;
  },
  [GET_STORE_ACHIEVEMENT] (state,achievement) {
    state.store_achievement = achievement;
  },
  [GET_STORE_MONTHLY_ACHIEVEMENT] (state,achievement) {
    state.store_monthly_achievement = achievement;
  },
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}
