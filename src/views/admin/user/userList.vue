<template>
    <div>
        <el-card class="box-card" shadow="always">
            <!-- <el-col :span="3"><el-button icon="el-icon-plus" type="primary" @click="toAdd()">添加</el-button></el-col> -->
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column type="selection"  width="50"></el-table-column>
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column prop="headUrl" label="头像" width="80">
                    <template slot-scope="scope">
                        <el-avatar shape="square" size="30" :src="scope.row.headUrl" ></el-avatar>
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
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
          total:10,
        }
    },methods:{
      toAdd(){
        this.$router.push({ path: '/user/add' })
      }
    },mounted(){
      let that = this;
      //生命周期
      this.$axios.get("/shu/admin/getAllUser")
        .then(function (res) {
          console.log(res.data);
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