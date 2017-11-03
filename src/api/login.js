import axios from 'axios'; //axios

let base= '';

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };
