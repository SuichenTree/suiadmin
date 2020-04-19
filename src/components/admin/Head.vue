<template>
<div>
  <el-row>
    <el-col :span="12">
      <div style="text-align:left;font-size:20px">
        <span>SuichenTree 后台管理系统</span>
      </div>
    </el-col>
    <el-col :span="12">
        <div style="text-align:right;font-size:20px">
          <el-avatar shape="square" size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
          <span>王小虎</span>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right:15px;font-size:25px;"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
export default {
    data() {
      return {
        
      };
    },
    methods: {
     
    }
  }
</script>

<style>
.el-header{
    background-color: rgb(138, 177, 228);
    color: #333;
    text-align: center;
    line-height: 60px;
}
</style>

