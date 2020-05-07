<template>
  <div>
    <el-card class="box-card">
        <div slot="header" style="text-align:left;">
          <span>用户添加页面</span>
        </div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="6">
              <el-form-item label="用户名">
                    <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="密码">
                    <el-input v-model="form.passWord"  placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="年龄">
                    <el-input-number v-model="form.age"  :min="15" :max="100"></el-input-number>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="6">
              <el-form-item label="地址">
                    <el-input v-model="form.address" placeholder="请输入地址"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="电话">
                    <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="6">
                <el-form-item label="头像">
                    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple style="height:200px">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
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
             <el-col :span="6">
                <el-form-item label="性别">
                    <el-radio-group v-model="form.gender">
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button type="warning" @click="toBack">返回</el-button>
        <el-button  type="primary" @click="addUser">确定新增</el-button>
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
      //新增用户
      addUser(){
          let that = this;
          let param = new URLSearchParams()
          param.append('name', this.form.userName)
          param.append('password', this.form.passWord)
          param.append('gender', this.form.gender)
          param.append('age', this.form.age)
          param.append('phone', this.form.phone)
          param.append('email', this.form.email)
          param.append('address', this.form.address)
          param.append('isAdmin',this.form.isAdmin)

          this.$axios.post("/shu/admin/user",param)
          .then(function(res){
              if(res.data.isSuccess === 1){
                  //消息提示
                  that.$message.success('新增成功');
                  that.$router.push({path: '/user/list'})
              }else{
                  that.$message.error('新增失败,输入信息有误！！！');
              }
          }).catch(function(error){
              that.$message.error('服务器未响应，请等待！！！');
          })
      },
     //返回用户列表组件
      toBack() {
        this.$router.push({path: '/user/list'})
      },
    }
}
</script>

<style scoped>
  
</style>