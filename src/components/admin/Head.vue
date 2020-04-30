<template>
<div>
  <el-row>
    <el-col :span="20">
      <div style="text-align:left;font-size:20px">
        <span>SuichenTree 后台管理系统</span>
      </div>
    </el-col>
    <el-col :span="4">
        <el-menu mode="horizontal" background-color="rgb(138, 177, 228)" @select="handleSelect">
          <el-menu-item>
              <el-avatar shape="square" :size="50" :src="form.headUrl"></el-avatar>
          </el-menu-item>
          <el-menu-item>
              <span style="font-size:20px;color:black">{{form.userName}}</span>
          </el-menu-item>
          <el-menu-item>
            <el-dropdown>
              <i class="el-icon-s-tools" style="font-size:30px;color:black"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button type="text" @click="Rightdrawer = true">设置</el-button>
                </el-dropdown-item>
                <el-dropdown-item >
                  <el-button type="text" @click="logout">退出</el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </el-menu>
    </el-col>
  </el-row>
  <!-- 右边抽屉-我的信息和重置密码 -->
  <el-drawer
  :visible.sync="Rightdrawer"
  :with-header="false"
  :destroy-on-close="false"
  size="20%">
    <div style="margin-top:20px;">
      <span @click="switchContentC1">我的信息</span>
      <el-divider direction="vertical"></el-divider>
      <span @click="switchContentC2">重置密码</span>
    </div>
    <el-divider></el-divider>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="18">
      <div v-if="c1">
        <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="头像">
                    <el-avatar shape="square" :size="50" :src="form.headUrl"></el-avatar>
                </el-form-item>
                <el-form-item label="用户ID">
                    <span>{{form.userId}}</span>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.passWord"  placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.phone"  placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model="form.age"  :min="15" :max="60"></el-input-number>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.gender">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
        </el-form>
        <el-button type="warning" @click="cancelRightDrawer">取消</el-button>
        <el-button  type="primary" @click="updateUserInfo">确定修改</el-button>
      </div>
      <div v-if="c2">
        <el-input :value="this.form.userName" prefix-icon="el-icon-user-solid" placeholder="请输入姓名"></el-input>
        <el-input :value="this.form.passWord" prefix-icon="el-icon-key" placeholder="请输入旧密码"></el-input>
        <el-input v-model="newPassword" prefix-icon="el-icon-key" placeholder="请输入新密码"></el-input>
        <el-button type="warning" @click="cancelRightDrawer">取消</el-button>
        <el-button  type="primary" @click="updatePassword">确定</el-button>
      </div>
    </el-col>
    </el-row>
  </el-drawer>

</div>
</template>

<script>
export default {
    data() {
      return {
        Rightdrawer:false,
        c1:true,
        c2:false,
        newPassword:"",
        form: {
            headUrl:"",
            userName:"",  
            userId:"",      
            passWord:"",
            isAdmin:"",
            gender:"",
            age:"",
            phone:"",
            email:"",
            address:""
        }
    }
  },
    methods: {
      //显示我的信息界面
       switchContentC1(){
          this.c1 = true;
          this.c2 = false;
       },
       //显示修改密码界面
       switchContentC2(){
          this.c2 = true;
          this.c1 = false;
       },
       //关闭抽屉
       cancelRightDrawer(){
         this.Rightdrawer = false;
       },
      //退出登录
        logout(){
            this.$confirm('是否退出登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.$router.push("/login");
            }).catch(() => {
                
            });
        },
        //修改密码方法
        updatePassword(){

            let that = this;
            if(this.form.userName!=="" && this.form.passWord !== "" && this.newPassword !== ""){
                //参数以键值对的形式
                let param = new URLSearchParams()
                param.append('userName', this.form.userName)
                param.append('password', this.form.passWord)
                param.append('newPassword',this.newPassword)

                this.$axios.put("/shu/admin/updatePassword",param)
                .then(function (res) {
                  if(res.data.isSuccess === 1){
                      that.$message.success('修改成功');
                      //更新数据
                      that.$store.state.userInfo.passWord = that.newPassword;
                      that.newPassword = "";
                      //关闭抽屉
                      that.Rightdrawer = false;
                  }else{
                      that.$message.error('修改失败,输入信息有误！！！');
                  }
                })
                .catch(function (error) {
                   that.$message.error('服务器未响应，请等待！！！');
                })
            }else{
              that.$message.warning('信息未填写完整！！！');
            }

        },
        //修改个人用户信息方法
        updateUserInfo(){
          let that = this;
          //参数以键值对的形式
          let param = new URLSearchParams()
          param.append('userName', this.form.userName)
          param.append('passWord', this.form.passWord)
          param.append('headUrl', this.form.headUrl)
          param.append('userId', this.form.userId)
          param.append('gender', this.form.gender)
          param.append('age', this.form.age)
          param.append('phone', this.form.phone)
          param.append('email', this.form.email)
          param.append('address', this.form.address)

          this.$axios.put("/shu/admin/updateUserInfo",param)
          .then(function(res){
              if(res.data.isSuccess === 1){
                  //消息提示
                  that.$message.success('修改成功');
                  //更新数据
                  that.$store.state.userInfo.userName = that.form.userName;
                  that.$store.state.userInfo.passWord = that.form.passWord;
                  that.$store.state.userInfo.headUrl = that.form.headUrl;
                  that.$store.state.userInfo.userId = that.form.userId;
                  that.$store.state.userInfo.gender = that.form.gender;
                  that.$store.state.userInfo.age = that.form.age;
                  that.$store.state.userInfo.phone = that.form.phone;
                  that.$store.state.userInfo.email = that.form.email;
                  that.$store.state.userInfo.address = that.form.address;
                  //关闭抽屉
                  that.Rightdrawer = false;
              }else{
                  that.$message.error('修改失败,输入信息有误！！！');
              }
          }).catch(function(error){
              that.$message.error('服务器未响应，请等待！！！');
          })
        },
        handleSelect (index, indexPath) {
          console.log("===="+index)
          console.log("===="+indexPath);
          // this.indexBreadcrumbs = indexPath
        }
    },
    created(){
      //如果成功登录
       if(this.$store.state.loginStatus===1){
            this.form = this.$store.state.userInfo;
        }
    }
  }
</script>

<style>
.el-header{
    background-color: rgb(138, 177, 228);
    color: #333;
    text-align: center;
    line-height: 60px;
}
</style>

