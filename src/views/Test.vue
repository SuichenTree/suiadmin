<template>
  <div>
    <el-card class="box-card">
        <div slot="header">
          <el-row type="flex" class="row-bg" justify="space-between">
              <el-col :span="2">
                  <span>选项编辑页面</span>
              </el-col>
              <el-col :span="3">
                  <el-button size="small" type="primary">新增选项</el-button>
              </el-col>
          </el-row>
        </div>
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-row :gutter="20">
                <el-col :span="6">
                    <el-form-item label="所属问题ID">
                    <el-input v-model="questionId" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="所属问题类型">
                    <el-input v-model="questionType" :disabled="true"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="所属问题名称">
                    <el-input type="textarea" autosize v-model="questionName" :disabled="true" style="width:700px;">
                    </el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-divider>问题选项</el-divider>
            <el-row :gutter="20">
                <div v-if="optionNumber === 0">
                    <el-form-item>
                       <el-tag type="warning">暂无选项</el-tag>
                    </el-form-item>
                </div>
                <div v-else>
                  <div v-for="(item,index) in optionData" :key="index">
                    <el-col :span="12">
                      <el-form-item :label="'选项' + (index+1)">
                          <el-input type="textarea"  autosize v-model="item.optionContent" style="width:300px;"></el-input>
                      </el-form-item>
                      <el-form-item>
                          <el-switch
                            v-model="item.optionScore"
                            inactive-text="错误答案"
                            active-text="正确答案"
                            :active-value=1
                            :inactive-value=0>
                          </el-switch>
                      </el-form-item>
                      <el-form-item>
                          <i class="el-icon-delete" @click="deleteItem(item, index)"></i>
                      </el-form-item>
                    </el-col>
                  </div>
                </div>
            </el-row>
        </el-form>
        <el-button type="warning" @click="toBack" >返回</el-button>
        <el-button  type="primary">确定修改</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
    data() {
      return {
        questionId:"1",
        questionName:"已知声明并初始化二维数组。代码: int a[ ][ ]={{1,2},{3,4},{5,6}},则 a[1][1]的值为?",
        questionType:"dan",
        optionData:[
        {"optionContent":"1","optionStatus":1,"optionId":5,"optionScore":0},
        {"optionContent":"2","optionStatus":1,"optionId":6,"optionScore":0},
        {"optionContent":"4","optionStatus":1,"optionId":7,"optionScore":1},
        {"optionContent":"5","optionStatus":1,"optionId":8,"optionScore":0}],
        optionNumber:5,
        form: {
          examId:"",
          examName:"",
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
        addItem () {
          this.dynamicItem.push({
              option: ''
          })
        },
        deleteItem (item, index) {
          this.dynamicItem.splice(index, 1)
        },
        //查询问题下的选项
        findOptions(){
          let that = this;
          this.$axios.get("/shu/admin/optionByQId",{params: { questionId:this.questionId}})
          .then(function (res) {
            if(res.data.isSuccess == 1){
                console.log("查询问题下的选项 success");
                that.questionName = res.data.questionName;
                that.optionNumber = res.data.optionNumber;
                that.optionData = res.data.optionData;
            }else{
                console.log("查询问题下的选项 fail");
                that.optionNumber = res.data.optionNumber;
            }
          })
          .catch(function (error) {
            console.log("服务器未响应，请等待！！");
          })
        }
    },
    mounted(){
      //接受路由传值
      this.questionId = this.$route.query.questionId;
      
    }

}
</script>

<style scoped>
  
</style>