<template>
  <div>
    <el-card class="box-card">
        <div slot="header" style="text-align:left;">
          <span>题目编辑页面</span>
        </div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="6">
              <el-form-item label="用户名">
                  <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="电话">
                    <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="性别">
                    <el-radio-group v-model="form.gender">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="6">
              <el-form-item label="地址">
                    <el-input
                      type="textarea"
                      autosize
                      placeholder="请输入地址"
                      v-model="form.address">
                    </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                    <el-switch
                      v-model="form.isAdmin"
                      active-text="管理员"
                      inactive-text="非管理员"
                      :active-value="1"
                      :inactive-value="0">
                    </el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="6">
                <el-form-item label="头像">
                    <el-avatar shape="square" :size="50" :src="form.headUrl"></el-avatar>
                </el-form-item>
            </el-col>
             <el-col :span="6">
               <el-form-item label="年龄">
                    <el-input-number v-model="form.age" :min="15" :max="100"></el-input-number>
                </el-form-item>
            </el-col>
             <el-col :span="6">
                  
            </el-col>
          </el-row>
        </el-form>
        <el-button type="warning" @click="toBack" >返回</el-button>
        <el-button  type="primary" @click="updateUserInfo">确定修改</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
      return {
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
      //返回用户列表组件
      toBack() {
        this.$router.push({path: '/user/list'})
      },
      //修改用户信息
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
          param.append('isAdmin',this.form.isAdmin)

          this.$axios.put("/shu/admin/user",param)
          .then(function(res){
              if(res.data.isSuccess === 1){
                  //消息提示
                  that.$message.success('修改成功');
                  that.$router.push({path: '/user/list'})
              }else{
                  that.$message.error('修改失败,输入信息有误！！！');
              }
          }).catch(function(error){
              that.$message.error('服务器未响应，请等待！！！');
          })
      }
    },
    created(){
      //接受路由传值
      let that = this;
      this.$axios.get("/shu/admin/user",{params: { userId:this.$route.query.userId}})
      .then(function (res) {
        if(res.data.isSuccess == 1){
            console.log("查询用户 success");
            that.form.headUrl = res.data.headUrl;
            that.form.userId = res.data.userId;
            that.form.userName = res.data.userName;
            that.form.phone = res.data.phone;
            that.form.isAdmin = res.data.isAdmin;
            that.form.gender = res.data.gender;
            that.form.age = res.data.age;
            that.form.email = res.data.email;
            that.form.address = res.data.address;
        }else{
            console.log("查询用户 fail");
        }
      })
      .catch(function (error) {
        console.log("服务器未响应，请等待！！");
      })
    }

}
</script>

<style scoped>
  
</style>