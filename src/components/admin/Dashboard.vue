<template>
    <div class="console">
        <el-row type="flex" class="row-bg" justify="space-around">
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }">
                    <el-image class="image" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" fit="cover"></el-image>
                    <div style="padding: 14px;">
                        <span>用户数：11</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="6">
                <el-card :body-style="{ padding: '0px' }">
                    <el-image class="image" src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" fit="cover"></el-image>
                    <div style="padding: 14px;">
                        <span>今日新增用户数：11</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    }
}
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
  }
  .row-bg {
    padding: 10px 0;
  }

  .image {
    width: 100%;
    height: 100px;
  }


</style>