<template>
  <div class="main">
    <el-row :gutter="20">
      <el-col :span="8" :offset="6">
         <el-card class="box-card" style="text-align:left;">
          <div slot="header" class="clearfix" >
            <span>最新文章</span>
          </div>
          <div class="text item">
            <div v-for="(item,index) in articleList" :key="index">
                <el-link :href="item.linkURL" target="_blank" style="font-weight: bold;font-size:20px;">{{item.title}}</el-link>
                <p>{{item.describe}}</p>
                <div>
                  <span>查看<i class="el-icon-view el-icon--right"></i>{{item.viewCount}}</span>
                  <el-divider direction="vertical"></el-divider>
                  <span>更新时间：{{item.updateTime}}</span>
                </div>
                <div style="margin-top:10px;">
                  <el-tag v-for="(it,index) in item.tags" :key="index">{{it}}</el-tag>
                </div>
                <el-divider></el-divider>
            </div>



            <!-- <div>
              <el-link style="font-weight: bold;font-size:20px;">java教程</el-link>
              <p>前端、后端、数据结构与算法、计算机基础</p>
              <div>
                <span>查看<i class="el-icon-view el-icon--right"></i>1926</span>
                <el-divider direction="vertical"></el-divider>
                <span>更新时间：2020-02-09 11:54:36</span>
              </div>
              <div style="margin-top:10px;">
                <el-tag>标签二</el-tag>
                <el-tag>标签二</el-tag>
                <el-tag>标签二</el-tag>
                <el-tag>标签二</el-tag>
                <el-tag>标签二</el-tag>
              </div>
              <el-divider></el-divider>
            </div>
            <div>
              <el-link style="font-weight: bold;font-size:20px;">java教程</el-link>
              <p>前端、后端、数据结构与算法、计算机基础、设计模式、数据库等书籍前端、后端、数据结构与算法、计算机基础、设计模式、数据库等书籍</p>
              <div>
                <span>查看<i class="el-icon-view el-icon--right"></i>1926</span>
                <el-divider direction="vertical"></el-divider>
                <span>更新时间：2020-02-09 11:54:36</span>
              </div>
              <div style="margin-top:10px;">
                <el-tag>标签二</el-tag>
                <el-tag>标签二</el-tag>
                <el-tag>标签二</el-tag>
                <el-tag>标签二</el-tag>
                <el-tag>标签二</el-tag>
              </div>
              <el-divider></el-divider>
            </div> -->
          </div>
        </el-card>
      </el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    data () {
      return {
        articleList:[
          {
            linkURL:"https://blog.csdn.net/Doctor_LY/article/details/95488260",
            title:"java教程",
            describe:"前端、后端、数据结构与算法、计算机基础、设计模式、数据库等书籍前端、后端、数据结构与算法、计算机基础、设计模式、数据库等书籍",
            viewCount:1926,
            updateTime:"2020-02-09 11:54:36",
            tags:[
              "java","后端","技术","随笔"
            ]
          },
          {
            linkURL:"https://blog.csdn.net/Doctor_LY/article/details/95488260",
            title:"mysql教程",
            describe:"前端、后端、数据结构与算法、计算机基础",
            viewCount:196,
            updateTime:"2020-02-09 11:54:36",
            tags:[
              "java","后端","技术","随笔","什么"
            ]
          }
        ]
      }
    }
}
</script>

<style scoped>

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-tag{
  margin-right:10px;
} 
</style>