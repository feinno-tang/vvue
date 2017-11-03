<template>
    <section>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input :type="pwdType" v-model="loginForm.password" auto-complete="off" placeholder="密码" @keyup.enter="handleLogin"></el-input>
                <span class="show-pwd" @click="showPwd"><i class="fa fa-eye"></i></span>
            </el-form-item>
            <!--<el-checkbox v-model="checked" checked class="remember" @click="rememPwd">记住密码</el-checkbox>-->
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin" :loading="logining">登录</el-button>
                <!--<el-button @click.native.prevent="handleReset">重置</el-button>-->
            </el-form-item>
        </el-form>
    </section>
</template>
<script>
    export default {
        data() {
            const validatePassword = (rule,value,callback)=>{
                if(value.length < 6){
                    callback(new Error('密码不能小于6位'))
                }else{
                    callback()
                }
            };
            return {
                logining: false,
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { validator:validatePassword ,trigger:'blur'}
                    ]
                },
                checked: true,
                pwdType:'password'
            };
        },
        methods: {
            showPwd(){
                this.pwdType = (this.pwdType === 'password') ? '': 'password';
            },
            rememPwd(){

            },
            handleReset() {
                this.$refs.loginForm.resetFields();
            },
            handleLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.logining = true;
                        //NProgress.start();
                        this.$store.dispatch('loginByUserName',this.loginForm).then((data)=>{
                             this.logining = false;
                             let {msg, code, user } = data;
                             if(code != '200'){
                                 console.log(code)
                                 this.$message({
                                     message:msg,
                                     type:'error'
                                 })
                             }else{
                                 this.$router.push({ path: '/' });
                             }
                         }).catch(()=>{
                            console.log('error!!');
                            return false;
                         })
                    }else{
                        console.log('error submit!!');
                        return false;
                    }
            });
        }
        },
        mounted(){

        }
    }
</script>
<style scoped>
    .login-container {
        position: fixed;
        top: 50%;
        left: 50%;
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: -155px auto auto -190px;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }
    .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
    }
    .remember {
        margin: 0px 0px 35px 0px;
    }
    .show-pwd{
        position: absolute;
        right: 10px;
        top: 0px;
        cursor: pointer;
    }
</style>