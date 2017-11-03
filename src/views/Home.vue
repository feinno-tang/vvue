<template>
	<el-row class="container">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar" /> {{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item>我的消息</el-dropdown-item>
						<el-dropdown-item @click.native="editPwdVisible">更新密码</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in user_router" v-if="!item.hidden">
						<el-submenu :index="index+''" v-if="!item.leaf">
							<template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
						</el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed">
					<li v-for="(item,index) in user_router" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<!---面包屑--->
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<!--<strong class="title">{{$route.name}}</strong>-->
						<!--<strong>{{$route}}</strong>&lt;!&ndash; {{$route.params   $route.query}}-&ndash;&gt;-->
						<el-breadcrumb separator="/" class="breadcrumb-inner">
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path" v-if="!item.hidden">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
		<el-dialog title="编辑" v-model="editSelfPwdVisible" :close-on-click-modal="false" @close="resetSelfPwd('pwdForm')">
			<el-form :model="pwdForm" :rules="pwdFormRules" ref="pwdForm">
				<el-form-item label="旧密码" prop="oldPwd" >
					<el-input v-model.trim="pwdForm.oldPwd" type="password" placeholder="输入旧密码" auto-complete="false"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newPwd">
					<el-input v-model.trim="pwdForm.newPwd" type="password" placeholder="输入新密码" auto-complete="false"></el-input>
				</el-form-item>
				<el-button type="primary" @click="editSelfPwd('pwdForm')" :loading="editPwdLoading">提交</el-button>
			</el-form>
		</el-dialog>
	</el-row>
</template>

<script>
    import { editPwd} from '../api/api';
	import { String } from '../common/util';

    export default {
		data() {
			return {
				sysName:'VUEADMIN',
				collapsed:false,
                sysUserId:JSON.parse(this.$store.state.user.user),
				sysUserName: JSON.parse(this.$store.state.user.user).username,
				sysUserAvatar: JSON.parse(this.$store.state.user.user).avatar,
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
                pwdForm:{
				    oldPwd:'',
					newPwd:''
				},
                pwdFormRules:{
				    oldPwd:[{required:true,message:'请输入旧密码',trigger:'blur'}],
					newPwd:[{required:true,message:'请输入新密码',trigger:'blur'}]
				},
				editSelfPwdVisible:false,
                editPwdLoading:false,
				user_router2:this.$store.getters.all_routers,
				user_router:this.$store.state.permission.routers
			}
		},
		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect(a, b) {
			},
			//修改密码弹层
			editPwdVisible(){
				this.editSelfPwdVisible = true;
			},
			//重置密码
			resetSelfPwd(formName){
			    this.$refs[formName].resetFields();
			},
            //修改当前用户密码
			editSelfPwd(formName){
				this.$refs[formName].validate((valid)=>{
				    if(valid){
				        let para = Object.assign({},{id: this.sysUserId , pwd: this.pwdForm.newPwd});
                        editPwd(para).then((res)=>{
                            if(res.data.code == 200){
                                this.editSelfPwdVisible = false;
                                this.$refs[formName].resetFields();
                                this.$message({message:'修改成功',type:'success'});
							}
						});
					}
				})
			},
			//退出登录
			logout() {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.$store.dispatch('logOut'); //
					_this.$router.push('/login');
				}).catch(() => {
					
				});
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		},
		mounted() {
			console.log(this.user_router)
			console.log(this.user_router2)
			//console.log(JSON.parse(this.user_router))
			//console.log(JSON.parse(this.user_router2))
			//console.log('this.$routes',this.$routes);
			//console.log(this.$store.getters.user);
			//console.log(this.$store.getters.token);
			//console.log(this.$store.state.user.user)
		}
	}

</script>

<style scoped lang="scss">
	@import '~scss_vars';

	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				overflow-y: scroll;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}
				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: left;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>