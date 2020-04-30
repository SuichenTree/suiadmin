<template>
  <div>
    <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

<el-dialog title="用户添加" :visible.sync="dialogFormVisible">  

   <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="6">
              <el-form-item label="用户名">
                    <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="密码">
                    <el-input v-model="form.password"  placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item label="年龄">
                    <el-input-number v-model="form.age" @change="handleChange" :min="15" :max="100"></el-input-number>
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
                <el-form-item label="性别">
                    <el-radio-group v-model="form.gender">
                        <el-radio label="男"></el-radio>
                        <el-radio label="女"></el-radio>
                    </el-radio-group>
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
                
            </el-col>
             <el-col :span="6">
            </el-col>
          </el-row>
        </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
</el-dialog>



  </div>
</template>

<script>

export default {
    data() {
      return {
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '100px'
      };
    },
    methods: {
     
    }
}
</script>

<style scoped>
  
</style>