<template>
    <div>
        <el-card class="box-card" shadow="always">
            <div slot="header">
                <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="2">
                        <span>用户列表页面</span>
                    </el-col>
                    <el-col :span="4">
                        <el-button size="small" type="warning" @click="deleteUsers">批量删除</el-button>
                        <el-button size="small" type="primary" @click="toAddUser">新增用户</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="tableData" stripe style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="用户ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="姓名">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="性别">
                            <span>{{ props.row.gender }}</span>
                        </el-form-item>
                        <el-form-item label="年龄">
                            <span>{{ props.row.age }}</span>
                        </el-form-item>
                        <el-form-item label="电话">
                            <span>{{ props.row.phone }}</span>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <span>{{ props.row.email }}</span>
                        </el-form-item>
                        <el-form-item label="所在地区">
                            <span>{{ props.row.address}}</span>
                        </el-form-item>
                        <el-form-item label="是否管理员">
                            <span>{{ props.row.isAdmin === 1 ? "是":"否"}}</span>
                        </el-form-item>
                        <el-form-item label="最后登录时间">
                            <span>{{ props.row.lastLoginTime}}</span>
                        </el-form-item>
                    </el-form>
                </template>
                </el-table-column>
                <el-table-column type="selection"  ></el-table-column>
                <el-table-column prop="headUrl" label="头像" >
                    <template slot-scope="scope">
                        <el-avatar shape="square" :size="40" :src="scope.row.headUrl" ></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" ></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="gender"  label="性别"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="isAdmin" label="是否管理员"></el-table-column>
                <el-table-column prop="lastLoginTime" label="最后登录时间"></el-table-column>
                <el-table-column fixed="right" label="操作"  width="180">
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
    </div>
</template>

<script>
export default {
    data(){
        return{
          tableData: [],
          total:10,
          multipleSelection: [],
          currentPage:1,
          pageSize:10
        }
    },methods:{
      //跳转路由，路由传值
      toEdit(obj){
          this.$router.push({
               path: '/user/edit',
               query: {
                   userId:obj.id,
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
      //表格批量选择时
       handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //批量删除用户
      deleteUsers(){
            let that = this;
            //选中的userId
            let selects = this.multipleSelection;
            let userIds = {};
            for(var i in selects){
                userIds[i] =  selects[i].id;
            }
            console.log("val",userIds);
            this.$confirm('此操作将批量删除选中用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.delete("/shu/admin/deleteUsers",{params: {userIds:userIds}})
                .then(function (res) {
                  if(res.data.isSuccess == 1){
                      console.log("删除选中用户成功");
                       //删除成功消息提示
                        that.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        //通过空组件，来实现当前组件刷新
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
            //生命周期
            this.$axios.get("/shu/admin/getAllUser",{params: {currentPage:this.currentPage,pageSize:this.pageSize}})
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