<template>
  <section>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item prop="username">
        <el-input name="username" type="text" v-model="loginForm.username" auto-complete="on" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input :type="pwdType" v-model="loginForm.password" auto-complete="on" placeholder="密码" @keyup.13.native="handleLogin"></el-input>
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
    const STATUS_CODE= {
        SUCCESS:'0',
        ACCOUT_BEN_BANNED :'10000004'
    };
    export default {
        data() {
            const validatePassword = (rule,value,callback)=>{
                if(value.length < 1){
                    callback(new Error('密码不能小于1位'))
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
                        let para = {loginName:this.loginForm.username,password:this.loginForm.password};
                        //NProgress.start();
                        this.$store.dispatch('loginByUserName',para).then((data)=>{
                            console.log(data);
                            this.logining = false;
                            if(data.code != 200){
                                this.$message({
                                    message: data.code == STATUS_CODE.ACCOUT_BEN_BANNED ? '账号被禁用' : '用户名或者密码错误',
                                    type:'error'
                                })
                            }else{
                                let {code, user } = data;
                                let menus = user.menus;
                                this.$store.dispatch('GenerateRoutes',{menus}).then( () => { // 生成可访问菜单
                                    this.$router.addRoutes(this.$store.getters.added_routes) //动态添加可访问路由表
                                    this.$router.push({ path: '/' });
                                }).catch(() => {
                                    console.log('gen route error');
                                    this.$store.dispatch('logOut');//清空token userinfo
                                    //this.$store.dispatch('RemoveRoutes'); //清空用户routes
                                    this.$router.push({ path: '/login' });
                                });

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
            document.querySelector('input[name="username"]').focus();
             
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