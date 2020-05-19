<template>
  <div class="index">
    <el-container>
        <el-header>
          <!-- 头部组件 -->
          <b_Head/>
        </el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
import b_Head from '@/components/blog/Head.vue'


export default {
  name: 'index',
  data(){
    return{
    }
  },
  methods: {
  },
  components: {
    "b_Head":b_Head
  }
}
</script>

<style>
  html,body,#app,.el-container{
      /*设置内部填充为0，几个布局元素之间没有间距*/
      padding: 0px;
        /*外部间距也是如此设置*/
      margin: 0px;
      /*统一设置高度为100%*/
      height: 100%;
  }

.index{
    height: 100%;
}

  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  .el-header{
    background-color: #FFF;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>