<template>
    <section>
        <!--新建账号-->
        <el-form :inline="true" :model="account" :rules="rules" ref="accountForm" class="demo-form-inline">
            <el-form-item label="用户名" prop="loginName">
                <el-input v-model.trim="account.loginName" placeholder="输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model.trim="account.password" type="password" placeholder="输入密码" auto-complete="false"></el-input>
            </el-form-item>
            <el-date-picker style="display:none;" v-model="account.cTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
            <el-button type="primary" @click="createAccount('accountForm')" icon="plus">创建</el-button>
            <el-button style="display:none;" type="primary" @click="searchAccount('accountForm')" icon="search">查询</el-button>
        </el-form>

        <!---工具条-->
        <el-select v-model="pageSize" :value="pageSize" placeholder="" style="display:none;">
            <el-option
                    v-for="item in sizeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>

        <!--- 列表-->
        <el-table :data="users" v-model="users" v-loading="listLoading" stripe height="380" style="width:100%" >
            <el-table-column prop="id" label="用户ID" width="200px"></el-table-column>
            <el-table-column prop="name" label="用户名称" width="100px"></el-table-column>
            <el-table-column  prop="role" label="用户类型" width="240px">
                <template scope="scope">
                    <el-select style="width:150px;" v-model="scope.row.role" placeholder="请选择" >
                        <el-option
                                v-for="item in roleOptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" size="small" @click="handleEditRole(scope.row)">修改</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="cTime" sortable label="创建时间" width="150px"></el-table-column>
            <el-table-column label="操作" width="400">
                <template scope="scope">
                    <el-input width="210" prop="password" v-model="scope.row.password" type="password" placeholder="新密码"></el-input>
                    <el-button size="small" @click="handleEditPwd(scope.row)">修改密码</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.row)">删除用户</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页-->
        <el-col :span="24" class="toolbar">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
            <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
            </div>
        </el-dialog>

    </section>
</template>

<script>
    import { getUserListPage, removeUser, editUser, addUser ,getRoles} from '../../api/system';
    export default {
        data(){
            let checkName = (rule, value, callback)=>{
                if(!value){
                    return callback(new Error('请输入用户名'));
                }
                callback();
            };
            let checkPass = (rule, value, callback)=>{
                if(!value){
                    return callback(new Error('请输入密码'));
                }
                callback();
            };
            return{
                filters:{
                    name:''
                },
                account:{
                    loginName:'',
                    password:'',
                    cTime:''
                },
                sizeOptions:[{
                    value:10,
                    label:10
                },{
                    value:20,
                    label:20
                },{
                    value:30,
                    label:30
                },{
                    value:50,
                    label:50
                }],
                roleOptions :{},
                rules:{
                    loginName:[{validator:checkName, trigger:'blur'}],
                    password:[{validator:checkPass, trigger:'blur'}]
                },
                currentPage:1,
                total:0,
                pageSize:10,
                editFormVisible:false,//默认隐藏编辑弹窗
                editLoading: false,
                listLoading:false,
                //编辑界面数据
                editForm: {
                    id: 0,
                    name: ''
                },
                editFormRules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ]
                },
                users:[]
            }
        },
        watch:{
            'pageSize':function(newVal, oldVal){
                //
            }
        },
        methods:{
            createAccount(formName){
                this.$refs[formName].validate((valid)=>{
                    if(valid){
                        debugger;
                        let param = Object.assign({},this.account,{role:1});
                        console.log(param);
                        addUser(param).then((res)=>{
                        this.$message({
                            message: '创建成功',
                            type: 'success'
                        });
                        this.$refs[formName].resetFields();
                        this.getUsers();
                    });
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            
            //获取用户列表
            getUsers() {
                let para = {
                    no: this.currentPage,
                    //name: this.filters.name,
                    size: this.pageSize
                };
                this.listLoading = true;
                //NProgress.start();
                getUserListPage(para).then((res) => {
                    console.log(res);
                    this.total = res.data.total;
                    this.users = res.data.users;
                    this.listLoading = false;
                    //NProgress.done();
                });
            },
            handleEditRole(row){
                let para = Object.assign({},{userId: row.id, role:row.role});
                editUser(para).then((res)=>{
                    console.log(res);
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                    this.getUsers();
                })
            },
            handleEditPwd(row){
                if(row.password == ''){
                    this.$message.error({message:'请输入新密码！'})
                    return false;
                }
                console.log(row);
                let para = Object.assign({},{userId: row.id, password:row.password});
                editUser(para).then((res)=>{
                    console.log(res);
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                    this.getUsers();
                })
            },
            //删除
            handleDel(row) {
                this.$confirm('确认删除:'+row.name+'吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    //NProgress.start();
                    let para = { id: row.id };
                    removeUser(para).then((res) => {
                        this.listLoading = false;
                        //NProgress.done();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.getUsers();
                    });
                }).catch(() => {
                       alert('删除失败'); 
                });
            },
            handleSizeChange(val){
                this.pageSize = val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getUsers();
                console.log(`当前页: ${val}`);
            }
        },
        mounted(){
            getRoles({}).then((data)=>{ ////获取权限/角色列表
                console.log(data);
                this.roleOptions = [
                    {value:1, label:'系统管理员'},
                    {value:2,label:'运营人员'},
                    {value:3,label:'客服人员' },
                    {value:4,label:'普通用户'}
                ] 
                 this.getUsers();//用户列表    
            }).catch(()=>{
                console.log('roles error!')
            }); 
           
            
        }
    }
</script>

<style scoped>
    .demo-form-inline{
        margin-top: 20px;
    }
    .el-select{margin-bottom: 20px;}
    .el-input{width:180px;}
    .el-select .el-input{width:130px;}
</style>