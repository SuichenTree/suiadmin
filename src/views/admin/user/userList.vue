<template>
    <div>
        <el-card class="box-card" shadow="always">
            <div slot="header">
                <el-row type="flex" class="row-bg" justify="space-between">
                    <el-col :span="2">
                        <span>用户列表页面</span>
                    </el-col>
                    <el-col :span="4">
                        <el-button size="small" type="warning">批量删除</el-button>
                        <el-button size="small" type="primary" @click="toAddUser">新增用户</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column type="selection"  width="50"></el-table-column>
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="headUrl" label="头像" width="80">
                    <template slot-scope="scope">
                        <el-avatar shape="square" :size="40" :src="scope.row.headUrl" ></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="60"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="gender"  label="性别"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="phone" label="电话" width="150"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
                <el-table-column prop="address" label="所在地区" width="250"></el-table-column>
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

            <el-divider></el-divider>

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
          total:10
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
                        //通过空组件，来实现当前组件刷新
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
        let that = this;
        //生命周期
        this.$axios.get("/shu/admin/getAllUser")
        .then(function (res) {
          //渲染表格分页
          that.tableData = res.data.tableData;
          that.total = res.data.totalNumber;

        })
        .catch(function (error) {
          console.log("服务器未响应，请等待！！");
        })
    }
}
</script>

<style>

</style>