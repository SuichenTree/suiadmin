<template>
  <div class="home">
    <el-container>
      <el-header>
        <!--头部组件-->
        <s_head/>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!--侧边组件-->
          <s_aside/>
        </el-aside>
        <el-main>
            <router-view/>
        </el-main>
      </el-container>
      <el-footer>
        <!--底部组件-->
        <s_footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Head from '@/components/admin/Head.vue'
import Aside from '@/components/admin/Aside.vue'
import Footer from '@/components/admin/Footer.vue'

export default {
  name: 'Home',
  data(){
    return{
    }
  },
  methods: {
  },
  components: {
    "s_head":Head,
    "s_aside":Aside,
    "s_footer":Footer
  }
}
</script>

<style>
/*
	找到html标签、body标签，和挂载的标签
	都给他们统一设置样式
*/
  html,body,#app,.el-container{
      /*设置内部填充为0，几个布局元素之间没有间距*/
      padding: 0px;
        /*外部间距也是如此设置*/
      margin: 0px;
      /*统一设置高度为100%*/
      height: 100%;
  }
  .home{
      padding: 0px;
      margin: 0px;
      height: 100%;
  }
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: rgb(218, 203, 203);
    color: #333;
    text-align: center;
  }
  .el-header{
    background-color: rgb(138, 177, 228);
    color: #333;
    text-align: center;
    line-height: 60px;
}
.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

</style>