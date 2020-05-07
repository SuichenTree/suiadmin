<template>
  <div>
    <el-card class="box-card">
        <div slot="header" style="text-align:left;">
          <span>题目编辑页面</span>
        </div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
                <el-form-item label="所属测试名称">
                    <el-input v-model="form.phone" placeholder="请输入所属测试名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="问题ID">
                  <el-input v-model="form.userName" placeholder="请输入问题ID"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
                <el-form-item label="问题类型">
                    <el-radio-group v-model="form.gender">
                        <el-radio :label="1">单选题</el-radio>
                        <el-radio :label="2">多选题</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="问题状态" >
                  <el-switch v-model="form.examStatus" active-text="禁用" inactive-text="正常" :active-value="0" 
                  :inactive-value="1" active-color="#ff4949" inactive-color="#13ce66">
                  </el-switch>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="8">
              <el-form-item label="问题描述">
                  <el-input type="textarea" autosize v-model="form.userName" placeholder="请输入问题描述" style="width:400px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
            </el-col>
          </el-row>
          <el-divider>下面是问题选项编辑</el-divider>
          <el-row :gutter="20" type="flex" justify="center" >
            <el-col :span="8" v-for="(item,index) in dynamicItem" :key="index">
                 <el-form-item
                    :label="'选项' + (index+1)"
                    :prop="'dynamicItem.' + index + '.option'"
                >
                    <el-input v-model="item.option"></el-input>
                </el-form-item>
                <el-form-item>
                    <i class="el-icon-delete" @click="deleteItem(item, index)"></i>
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-button type="warning" @click="toBack" >返回</el-button>
        <el-button @click="addItem" type="primary">增加</el-button>
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
        },
        dynamicItem: [
            {
                option: ''
            }
        ]
      }
    },
    methods: {
      //返回用户列表组件
      toBack() {
        this.$router.push({path: '/user/list'})
      },
      addItem () {
        this.dynamicItem.push({
            option: ''
        })
        },
        deleteItem (item, index) {
        this.dynamicItem.splice(index, 1)
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