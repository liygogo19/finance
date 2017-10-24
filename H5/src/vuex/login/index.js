import * as actions from './actions';
import * as getters from './getters';
import {
    UPDATE_USER_INFO,
    ADD_STORE_INFO,
    LOG_OUT,
} from './mutation-types'

const initialState = {
  is_login : false,
  //user info
  user_info : localStorage.user_info ? JSON.parse(actions.b64DecodeUnicode(localStorage.user_info)) : '',
  user_token : localStorage.user_info ? JSON.parse(actions.b64DecodeUnicode(localStorage.user_info)).token : '',
  user_ref : 'JX_26552',
  user_store_ref : 'GM_26548',
  //sms
  register_captcha : '',
  register_finacecaptchakey : ''
}

const mutations = {
  [UPDATE_USER_INFO] (state,results) {
    state.is_login = true;
    state.user_info = results;
    state.user_token = results.token;
    localStorage.user_info = actions.b64EncodeUnicode(JSON.stringify(results));
    localStorage.setItem('user_is_login', true);
  },
  [ADD_STORE_INFO] (state,info) {
      state.store_info = info;
  },
  [LOG_OUT] (state) {
    state.is_login = false;
    state.user_info = '';
    state.user_token = '';
    localStorage.removeItem('user_info');
    localStorage.removeItem('user_is_login');
  },
}

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations
}