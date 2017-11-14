
const getters = {
    token:state => state.user.token,
    user: state => state.user.user,
    added_routes : state => state.permission.add_routers,
    
}
export default getters;