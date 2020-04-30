<template>
    <div>
        <!--空组件，该组件的作用是充当跳板。来实现组件刷新问题。-->
    </div>
</template>

<script>
export default {
    data() {
      return {
      }
    },
    created() {
      //接受参数
      let url = this.$route.query;
      let str = '';
      for(let i in url) {
        str += url[i];
      }
      const path = this.$route.query;
      this.$router.push({
        path: str,
      });
    }  
}
</script>
