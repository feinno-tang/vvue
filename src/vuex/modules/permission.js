import {constantRouterMap,asyncRouterMap} from '@/routes';
import {getRoutes,setRoutes,deleteRoutes} from '@/common/system'

//menu名字或者id需要和后端约定死
function getPermissionArray(menus){
    let menuArr = [];
    // menus映射一个一维数组
    menus.forEach(function(item){
        menuArr.push(item.name);
        if(item.children && item.children.length){
            item.children.forEach(function(child){
                menuArr.push(child.name);
            })
        }
    })
    return menuArr;
}

// 返回 permission routers
function filterAsyncRouter(asyncRouterMap,permissionArray){
   
    const accessedRouters = asyncRouterMap.filter( route => {
       // console.log(route.name,permissionArray,permissionArray.indexOf(route.name))
       if(permissionArray.indexOf(route.name) > -1){
           if(route.children && route.children.length){
                route.children = filterAsyncRouter(route.children , permissionArray)
           }
           return true
       }
       return false;
    })
    return accessedRouters;
}



const permission ={
    state:{
        routers : getRoutes()
    },
    mutations:{
        SET_ROUTES:(state,routers)=>{
            state.routers = routers;
        }
    },
    actions:{
        GenerateRoutes({commit},menus){
            return new Promise( resolve => {
                let accessdRouters;
                const permissionArray = getPermissionArray(menus.menus); // 坑：menus 被{}b包裹 ~ ~ ~~
                accessdRouters = filterAsyncRouter(asyncRouterMap,permissionArray);
                const finalRouter = constantRouterMap.concat(accessdRouters)
                commit('SET_ROUTES', finalRouter);
                setRoutes(JSON.stringify(finalRouter)); //避免重复addRoutes
                resolve();
            })    
        },
        formateRoutes({commit}){ // 本地存储只能存字符串, 此处转化成route原始可以的array 
            return new Promise((resolve) => {
                commit('SET_ROUTES',JSON.parse(getRoutes())); // 坑
                resolve();
            });
        },
        RemoveRoutes({commit}){
            return new Promise((resolve) =>{
                commit('SET_ROUTES','');
                deleteRoutes();
                resolve();
            })
        }
    }
};
export default permission;

