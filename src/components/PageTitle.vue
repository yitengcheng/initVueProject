<template>
  <div class>
    <h1 class="title">{{label}}</h1>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
    props: ['label']
};
</script>
<style lang='scss' scoped>
@import "../assets/scss/baseAttribute";
.title {
  font-size: $text-title;
}
</style>
