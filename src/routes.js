import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import systemUser from './views/system/systemUser.vue'
import systemAuthority from './views/system/systemAuthority.vue'
import systemMenuTypes from './views/system/systemMenuTypes.vue'
import systemMenuModule from './views/system/systemMenuModule.vue'
import userManage from './views/user/userManage.vue'
import echarts from './views/charts/echarts.vue'

export const constantRouterMap = [
    {
        path: '/',
        redirect: '/home', //重定向
        component: Home,
        hidden: true,
        iconCls:'fa fa-home',
        children: [
            { path: '/home', component: Main, name: 'home',hidden:true,roles:1}
        ]
    },
    {
        path: '/login',
        component: Login,// 注册组件
        name: '登录',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '404',
        hidden: true
    }
];
export const asyncRouterMap =[
    {
        path:'/user',
        name:'用户系统',
        component:Home,
        iconCls:'fa fa-user',
        children:[
            {path:'/user/userManage', name:'用户管理',component:userManage,roles:1},
            {path:'/user/userTagManage', name:'用户标签管理',component:userManage,roles:1}
        ]
    },
    {
        path:'/operate',
        component: Home,
        name:'运营配置',
        iconCls:'fa fa-list-alt',
        children:[
            {path: '/operate/bootPage1', name:'启动页', component:Table,roles:1},
            {path: '/operate/bootPage2', name:'礼物', component:Table,roles:1},
            {path: '/operate/bootPage3', name:'脸萌', component:Table,roles:1},
            {path: '/operate/bootPage4', name:'变声', component:Table,roles:1},
            {path: '/operate/bootPage5', name:'表情', component:Table,roles:1},
            {path: '/operate/bootPage6', name:'充值', component:Table,roles:1},
            {path: '/operate/bootPage7', name:'版本提醒', component:Table,roles:1},
            {path: '/operate/bootPage8', name:'系统小助手', component:Table,roles:1},
            {path: '/operate/bootPage9', name:'用户反馈', component:Table,roles:1},
            {path: '/operate/bootPage10', name:'帮助', component:Table,roles:1},
            {path: '/operate/bootPage11', name:'举报', component:Table,roles:1}
        ]
    },
    {
      path:'/chat',
      component:Home,
      name:'陪聊',
      iconCls:'fa fa-smile-o ',
      children:[
          {path:'/chat/chatChat' , name:'陪聊1', component:Table }
      ]
    },
    {
        path:'/call',
        component:Home,
        name:'客服',
        iconCls:'fa fa-volume-control-phone',
        children:[
            {path:'/call/callCenter' , name:'客服', component:Table,roles:1 }
        ]
    },
    {
        path:'/secure',
        component:Home,
        name:'安全',
        iconCls:'fa fa-bell',
        children:[
            {path:'/secure/audit' , name:'审核', component:Table,roles:1 },
            {path:'/secure/monitor' , name:'监控', component:Table,roles:1 },
            {path:'/secure/sensitiveWords' , name:'敏感词', component:Table,roles:1 }
        ]
    },
    {
        path: '/system',
        component: Home,
        name:'系统配置',
        iconCls: 'fa fa-cog',
        children: [
            { path: '/system/systemUser', name:'系统用户管理', component: systemUser,roles:1},
            // { path: '', name:'ttt', component: Table},
            { path: '/system/systemAuthority', name:'权限管理', component: systemAuthority,roles:1},
            { path: '/system/systemMenuTypes', name:'菜单类别', component: systemMenuTypes,roles:1},
            { path: '/system/systemMenuModule', name:'菜单模块', component: systemMenuModule,roles:1},
        ]
    },
    {
        path: '*',
        name:'*',
        hidden: true,
        redirect: { path: '/404' }
    }
]
