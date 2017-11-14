import axios from 'axios'; //axios

//let base= 'http://10.10.32.164:6021';
 let base = '';

// export const requestLogin = params => { return axios.post(`${base}/manager/admin/user`, params).then(res => res.data); };
export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
