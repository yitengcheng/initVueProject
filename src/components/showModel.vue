<template>
  <el-dialog :title="title || '提示'" :visible="dialogVisible" @close="closeModel">
    <div class="contentContain">
      <slot name="content"></slot>
    </div>
    <div slot="footer" :class="[hiddenCancel ? 'dialog-footerOne' : 'dialog-footer']">
      <el-button v-if="!hiddenCancel" @click="doCancel" class="btn">{{cancel || '取消'}}</el-button>
      <el-button class="btn" type="primary" @click="doConfirm">{{confirm||'确定'}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
    props: ['title', 'dialogVisible', 'cancel', 'confirm', 'hiddenCancel'],
    methods: {
        closeModel () {
            this.$emit('close');
        },
        doCancel () {
            this.$emit('doCancel');
        },
        doConfirm () {
            this.$emit('doConfirm');
        }
    }
};
</script>
<style lang='scss' scoped>
.dialog-footer {
  display: flex;
  width: 250px;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto 20px auto;
}
.dialog-footerOne {
  display: flex;
  width: 250px;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
}
.btn {
  width: 100px;
}
.contentContain {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
