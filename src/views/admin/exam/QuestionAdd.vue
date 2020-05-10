<template>
  <div>
    <el-card class="box-card">
        <div slot="header" style="text-align:left;">
          <span>题目新增页面</span>
        </div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
          <el-row :gutter="20" type="flex" justify="center">
                <el-col :span="7">
                    <el-form-item label="所属测试ID">
                    <el-input v-model="form.examId" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="所属测试名称">
                    <el-input v-model="form.examName" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="7">
                <el-form-item label="问题状态" >
                  <el-switch v-model="form.questionStatus" active-text="禁用" inactive-text="正常" :active-value="0" 
                  :inactive-value="1" active-color="#ff4949" inactive-color="#13ce66">
                  </el-switch>
                </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-form-item label="问题类型">
                    <el-radio-group v-model="form.questionType">
                        <el-radio :label="1">单选题</el-radio>
                        <el-radio :label="2">多选题</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20" type="flex" justify="center">
            <el-col :span="7">
               <el-form-item label="问题描述">
                   <el-input type="textarea" autosize placeholder="请输入内容"
                        v-model="form.questionName">
                  </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
            </el-col>
          </el-row>
        </el-form>
        <el-button type="warning" @click="toBack" >返回</el-button>
        <el-button  type="primary" @click="updateUserInfo">确定创建</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
      return {
        form: {
          examId:"",
          examName:"",
          questionName:"",
          questionType:"",
          questionStatus:""
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
        this.$router.push({
            path: '/exam/question/list',
            query: {
                examId:this.form.examId
            }
        })
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
      this.$axios.get("/shu/admin/exam",{params: { examId:this.$route.query.examId}})
      .then(function (res) {
        if(res.data.isSuccess == 1){
            console.log("查询用户 success");
            that.form.examId = res.data.examId;
            that.form.examName = res.data.examName;
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