<template>
  <div>
    <el-card class="box-card" shadow="always">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="用户名" style="width:400px;">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" style="width:400px;">
                    <el-input v-model="form.password"  placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="电话" style="width:400px;">
                    <el-input v-model="form.phone"  placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="年龄" style="width:400px;">
                    <el-input-number v-model="form.age" @change="handleChange" :min="15" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="性别" style="width:400px;">
                    <el-radio-group v-model="form.gender">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="地址" style="width:400px;">
                    <el-input v-model="form.address" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" style="width:400px;">
                    <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="头像" style="width:400px;">
                    <el-upload class="upload-demo" drag action="https://jsonplaceholder.typicode.com/posts/" multiple style="height:200px">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
            
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
      return {
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
      onSubmit() {
        console.log('submit!');
      }
    }
}
</script>

<style scoped>
  
</style>