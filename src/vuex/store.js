import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

// 创建store实例
const store = new Vuex.Store({
    modules:{
        user,
        permission
    },
    getters
});
export default store;
