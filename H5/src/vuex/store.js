/**
 * Created by lin on 2017/6/8.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import login from './login'
import order from './order'
import shop from './shop'
import agent from './agent'
import config from './config'
import achievement from './achievement'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        login,
        order,
        shop,
        agent,
        config,
        achievement,
    }
})
