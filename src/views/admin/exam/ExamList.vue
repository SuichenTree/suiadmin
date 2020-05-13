<template>
    <div>
        <el-card class="box-card" shadow="always">
            <div slot="header">
                <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="2">
                        <span>测试列表页面</span>
                    </el-col>
                    <el-col :span="3">
                        <el-button size="small" type="primary" @click="toAddExam">新增测试</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="tableData" stripe style="width: 100%" >
                <el-table-column prop="examId" label="测试ID" ></el-table-column>
                <el-table-column prop="examName" label="测试名称"></el-table-column>
                <el-table-column prop="examType" label="测试类型"></el-table-column>
                <el-table-column prop="createTime" label="创建日期"></el-table-column>
                <el-table-column prop="examStatus" label="测试状态">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.examStatus === 1 ? 'success' : 'danger'">{{scope.row.examStatus == 1 ? "正常":"禁用"}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="questionNumber" label="题库数量">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.questionNumber === 0 ? 'danger' : 'primary'">{{scope.row.questionNumber}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="toEdit(scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="primary"
                        @click="toQuestion(scope.row)">题库</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="toDelete(scope.row)">删除</el-button>
                        
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分割线 -->
            <el-divider></el-divider>
            <!-- 分页 -->
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="12">
                    <div class="block">
                        <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5,10,20,30]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <!-- 测试新增对话框表单 -->
        <el-dialog title="测试新增管理" width="30%" :visible.sync="dialogFormAdd" :destroy-on-close="true" :before-close="handleClose" :close-on-click-modal="false">
            <el-form :model="form">
                <el-form-item label="测试名称">
                    <el-input v-model="form.examName"></el-input>
                </el-form-item>
                <el-form-item label="测试类型">
                    <el-input v-model="form.examType"></el-input>
                </el-form-item>
                <el-form-item label="测试状态" >
                    <el-switch v-model="form.examStatus" active-text="禁用" inactive-text="正常" :active-value="0" 
                    :inactive-value="1" active-color="#ff4949" inactive-color="#13ce66">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormAdd = false">取 消</el-button>
                <el-button type="primary" @click="AddExam">确定新增</el-button>
            </div>
        </el-dialog>

         <!-- 测试编辑对话框表单 -->
        <el-dialog title="测试编辑管理" width="30%" :visible.sync="dialogFormEdit" :destroy-on-close="true" :before-close="handleClose" :close-on-click-modal="false">
            <el-form :model="form">
                <el-form-item label="测试ID">
                <el-input v-model="form.examId" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="测试名称">
                <el-input v-model="form.examName"></el-input>
                </el-form-item>
                <el-form-item label="测试类型">
                <el-input v-model="form.examType"></el-input>
                </el-form-item>
                <el-form-item label="测试状态" >
                    <el-switch v-model="form.examStatus" active-text="禁用" inactive-text="正常" :active-value="0" 
                    :inactive-value="1" active-color="#ff4949" inactive-color="#13ce66">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEdit = false">取 消</el-button>
                <el-button type="primary" @click="EditExam">确定修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            //表格初始数据
            tableData: [],
            total:10,
            currentPage:1,
            pageSize:10,
            //控制对话框显示
            dialogFormEdit: false,
            dialogFormAdd: false,
            //对话框数据
            form: {
                examId:"",
                examName:"",
                examType:"",
                examStatus:""
            }
        }
    },methods:{
      //打开编辑对话框
      toEdit(obj){
          this.form.examId = obj.examId;
          this.form.examName = obj.examName;
          this.form.examType = obj.examType;
          this.form.examStatus = obj.examStatus;
          this.dialogFormEdit = true;
      },
      //修改测试Exam
      EditExam(){
          let that = this;
          let param = new URLSearchParams()
          param.append('examId', this.form.examId)
          param.append('examName', this.form.examName)
          param.append('examType', this.form.examType)
          param.append('examStatus', this.form.examStatus)
        
          this.$axios.put("/shu/admin/exam",param)
          .then(function(res){
              if(res.data.isSuccess === 1){
                  //隐藏对话框
                  that.dialogFormEdit = false;
                  //消息提示
                  that.$message.success('修改成功');
                  //通过空组件中转，来实现当前组件刷新
                  that.$router.push({path: '/empty',query:that.$router.currentRoute.fullPath})
              }else{
                  that.$message.error('修改失败,输入信息有误！！！');
              }
          }).catch(function(error){
              that.$message.error('服务器未响应，请等待！！！');
          })
      },
      //打开新增测试对话框
      toAddExam(){
         this.dialogFormAdd = true;
      },
      //增加测试Exam
      AddExam(){
          let that = this;
          let param = new URLSearchParams()
          param.append('name', this.form.examName)
          param.append('type', this.form.examType)
          param.append('status', this.form.examStatus)
          
          this.$axios.post("/shu/admin/exam",param)
          .then(function(res){
              if(res.data.isSuccess === 1){
                  //隐藏对话框
                  that.dialogFormAdd = false;
                  //消息提示
                  that.$message.success('新增成功');
                  //通过空组件中转，来实现当前组件刷新
                  that.$router.push({path: '/empty',query:that.$router.currentRoute.fullPath})
              }else{
                  that.$message.error('新增失败,输入信息有误！！！');
              }
          }).catch(function(error){
              that.$message.error('服务器未响应，请等待！！！');
          })
      },
      //删除测试
      toDelete(obj){
          let that = this;
            this.$confirm('此操作将永久删除该测试,以及包含的问题和问题选项, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete("/shu/admin/exam",{params: {examId:obj.examId}})
                .then(function (res) {
                  if(res.data.isSuccess == 1){
                      console.log("删除成功");
                       //删除成功消息提示
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        //通过空组件，来实现当前组件刷新
                        that.$router.push({path: '/empty',query:that.$router.currentRoute.fullPath})
                  }else{
                      console.log("删除失败");
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
      },
      //对话框关闭后的回调函数
      handleClose(done) {
        this.form.examId ="";
        this.form.examName ="";
        this.form.examType ="";
        this.form.examStatus ="";
        done();
      },
      //查询测试Exam的题库
      toQuestion(obj){
            this.$router.push({
                path: '/question/list',
                query: {
                    examId:obj.examId,
                }
            })
      },
      //分页处理1
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        //调用分页查询方法
        this.PaginationSelect();
      },
      //分页处理2
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        //调用分页查询方法
        this.PaginationSelect();
      },
      //分页查询
      PaginationSelect(){
        let that = this;
        this.$axios.get("/shu/admin/getAllExam",{params: {currentPage:this.currentPage,pageSize:this.pageSize}})
        .then(function (res) {
          //渲染表格分页
          that.tableData = res.data.tableData;
          that.total = res.data.totalNumber;
        })
        .catch(function (error) {
          console.log("服务器未响应，请等待！！");
        })
      }
    },mounted(){
        //调用分页查询方法
        this.PaginationSelect();
    }
}
</script>

<style>

</style>