<template>
    <div>
        <el-card class="box-card" shadow="always">
            <div slot="header">
                <el-row :gutter="20">
                    <el-col :span="2"><span>选项列表页面</span></el-col>
                    <el-col :span="3">
                        <el-select v-model="questionId" filterable clearable placeholder="请选择问题编号">
                            <el-option
                            v-for="item in questionIdOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="1">
                        <el-button size="small" type="warning" plain @click="searchQuestion">搜索</el-button>
                    </el-col>
                    <el-col :span="2" offset="14">
                        <el-button size="small" type="primary" @click="openOptionAdd">新增选项</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="所属问题ID">
                            <span>{{ props.row.questionId }}</span>
                        </el-form-item>
                        <el-form-item label="所属问题描述">
                            <span>{{ props.row.questionName }}</span>
                        </el-form-item>
                        <el-form-item label="所属问题类型">
                            <span>{{ props.row.questionType }}</span>
                        </el-form-item>
                        <el-form-item label="选项ID">
                            <span>{{ props.row.optionId }}</span>
                        </el-form-item>
                        <el-form-item label="选项描述">
                            <span>{{ props.row.optionContent }}</span>
                        </el-form-item>
                        <el-form-item label="选项分数">
                            <span>{{ props.row.optionScore }}</span>
                        </el-form-item>
                        <el-form-item label="创建日期">
                            <span>{{ props.row.createTime }}</span>
                        </el-form-item>
                        <el-form-item label="选项状态">
                            <span>{{ props.row.optionStatus === 1 ? "正常":"禁用"}}</span>
                        </el-form-item>
                    </el-form>
                </template>
                </el-table-column>
                <el-table-column prop="optionId" label="选项ID" width="150"></el-table-column>
                <el-table-column prop="questionId" label="所属问题ID" width="150"></el-table-column>
                <el-table-column prop="questionType" label="所属问题类型" width="150"></el-table-column>
                <el-table-column prop="questionName" label="所属问题描述" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="optionContent" label="选项描述" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="optionScore" label="选项分数">
                     <template slot-scope="scope">
                        <el-tag :type="scope.row.optionScore === 1 ? 'success' : 'danger'">{{scope.row.optionScore == 1 ? "正确答案":"错误答案"}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="optionStatus" label="选项状态">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.optionStatus === 1 ? 'success' : 'danger'">{{scope.row.optionStatus == 1 ? "正常":"禁用"}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="openOptionEdit(scope.row)">编辑选项</el-button>
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
        <!-- 选项编辑对话框表单 -->
        <el-dialog title="选项编辑管理" width="30%" :visible.sync="dialogFormOptionEdit" :destroy-on-close="true" :before-close="handleClose" :close-on-click-modal="false">
            <el-form :model="form">
                <el-form-item label="选项ID">
                <el-input v-model="form.optionId" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="选项描述">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容"
                        v-model="form.optionContent">
                    </el-input>
                </el-form-item>
                <el-form-item label="选项类型">
                        <el-radio-group v-model="form.optionScore">
                            <el-radio :label=1>正确答案</el-radio>
                            <el-radio :label=0>错误答案</el-radio>
                        </el-radio-group>
                </el-form-item>
                <el-form-item label="选项状态" >
                    <el-switch v-model="form.optionStatus" active-text="禁用" inactive-text="正常" :active-value="0" 
                    :inactive-value="1" active-color="#ff4949" inactive-color="#13ce66">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormOptionEdit = false">取 消</el-button>
                <el-button type="primary" @click="EditOptionInfo">确定修改</el-button>
            </div>
        </el-dialog>
        <!-- 选项新增对话框表单 -->
        <el-dialog title="选项创建管理" width="30%" :visible.sync="dialogFormOptionAdd" :destroy-on-close="true" :before-close="handleClose" :close-on-click-modal="false">
            <el-form :model="form">
                <el-form-item label="所属问题ID">
                <el-input v-model="questionId"></el-input>
                </el-form-item>
                <el-form-item label="选项描述">
                    <el-input type="textarea" :rows="2" placeholder="请输入内容"
                        v-model="form.optionContent">
                    </el-input>
                </el-form-item>
                <el-form-item label="选项类型">
                        <el-radio-group v-model="form.optionScore">
                            <el-radio :label=1>正确答案</el-radio>
                            <el-radio :label=0>错误答案</el-radio>
                        </el-radio-group>
                </el-form-item>
                <el-form-item label="选项状态" >
                    <el-switch v-model="form.optionStatus" active-text="禁用" inactive-text="正常" :active-value="0" 
                    :inactive-value="1" active-color="#ff4949" inactive-color="#13ce66">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormOptionAdd = false">取 消</el-button>
                <el-button type="primary" @click="AddOptionInfo">确定创建</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            //控制对话框显示
            dialogFormOptionEdit:false,
            dialogFormOptionAdd:false,
            //表格默认初始数据
            tableData: [],
            total:10,
            currentPage:1,
            pageSize:10,
            //问题数据
            questionId:"",
            //对话框表单数据
            form: {
                optionId:"",
                optionContent:"",
                optionScore:"",
                optionStatus:""
            },
            //搜索框数据
            questionIdOptions: []
        }
    },methods:{
        //对话框关闭后的回调函数
        handleClose(done) {
            this.form.optionId ="";
            this.form.optionContent ="";
            this.form.optionScore ="";
            this.form.optionStatus ="";
            done();
        },
        //打开选项创建对话框
        openOptionAdd(){
            this.dialogFormOptionAdd = true;
        },
        //打开选项编辑对话框
        openOptionEdit(obj){
            this.form.optionId = obj.optionId;
            this.form.optionContent = obj.optionContent;
            this.form.optionScore = obj.optionScore;
            this.form.optionStatus = obj.optionStatus;
            this.dialogFormOptionEdit = true;
        },
        //修改选项信息
        EditOptionInfo(){
            let that = this;
            let param = new URLSearchParams()
            param.append('optionId', this.form.optionId)
            param.append('optionContent', this.form.optionContent)
            param.append('optionScore', this.form.optionScore)
            param.append('optionStatus', this.form.optionStatus)
            
            this.$axios.put("/shu/admin/option",param)
            .then(function(res){
                if(res.data.isSuccess === 1){
                    //隐藏对话框
                    that.dialogFormOptionEdit = false;
                    //消息提示
                    that.$message.success('修改成功');
                    //执行分页查询
                    that.PaginationSelect();
                }else{
                    that.$message.error('修改失败,输入信息有误！！！');
                }
            }).catch(function(error){
                that.$message.error('服务器未响应，请等待！！！');
            })
        },
        //新增选项
        AddOptionInfo(){
            let that = this;
            let param = new URLSearchParams()
            param.append('questionId', this.questionId)
            param.append('optionContent', this.form.optionContent)
            param.append('optionScore', this.form.optionScore)
            param.append('optionStatus', this.form.optionStatus)
            
            this.$axios.post("/shu/admin/option",param)
            .then(function(res){
                if(res.data.isSuccess === 1){
                    //隐藏对话框
                    that.dialogFormOptionAdd = false;
                    //消息提示
                    that.$message.success('新增成功');
                    //执行分页查询
                    that.PaginationSelect();
                }else{
                    that.$message.error('新增失败,输入信息有误！！！');
                }
            }).catch(function(error){
                that.$message.error('服务器未响应，请等待！！！');
            })
        },
        //删除选项
        toDelete(obj){
            let that = this;
            this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete("/shu/admin/option",{params: {optionId:obj.optionId}})
                .then(function (res) {
                if(res.data.isSuccess == 1){
                    console.log("删除选项成功");
                    //删除成功消息提示
                    that.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    //执行分页查询
                    that.PaginationSelect();
                }else{
                    console.log("删除选项失败");
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
            this.$axios.get("/shu/admin/getAllOption",
            {params: 
                {   questionId:this.questionId,
                    currentPage:this.currentPage,
                    pageSize:this.pageSize
                }
            })
            .then(function (res) {
                if(res.data.isSuccess == 1){
                    console.log("查询选项组 success");
                    //渲染表格分页
                    that.tableData = res.data.tableData;
                    that.total = res.data.totalNumber;
                }else{
                    console.log("查询选项组 fail");
                }
            })
            .catch(function (error) {
                console.log("服务器未响应，请等待！！");
            })
        },
        //搜索问题编号下拉框
        SearchQuestionIds(){
            let that = this;
            this.$axios.get("/shu/admin/getSearchQuestionId")
            .then(function (res) {
                if(res.data.isSuccess == 1){
                    console.log("查询搜索下拉框选项 success");
                    that.questionIdOptions = res.data.questionIdOptions;
                }else{
                    console.log("查询搜索下拉框选项 fail");
                }
            })
            .catch(function (error) {
                console.log("服务器未响应，请等待！！");
            })
        },
        //点击搜索按钮
        searchQuestion(){
            this.PaginationSelect();
        }
    },mounted(){
        //接受路由传值，分页查询
        let that = this;
        this.questionId = this.$route.query.questionId;
        this.PaginationSelect();

        //搜索下拉框选项
        this.SearchQuestionIds();
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