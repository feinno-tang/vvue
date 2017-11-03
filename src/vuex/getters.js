//test
export const getCount = state => {
    return state.count
}
const getters = {
    token:state => state.user.token,
    user: state => state.user.user,
    all_routers : state => state.permission.routers,
    
}
export default getters;