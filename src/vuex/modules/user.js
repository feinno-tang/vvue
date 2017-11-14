import {requestLogin } from '@/api/login'
import {getToken, setToken, deleteToken, getUserInfoFromStorage, setUserInfoFromStorage, deleteUserInfoStorage} from '@/common/system'

const user ={
    state:{
       user:getUserInfoFromStorage(),
       token:getToken()
    },
    mutations:{
        SET_TOKEN:(state, token) =>{
            state.token = token;
        },
        SET_USER:(state,user) => {
            state.user = user;
        }
    },
    actions:{
        //用户名登陆
        loginByUserName({commit},userInfo){
            console.log(userInfo.loginName.trim());
            return new Promise((resolve,reject) => {
                debugger;
                var params = {loginName:userInfo.loginName.trim(), password:userInfo.password};
                requestLogin(params).then((response) => {
                    debugger;
                    if(response.code == 200){
                        const data = response.user;
                        setToken(data.token);
                        setUserInfoFromStorage(JSON.stringify(data));
                        commit('SET_TOKEN',data.token);
                        commit('SET_USER',JSON.stringify(data));
                    }
                    resolve(response);
                }).catch(error =>{
                    reject(error);
                });
            });
        },
        //登出
        logOut({commit}){
            return new Promise((resolve)=> {
                //logout().then(() => {
                    commit('SET_TOKEN','');
                    commit('SET_USER','');
                    deleteToken();
                    deleteUserInfoStorage();
                    resolve();
                //})
            })
        }

    }
}

export default user;