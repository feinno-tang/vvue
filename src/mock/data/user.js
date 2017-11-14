import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    loginName: 'admin',
    password: '111111',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某',
    token:'wertokenktokentokentoken2332232323233',
    menus:[
      {
          path:'/user',
          name:'用户系统',
          component:'Home',
          iconCls:'fa fa-user',
          children:[
              {path:'/user/userManage', name:'用户管理',component:'userManage',roles:0},
              {path:'/user/userTagManage', name:'用户标签管理',component:'userTagManage',roles:1}
          ]
        },
      {
          path:'/operate',
          component: 'Home',
          name:'运营配置',
          iconCls:'fa fa-list-alt',
          children:[
              {path: '/operate/bootPage1', name:'启动页', component:'Table',roles:0},
              {path: '/operate/bootPage2', name:'礼物', component:'Table',roles:0},
              {path: '/operate/bootPage3', name:'脸萌', component:'Table',roles:0},
              {path: '/operate/bootPage4', name:'变声', component:'Table',roles:0},
              {path: '/operate/bootPage5', name:'表情', component:'Table',roles:0},
              {path: '/operate/bootPage6', name:'充值', component:'Table',roles:0},
              {path: '/operate/bootPage7', name:'版本提醒', component:'Table',roles:0},
              {path: '/operate/bootPage8', name:'系统小助手', component:'Table',roles:0},
              {path: '/operate/bootPage9', name:'用户反馈', component:'Table',roles:0},
              {path: '/operate/bootPage10', name:'帮助', component:'Table',roles:0},
              {path: '/operate/bootPage11', name:'举报', component:'Table',roles:0}
          ]
        },
      {
        path:'/chat',
        component:"Home",
        name:'陪聊',
        iconCls:'fa fa-smile-o ',
        children:[
            {path:'/chat/chatChat' , name:'陪聊1', component:"Table",roles:0 }
        ]
      },
      {
          path:'/call',
          component:"Home",
          name:'客服',
          iconCls:'fa fa-volume-control-phone',
          children:[
              {path:'/call/callCenter' , name:'客服', component:"Table",roles:0 }
          ]
      },
      {
          path:'/secure',
          component:"Home",
          name:'安全',
          iconCls:'fa fa-bell',
          children:[
              {path:'/secure/audit' , name:'审核', component:"Table",roles:1 },
              {path:'/secure/monitor' , name:'监控', component:"Table",roles:1 },
              {path:'/secure/sensitiveWords' , name:'敏感词', component:"Table",roles:1 }
          ]
      },
      {
          path: '/system',
          component: "Home",
          name:'系统配置',
          iconCls: 'fa fa-cog',
          children: [
              { path: '/system/systemUser', name:'系统用户管理', component: "systemUser",roles:1},
              // { path: '', name:'ttt', component: Table},
              { path: '/system/systemAuthority', name:'权限管理', component: "systemAuthority",roles:1},
              { path: '/system/systemMenuTypes', name:'菜单类别', component: "systemMenuTypes",roles:1},
              { path: '/system/systemMenuModule', name:'菜单模块', component: "systemMenuModule",roles:1},
          ]
      },
      {
          path: '*',
          name:'*',
          hidden: true,
          redirect: { path: '/404' }
      }
  ]
}]

const Users = [];

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };
