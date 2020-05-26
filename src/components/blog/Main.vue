<template>
  <div class="main">
    <el-row :gutter="20">
      <!-- 文章列表 -->
      <el-col :span="10" :offset="4">
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
            <!-- 分页 -->
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
          </div>
        </el-card>
      </el-col>
      <!-- 信息介绍 -->
      <el-col :span="6">
        <el-card class="box-card" style="text-align:center;">
            <img src="@/assets/user.jpg" class="right-logo">
            <div style="font-size:25px;font-weight:bold;">SuiChenTree</div>
            <el-divider>标签云</el-divider>
            <div class="tags">
              <el-tag type="success" v-for="(item,index) in tagList" :key="index">{{item.tagName}}</el-tag>
            </div>
            <el-divider content-position="left">毒鸡汤</el-divider>
            <ul style="text-align:left;">
              <li>精诚所至,金石为开</li>
              <li>欲戴其冠,必承其重</li>
              <li>弱小的人，才习惯嘲讽与否定;内心强大的人，从不吝啬赞美与鼓励！</li>
            </ul>
            <el-divider content-position="left">关于</el-divider>
            <ul style="text-align:left;">
              <li>创作时间：2017/11/9/ ~ NOW</li>
              <li>创作者：SuiChenTree</li>
              <li>本个人博客所有内容，仅仅用于个人学习收集使用！</li>
              <li><el-link href="https://github.com/SuichenTree" target="_blank">Github链接</el-link></li>
              <li><el-link href="mailto:18271801652@163.com" target="_blank">邮件(18271801652@163.com)</el-link></li>
            </ul>
        </el-card>
      </el-col>
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
          },
          {
            linkURL:"https://blog.csdn.net/Doctor_LY/article/details/95488260",
            title:"Nodejs教程",
            describe:"前端、后端",
            viewCount:19116,
            updateTime:"2020-02-09 11:54:36",
            tags:[
              "java","后端"
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
        ],
        tagList:[
          {
            tagId:"1",
            tagName:"数据结构与算法"
          },
          {
            tagId:"2",
            tagName:"理财"
          },
          {
            tagId:"3",
            tagName:"router"
          },
          {
            tagId:"4",
            tagName:"标签二"
          },
          {
            tagId:"5",
            tagName:"vue"
          },
          {
            tagId:"6",
            tagName:"java"
          },
          {
            tagId:"6",
            tagName:"java"
          },
          {
            tagId:"6",
            tagName:"java"
          },
          {
            tagId:"6",
            tagName:"java"
          },
          {
            tagId:"6",
            tagName:"java"
          },
          {
            tagId:"6",
            tagName:"java"
          },
          {
            tagId:"6",
            tagName:"java"
          },
          {
            tagId:"6",
            tagName:"java"
          },
          {
            tagId:"6",
            tagName:"java"
          },
          {
            tagId:"6",
            tagName:"java"
          },
          {
            tagId:"6",
            tagName:"java"
          }
        ],
        //分页
        total:10,
        currentPage:1,
        pageSize:10
      }
    },
    methods:{
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
  margin-top:5px;
  margin-right:10px;
}

.right-logo{
  width: 130px;
  border-radius: 50%;
}
</style>