import axios from 'axios'; //axios

let base= 'http://10.10.32.164:6021';
//  let base = '';

//
export const addRole = params => {return axios.post(`${base}/manager/role/add`, {params: params}) };
//获取所有权限role
export const getRoles = params => {return axios.get(`${base}/manager/role/all`,{} );};
//更新权限
export const editRole = params => {return axios.post(`${base}/manager/role/update`),{ params: params}};
//删除权限
export const deleteRole = params => {return axios.post(`${base}/manager/role/delete`),{ params: params}};
//添加系统用户
 export const addUser = params => { return axios.post(`${base}/manager/admin/user/add`, { params: params }); };
//系统用户列表
 export const getUserListPage = params => { return axios.get(`${base}/manager/admin/user/list`, { params: params }); };
 //删除用户 ???
 export const removeUser = params => { return axios.post(`${base}/user/remove`, { params: params }); };
 //更新用户信息 
 export const editUser = params => { return axios.post(`${base}/manager/admin/user/update`, { params: params }); };