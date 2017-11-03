/*

* */
const TokenKey = 'USER-TOKEN';
const LocalUserKey = 'LOCAL-USER';
const UserRouteKey = 'USER-ROUTE';

// 拿登录token
export function getToken(){
    return window.localStorage.getItem(TokenKey)
}
// 设置登录token
export function setToken(token){
    return localStorage.setItem(TokenKey,token)
}
//删除登录token
export function deleteToken(){
    return localStorage.removeItem(TokenKey);
}
//缓存用户信息
export function setUserInfoFromStorage(user){
    return localStorage.setItem(LocalUserKey,user);
}
//从缓存拿用户信息
export function getUserInfoFromStorage(){
    return localStorage.getItem(LocalUserKey);
}
//清空用户信息缓存
export function deleteUserInfoStorage(){
    return localStorage.removeItem(LocalUserKey)
}
//设置用户路由信息缓存
export function setRoutes(routes){
    return localStorage.setItem(UserRouteKey,routes)
}
//获取用户路由信息缓存
export function getRoutes(){
    return localStorage.getItem(UserRouteKey);
}
//清空用户路由信息
export function deleteRoutes(){
    return localStorage.removeItem(UserRouteKey);
}


