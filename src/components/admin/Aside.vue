<template>
<div>
   <el-menu
          router="true"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#D3DCE6">
          <el-menu-item index="/home">
              <i class="el-icon-s-platform"></i>
              <span slot="title">
                  工作台
              </span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user/list">用户列表</el-menu-item>
              <el-menu-item index="/user/add">用户添加</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span>测试管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">测试列表</el-menu-item>
              <el-menu-item index="2-2">测试添加</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
    </el-menu>
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
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

</style>

