<template>
<div>
   <el-menu
          router
          class="el-menu-vertical-demo"
          background-color="#D3DCE6">
          <el-menu-item index="/home">
              <i class="el-icon-s-platform"></i>
              <span slot="title">
                  工作台
              </span>
          </el-menu-item>
          <el-submenu index="/user">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/user/list">用户列表</el-menu-item>
              <el-menu-item index="/user/add">用户添加</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="/exam">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span>测试管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/exam/list">测试列表</el-menu-item>
              <el-menu-item index="/question/list">题目列表</el-menu-item>
              <el-menu-item index="/option/list">选项列表</el-menu-item>
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

