<template>
  <div class="hello">
    <img src="@/assets/logo.png" style="margin-top: 60px;">
    <h1>Welcome to SuichenTree 小程序后台</h1>
    <h2>管理员登录</h2>
    <div class="login-input">
      <el-row type="flex" class="row-bg" justify="center" :gutter="20">
        <el-col :span="5">
          <div class="grid-content bg-purple-light">
              <el-input class="login_input"  prefix-icon="el-icon-user-solid" placeholder="用户名" v-model="input_user"  clearable></el-input>
              <el-input class="login_input"  prefix-icon="el-icon-key" placeholder="密码" v-model="input_pwd" show-password></el-input>
              <el-button  type="success" @click="Login()" round>登录</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="footer">
      <el-link target="_blank" href="http://beian.miit.gov.cn/" style="color:white">皖ICP备19024221号</el-link>
      <span> | </span>
      <el-link target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42011102003766"  style="color:white"> 鄂公网安备42011102003766号</el-link>
    </div>
  </div>
</template>

<script>
//引入message组件
import { Message } from 'element-ui';

export default {
  name: 'HelloWorld',
  data () {
    return {
      input_user:"",
      input_pwd:""
    }
  },methods:{
    Login(){
      let that = this;
      if(this.input_user&&this.input_pwd){
        //调用后台请求
        //URLSearchParams对象会让参数用表单(键值对)的格式请求
        // let param = new URLSearchParams()
        // param.append('userName', this.input_user)
        // param.append('passWord', this.input_pwd)

        this.$axios.get('/shu/admin/login',{params: { userName:this.input_user,passWord:this.input_pwd}})
        .then(function (res) {
          console.log(res.data.isAdmin);
          if(res.data.isAdmin === 1){
              //提示
              that.$message.success('登录成功');
              //将登录信息赋值到全局变量中
              //传一个参数时
              that.$store.commit("modifyLoginStatus",1);
              //将登录的用户信息存储到全局变量中
              //传一个对象时
              that.$store.commit("addUserInfo",
                    {
                    headUrl:res.data.headUrl,
                    userName:res.data.userName,
                    userId:res.data.userId,
                    passWord:res.data.passWord,
                    isAdmin:res.data.isAdmin,
                    age:res.data.age,
                    gender:res.data.gender,
                    phone:res.data.phone,
                    email:res.data.email,
                    address:res.data.address
                  }
              )
              //跳转路由
              that.$router.push({ path: '/home' })
          }else{
              that.$message.error('登录失败,输入信息有误！！！');
          }
        })
        .catch(function (error) {
          that.$message.error('服务器未响应，请等待！！！');
        })
      }else{
         that.$message.warning('信息未填写完整！！！');
      }
    }
  }

}
</script>


<style scoped>
.hello{
  margin: 0;
	width: 100vw;
	height: 100vh;
	font-family: "Exo", sans-serif;
	color: #fff;
	background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradientBG 30s ease infinite;
}

@keyframes gradientBG {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

h1, h2 {
  font-weight: normal;
}
.login_input{
  margin-top:10px;
  margin-bottom:10px;
}
.footer{
 position:fixed;
 bottom:0;
 width:100vw;
 text-align:center;
 margin-bottom: 30px;
}
</style>
