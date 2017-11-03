<template>
    <section>
        <!---新建权限 --->
        <el-form :inline="true" :model="roleForm" :rules="rules" ref="roleForm">
            <el-form-item label="权限名称" prop="name">
                <el-input v-model.trim="roleForm.name" placeholder="权限"></el-input>
            </el-form-item>
            <el-button type="primary" @click="createAuth('roleForm')" icon="plus">创建</el-button>
        </el-form>

        <!--- 权限列表--->
        <el-table :data="roles" :model="roles" v-loading="listLoading" stripe border style="width:100%">
            <el-table-column prop="id" label="编号" width="100px"></el-table-column>
            <el-table-column  prop="name" label="名称" width="360px">
                <template scope="scope">
                    <el-input  :value="scope.row.name"></el-input>
                    <el-button size="small" @click="editRole(scope.row.id)">修改</el-button>
                </template>
            </el-table-column>
            <el-table-column  label="权限"  width="160px">
                <template scope="scope">
                    <el-button size="small" type="primary" @click="seeRole(scope.row.id)">查看</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作"  width="160px">
                <template scope="scope">
                    <el-button size="small" type="danger" @click="delRole(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--修改用户角色弹层-->
        <el-dialog size="400" title="修改用户角色" v-model="editRoleVisible" :close-on-click-modal="false">
            <el-button type="primary" icon="plus">确认修改</el-button>
            <section v-for="menu in menus">
                <h2>{{menu.header}}</h2>
                <template v-for="subMenu in menu.childs">
                    <section style="display:inline-block;width:300px;">
                        <input  style="display: inline-block;" type="checkbox" name="input-checkbox1" v-model="checkboxModel[menu.menuType]" :value="subMenu.menuId" :key="subMenu.menuId">{{subMenu.header}}
                    </section>
                    <label style=" margin-right: 30px;">查看<input type="radio" v-model="checkboxRadio[menu.menuType][subMenu.menuId]" :value="1"></label>
                    <label>编辑<input type="radio" v-model="checkboxRadio[menu.menuType][subMenu.menuId]" :value="2"></label>
                </template>
            </section>
            <section>
                <h2>配置语言</h2>
                <template v-for="lan in languages">
                    <section>
                        <input type="checkbox" style="display:inline-block;" name="input-checkbox2" v-model="checkboxModel2" :value="lan.lanId" :key="lan.lanId">{{lan.lanName}}
                    </section>
                </template>
            </section>
        </el-dialog>

    </section>
</template>

<script>
    import { addRole,getRoles  } from '../../api/api';
    export default{
        data(){
            return {
                roleForm:{
                    name:''
                },
                roles:[{
                    id:'',
                    name:'',
                }],
                currentPage:1,
                pageSize:10,
                total:0,
                editRoleVisible:false,
                listLoading:false,
                rules:{
                    name :[{ required:true ,trigger:'blur',message:'请输入权限名称'}]
                },
                menus:[],
                checkboxModel:[],
                checkboxModel2:[],
                checkboxRadio:[],// 查看/编辑
                languages:[]
            }
        },
        methods:{
            createAuth(formName){
                let para = Object.assign({},this.roleForm);
                this.$refs[formName].validate((valid)=>{
                    console.log(para);
                    addRole(para).then((res)=>{
                        this.$message({
                            message: '创建成功',
                            type: 'success'
                        });
                        this.$refs[formName].resetFields();
                        this.getAllRoles();
                    });
                });
            },
            getAllLangs(){
                this.languages = [{lanId: 1,lanCode: 'en',lanName:'英语'},
                    {lanId: 2,lanCode: 'ar',lanName:'阿拉伯'},
                    {lanId: 3,lanCode: 'tr',lanName:'土耳其'}];
            },
            getAllRoles(){
                this.listLoading = true;
                getRoles().then((res)=>{
                    console.log(res);
                    this.listLoading = false;
                    this.roles = res.data.roles;
                })
            },
            editRole(roleId){
                console.log(roleId);
            },
            seeRole(roleId){
                console.log(roleId);
                this.editRoleVisible = true;
            },
            delRole(roleId){
                alert(roleId);
                console.log(roleId);
            },
            getAllMenus(){
                this.menus = [{
                    childs: [
                        {
                            header: "aa",
                            menuCategoryId: 1,
                            menuId: 1,
                            menuType: 0,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_info.html"
                        },
                        {
                            header: "dffg",
                            menuCategoryId: 1,
                            menuId: 2,
                            menuType: 0,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_cache_info.html"
                        },
                        {
                            header: "dvvvv",
                            menuCategoryId: 1,
                            menuId: 3,
                            menuType: 0,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/thrid_user_info.html"
                        },
                        {
                            header: "sdfdfdf",
                            menuCategoryId: 1,
                            menuId: 4,
                            menuType: 0,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_whatapp_info.html"
                        },
                        {
                            header: "eee",
                            menuCategoryId: 1,
                            menuId: 5,
                            menuType: 0,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_release_info.html"
                        },
                        {
                            header: "whatsap",
                            menuCategoryId: 1,
                            menuId: 6,
                            menuType: 0,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_whatsapp_info.html"
                        }
                    ],
                    header:'menu1',
                    menuType:0
                },{
                    childs: [
                        {
                            header: "hj",
                            menuCategoryId: 1,
                            menuId: 7,
                            menuType: 1,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_info.html"
                        },
                        {
                            header: "hhhh",
                            menuCategoryId: 1,
                            menuId: 8,
                            menuType: 1,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_cache_info.html"
                        },
                        {
                            header: "iiuiui",
                            menuCategoryId: 1,
                            menuId: 9,
                            menuType: 1,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/thrid_user_info.html"
                        },
                        {
                            header: "ss",
                            menuCategoryId: 1,
                            menuId: 10,
                            menuType: 1,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_whatapp_info.html"
                        },
                        {
                            header: "dfdff",
                            menuCategoryId: 1,
                            menuId: 11,
                            menuType: 1,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_release_info.html"
                        },
                        {
                            header: "ff",
                            menuCategoryId: 1,
                            menuId: 12,
                            menuType: 1,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_release_info.html"
                        },
                        {
                            header: "dddd",
                            menuCategoryId: 1,
                            menuId: 13,
                            menuType: 1,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_whatsapp_info.html"
                        }
                    ],
                    header:'menu2',
                    menuType:1
                },{
                    childs: [
                        {
                            header: "er",
                            menuCategoryId: 1,
                            menuId: 13,
                            menuType: 2,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_info.html"
                        },
                        {
                            header: "rrrrrr",
                            menuCategoryId: 1,
                            menuId: 14,
                            menuType: 2,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_cache_info.html"
                        },
                        {
                            header: "tttt",
                            menuCategoryId: 1,
                            menuId: 15,
                            menuType: 2,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/thrid_user_info.html"
                        },
                        {
                            header: "rrrrrrrrrrr",
                            menuCategoryId: 1,
                            menuId: 16,
                            menuType: 2,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_whatapp_info.html"
                        },
                        {
                            header: "34344",
                            menuCategoryId: 1,
                            menuId: 17,
                            menuType:2,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_release_info.html"
                        },
                        {
                            header: "ggfffff",
                            menuCategoryId: 1,
                            menuId: 18,
                            menuType: 2,
                            targetMethod: 0,
                            targetType: 0,
                            url: "瀵瑰瀵�"
                        },
                        {
                            header: "bvvbvb",
                            menuCategoryId: 1,
                            menuId: 19,
                            menuType: 2,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_whatsapp_info.html"
                        }
                    ],
                    header:'menu3',
                    menuType:2
                },{
                    childs: [
                        {
                            header: "dddddddddd",
                            menuCategoryId: 1,
                            menuId: 20,
                            menuType: 3,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_info.html"
                        },
                        {
                            header: "tttttttt",
                            menuCategoryId: 1,
                            menuId: 21,
                            menuType: 3,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_cache_info.html"
                        },
                        {
                            header: "hhhhh",
                            menuCategoryId: 1,
                            menuId: 22,
                            menuType: 3,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/thrid_user_info.html"
                        },
                        {
                            header: "jjjjjjjj",
                            menuCategoryId: 1,
                            menuId: 23,
                            menuType: 3,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_whatapp_info.html"
                        },
                        {
                            header: "mmmmmmmm",
                            menuCategoryId: 1,
                            menuId: 24,
                            menuType: 3,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_release_info.html"
                        },
                        {
                            header: "qqqqqqqqqq",
                            menuCategoryId: 1,
                            menuId: 25,
                            menuType: 3,
                            targetMethod: 0,
                            targetType: 0,
                            url: "瀵瑰瀵�"
                        },
                        {
                            header: "dffffffffffff",
                            menuCategoryId: 1,
                            menuId: 26,
                            menuType: 3,
                            targetMethod: 0,
                            targetType: 0,
                            url: "page/user/user_whatsapp_info.html"
                        }
                    ],
                    header:'menu4',
                    menuType:3
                }];

            },
            getUserMenus(){
                this.checkboxModel[0] = [1,2,3,4];
                this.checkboxModel[1] = [7,8,9,10];
                this.checkboxModel[2] = [13,14];
                this.checkboxModel[3] = [23,24];
//                this.checkboxModel[1][10] = 1; //当前用户的菜单权限
                let i;
                let j;
                for(i=0;i<4;i++){
                    for(j=1;j<7;j++){
                        if(!this.checkboxRadio[i]){
                            this.checkboxRadio[i] = [];
                        }
                        this.checkboxRadio[i][i*j*6+j]= 1;
                    }
                }
                console.log(this.checkboxRadio);
            }
        },
        mounted:function(){
            this.getAllRoles();
            this.getAllMenus();
            this.getUserMenus();
            this.getAllLangs();
        }
    }
</script>

<style scoped>
   section{
       margin-top:30px;
   }
   el-dialog{
       width:200px;
   }
   .el-input{width:180px;}
</style>