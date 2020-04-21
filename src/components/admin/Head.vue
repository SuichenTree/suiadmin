<template>
<div>
  <el-row>
    <el-col :span="20">
      <div style="text-align:left;font-size:20px">
        <span>SuichenTree 后台管理系统</span>
      </div>
    </el-col>
    <el-col :span="4">
        <!-- <div style="text-align:right;font-size:20px">
          <div>
              <el-avatar shape="square" :size="50" :src="headUrl"  v-if="isLogin"></el-avatar>
              <el-avatar shape="square" :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" v-else></el-avatar>
          </div>
          <span>{{form.username}}</span>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right:15px;font-size:25px;"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div> -->

        <el-menu mode="horizontal" background-color="rgb(138, 177, 228)" >
          <el-menu-item>
              <el-avatar shape="square" :size="50" :src="headUrl"  v-if="isLogin"></el-avatar>
              <el-avatar shape="square" :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" v-else></el-avatar>
          </el-menu-item>
          <el-menu-item>
              <span style="font-size:20px;color:black">{{form.username}}</span>
          </el-menu-item>
          <el-menu-item>
            <el-dropdown>
              <i class="el-icon-s-tools" style="font-size:30px;color:black"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item  @click="dialogVisible = true">修改密码</el-dropdown-item>
                <el-dropdown-item  @click="logout()">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-menu-item>
        </el-menu>
    </el-col>
  </el-row>
  <!-- 重置密码框 -->
  <el-dialog title="修改密码" :visible.sync="dialogVisible">
      <el-form :model="form">
          <el-form-item label="用户名" label-width="120px">
              <el-input
                  prefix-icon="el-icon-user-solid"
                  v-model="form.username">
              </el-input>
          </el-form-item>
          <el-form-item label="旧密码" label-width="120px">
              <el-input
                  prefix-icon="el-icon-key"
                  v-model="form.password">
              </el-input>
          </el-form-item>
          <el-form-item label="新密码" label-width="120px">
              <el-input
                  prefix-icon="el-icon-key"
                  v-model="form.newPassword">
              </el-input>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updatePassword()">确 定</el-button>
      </div>
  </el-dialog>
</div>
</template>

<script>
export default {
    data() {
      return {
        dialogVisible:false,
        isLogin:false,
        headUrl:"",
        form:{
            username:"",
            password:"",
            newPassword:"",
        }
      };
    },
    methods: {
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
        updatePassword(){
            let that = this;
            if(this.form.username!=="" && this.form.password !== "" && this.form.newPassword !== ""){
              
                let param = new URLSearchParams()
                param.append('userName', this.form.username)
                param.append('password', this.form.password)
                param.append('newPassword',this.form.newPassword)

                axios.post("/shu/admin/updatePassword",param)
                .then(function (res) {
                console.log(res.data.isSuccess);
                if(res.data.isSuccess === 1){
                    that.$message.success('修改成功');

                    //更新数据
                    that.$GlobalData.userInfo.password = that.form.newPassword
                    that.form.password = that.form.newPassword;
                    that.form.newPassword = "";

                }else{
                    that.$message.error('修改失败,输入信息有误！！！');
                }
                })
                .catch(function (error) {
                that.$message.error('服务器未响应，请等待！！！');
                })
            }else{
               //提示
              that.$message.warning('信息未填写完整！！！');
            }

            //对话框隐藏
            that.dialogVisible = false;
        }
    },
    created(){
       if(this.$store.state.loginStatus===1){
            this.isLogin = true;
            this.headUrl = this.$store.state.userInfo.headURL;
            this.form.username = this.$store.state.userInfo.userName;
            this.form.password = this.$store.state.userInfo.password;
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

