<template>
    <div>
        <el-card class="box-card" shadow="always">
            <div slot="header">
                <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="2">
                        <span>测试题目列表页面</span>
                    </el-col>
                    <el-col :span="4">
                        <el-button size="small" type="primary" @click="toAddUser">新增题目</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="所属测试ID">
                            <span>{{ props.row.examId }}</span>
                        </el-form-item>
                        <el-form-item label="所属测试名称">
                            <span>{{ props.row.examName }}</span>
                        </el-form-item>
                        <el-form-item label="问题ID">
                            <span>{{ props.row.questionId }}</span>
                        </el-form-item>
                        <el-form-item label="问题描述">
                            <span>{{ props.row.questionName }}</span>
                        </el-form-item>
                        <el-form-item label="问题类型">
                            <span>{{ props.row.questionType }}</span>
                        </el-form-item>
                        <el-form-item label="创建日期">
                            <span>{{ props.row.createTime }}</span>
                        </el-form-item>
                        <el-form-item label="问题状态">
                            <span>{{ props.row.questionStatus === 1 ? "正常":"禁用"}}</span>
                        </el-form-item>
                    </el-form>
                </template>
                </el-table-column>
                <el-table-column prop="questionId" label="问题ID" width="100"></el-table-column>
                <el-table-column prop="examName" label="所属测试名称" width="150"></el-table-column>
                <el-table-column prop="questionName" label="问题描述" show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="questionType" label="问题类型"></el-table-column>
                <el-table-column prop="questionStatus" label="问题状态">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.questionStatus === 1 ? 'success' : 'danger'">{{scope.row.questionStatus == 1 ? "正常":"禁用"}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="toEdit(scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="toDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-divider></el-divider>
            <!-- 分页 -->
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="12">
                    <div class="block">
                        <el-pagination
                        :page-size="10"
                        layout="total, prev, pager, next"
                        :total="total"
                        background>
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
          tableData: [],
          total:10,
        }
    },methods:{
      //跳转路由，路由传值
      toEdit(obj){
          this.$router.push({
               path: '/exam/question/edit',
               query: {
                   questionId:obj.questionId,
               }
          })
      },
      //新增用户
      toAddUser(){
           this.$router.push({path: '/user/add'})
      },
      //删除用户
      toDelete(obj){
          let that = this;
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete("/shu/admin/user",{params: {userId:obj.id}})
                .then(function (res) {
                  if(res.data.isSuccess == 1){
                      console.log("删除单个用户成功");
                       //删除成功消息提示
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        //通过空组件中转，来实现当前组件刷新
                        that.$router.push({path: '/empty',query:that.$route.path})
                  }else{
                      console.log("删除单个用户失败");
                        that.$message({
                            type: 'warning',
                            message: '删除失败!'
                        });
                  }
                })
                .catch(function (error) {
                    console.log("服务器未响应，请等待！！");
                    that.$message({
                            type: 'warning',
                            message: '服务器未响应，请等待！！！!'
                        });
                })
               
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
      }
    },mounted(){
        //接受路由传值
        let that = this;
        this.$axios.get("/shu/admin/getQuestionByExamId",{params: { examId:this.$route.query.examId}})
        .then(function (res) {
            if(res.data.isSuccess == 1){
                console.log("查询题库 success");
                //渲染表格分页
                that.tableData = res.data.tableData;
                that.total = res.data.totalNumber;
                that.$message({
                    type: 'success',
                    message: '查询成功!'
                });
            }else{
                console.log("查询题库 fail");
                that.$message({
                    type: 'warning',
                    message: '查询失败!'
                });
            }
        })
        .catch(function (error) {
            console.log("服务器未响应，请等待！！");
        })
        }
}
</script>

<style>
 .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>