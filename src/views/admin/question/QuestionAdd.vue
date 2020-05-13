<template>
  <div>
    <el-card class="box-card">
        <div slot="header" style="text-align:left;">
          <span>题目新增页面</span>
        </div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-row :gutter="20">
                <el-col :span="7" :offset="6">
                    <el-form-item label="所属测试名称">
                        <el-select v-model="examId" filterable clearable placeholder="请选择测试名称">
                            <el-option
                            v-for="item in examNameOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="6" :offset="6">
                    <el-form-item label="问题状态" >
                    <el-switch v-model="form.questionStatus" active-text="禁用" inactive-text="正常" :active-value="0" 
                    :inactive-value="1" active-color="#ff4949" inactive-color="#13ce66">
                    </el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="问题类型">
                    <el-radio-group v-model="form.questionType">
                        <el-radio label="单选题">单选题</el-radio>
                        <el-radio label="多选题">多选题</el-radio>
                    </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12" :offset="6">
                    <el-form-item label="问题描述" >
                        <el-input type="textarea" autosize placeholder="请输入内容"
                        v-model="form.questionName" style="width:600px;">
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-button type="warning" @click="toBack" >返回</el-button>
        <el-button  type="primary" @click="toAddQuestion">确定创建</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
      return {
        examNameOptions: [],
        examId:"",
        form: {
          questionName:"",
          questionType:"",
          questionStatus:""
        }
      }
    },
    methods: {
      //返回用户列表组件
      toBack() {
        this.$router.push({
            path: '/question/list',
            query: {
                examId:this.form.examId
            }
        })
      },
      //查询搜索下拉框选项
      SearchOption(){
        let that = this;
        this.$axios.get("/shu/admin/getSearchExamName")
        .then(function (res) {
            if(res.data.isSuccess == 1){
                console.log("查询搜索下拉框选项 success");
                that.examNameOptions = res.data.examNameOptions;
            }else{
                console.log("查询搜索下拉框选项 fail");
            }
        })
        .catch(function (error) {
            console.log("服务器未响应，请等待！！");
        })
      },
      //创建题目
      toAddQuestion(){
        let that = this;
        let param = new URLSearchParams()
        param.append('examId', this.examId)
        param.append('questionName', this.form.questionName)
        param.append('questionType', this.form.questionType)
        param.append('questionStatus', this.form.questionStatus)
        
        this.$axios.post("/shu/admin/question",param)
        .then(function (res) {
            if(res.data.isSuccess == 1){
                console.log("创建题目success");
                //消息提示
                that.$message.success('新增成功');
                that.$router.push({path: '/question/list',query: {examId:that.examId}})

            }else{
                console.log("创建题目fail");
            }
        })
        .catch(function (error) {
            console.log("服务器未响应，请等待！！");
        })
      }
    },
    created(){
      //搜索下拉框选项
      this.SearchOption();

    }

}
</script>

<style scoped>
  
</style>