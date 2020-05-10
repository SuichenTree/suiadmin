<template>
    <div>
        <el-card class="box-card" shadow="always">
            <div slot="header">
                <el-row :gutter="20">
                  <el-col :span="2"><span>题目列表页面</span></el-col>
                  <el-col :span="3">
                     <el-input v-model="input" placeholder="请输入测试名称"></el-input>
                  </el-col>
                  <el-col :span="3">
                     <el-input v-model="input" placeholder="请输入题目类型"></el-input>
                  </el-col>
                  <el-col :span="3" :offset="12"><el-button size="small" type="primary" @click="toAddQuestion">新增题目</el-button></el-col>
                </el-row>
                <!-- <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="2">
                        <span>题目列表页面</span>
                    </el-col>
                    <el-col :span="4">
                        <el-button size="small" type="primary" @click="toAddQuestion">新增题目</el-button>
                    </el-col>
                </el-row> -->
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
                <el-table-column prop="questionName" label="问题描述" :show-overflow-tooltip="true"></el-table-column>
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
                        @click="toQuestionEdit(scope.row)">问题编辑</el-button>
                         <el-button
                        size="mini"
                        @click="toEdit(scope.row)">选项编辑</el-button>
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
         <!-- 问题编辑对话框表单 -->
        <el-dialog title="问题编辑管理" width="30%" :visible.sync="dialogFormQuestionEdit" :destroy-on-close="true" :before-close="handleClose" :close-on-click-modal="false">
            <el-form :model="form">
                <el-form-item label="问题ID">
                <el-input v-model="form.questionId" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="问题描述">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容"
                        v-model="form.questionName">
                    </el-input>
                </el-form-item>
                <el-form-item label="问题类型">
                        <el-radio-group v-model="form.questionType">
                            <el-radio label="单选题">单选题</el-radio>
                            <el-radio label="多选题">多选题</el-radio>
                        </el-radio-group>
                </el-form-item>
                <el-form-item label="问题状态" >
                    <el-switch v-model="form.questionStatus" active-text="禁用" inactive-text="正常" :active-value="0" 
                    :inactive-value="1" active-color="#ff4949" inactive-color="#13ce66">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormQuestionEdit = false">取 消</el-button>
                <el-button type="primary" @click="EditQuestionInfo">确定修改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dialogFormQuestionEdit:false,
            tableData: [],
            total:10,
            examId:"",
            currentPage:1,
            pageSize:10,
            form: {
                questionId:"",
                questionName:"",
                questionType:"",
                questionStatus:""
            }
        }
    },methods:{
        //对话框关闭后的回调函数
        handleClose(done) {
            this.form.questionId ="";
            this.form.questionName ="";
            this.form.questionType ="";
            this.form.questionStatus ="";
            done();
        },
        //问题编辑
        toQuestionEdit(obj){
            this.form.questionId = obj.questionId;
            this.form.questionName = obj.questionName;
            this.form.questionType = obj.questionType;
            this.form.questionStatus = obj.questionStatus;
            this.dialogFormQuestionEdit = true;
        },
        //修改问题信息
        EditQuestionInfo(){
            let that = this;
            let param = new URLSearchParams()
            param.append('questionId', this.form.questionId)
            param.append('questionName', this.form.questionName)
            param.append('questionType', this.form.questionType)
            param.append('questionStatus', this.form.questionStatus)
            
            this.$axios.put("/shu/admin/question",param)
            .then(function(res){
                if(res.data.isSuccess === 1){
                    //隐藏对话框
                    that.dialogFormQuestionEdit = false;
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
        //新增题目
        toAddQuestion(){
            this.$router.push({
               path: '/exam/question/add',
               query: {
                   examId:this.examId
               }
          })
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
                       that.$router.push({path: '/empty',query:that.$router.currentRoute.fullPath})
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
            this.$axios.get("/shu/admin/getAllQuestion",{params: { examId:this.$route.query.examId,currentPage:this.currentPage,pageSize:this.pageSize}})
            .then(function (res) {
                if(res.data.isSuccess == 1){
                    console.log("查询题库 success");
                    //渲染表格分页
                    that.tableData = res.data.tableData;
                    that.total = res.data.totalNumber;
                }else{
                    console.log("查询题库 fail");
                }
            })
            .catch(function (error) {
                console.log("服务器未响应，请等待！！");
            })
        }
    },mounted(){
        //接受路由传值
        let that = this;
        this.examId = this.$route.query.examId;
        this.PaginationSelect();
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