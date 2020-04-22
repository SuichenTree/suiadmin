<template>
  <div>



<el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
  点我打开
</el-button>

<el-drawer
  :visible.sync="drawer"
  :with-header="false"
  size="20%">
  <div style="margin-top:20px;">
    <span @click="switchContent1">我的信息</span>
    <el-divider direction="vertical"></el-divider>
    <span @click="switchContent2">重置密码</span>
  </div>
  <el-divider></el-divider>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="18">
      <div v-if="c1">
        <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="头像">
                    <el-avatar shape="square" :size="40" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password"  placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.phone"  placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input-number v-model="form.age" @change="handleChange" :min="15" :max="60"></el-input-number>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.gender">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
        </el-form>
        <el-button type="warning">取消</el-button>
        <el-button  type="primary">确定修改</el-button>
      </div>
      <div v-if="c2">
        <el-input v-model="input" prefix-icon="el-icon-user-solid" placeholder="请输入姓名"></el-input>
        <el-input v-model="input" prefix-icon="el-icon-key" placeholder="请输入旧密码"></el-input>
        <el-input v-model="input" prefix-icon="el-icon-key" placeholder="请输入新密码"></el-input>
        <el-button type="warning">取 消2</el-button>
        <el-button  type="primary">确定</el-button>
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
      drawer:false,
      c1:true,
      c2:false,
      form: {
          username:"",
          password:"",
          phone:"",
          age:"",
          gender:"",
          address:"",
          email:"",
          headurl:"",
        }
      }
    },
     methods: {
       switchContent1(){
         console.log("111")
          this.c1 = true;
          this.c2 = false;
       },
       switchContent2(){
         console.log("222")
          this.c2 = true;
          this.c1 = false;
       }
    }
}
</script>

<style scoped>
.el-input{
  margin-bottom: 10px;
}
</style>