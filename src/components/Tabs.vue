<template>
  <el-tabs v-model="actionName" @tab-click="actionTab" type="border-card" class="tabsContain">
    <el-tab-pane v-show="!tabsData" v-for="(tab,index) in tabsData" :key="index" :label="tab.name">
      <div class="tabContain">
        <slot :name="tab.name"></slot>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
    props: ['tabsData', 'action'],
    data () {
        return {
            actionName: ''
        };
    },
    methods: {
        changeTab (val) {
            this.actionName = val;
        },
        actionTab () {
            this.$emit('tabClick');
        }
    }
};
</script>
<style lang='scss' scoped>
.tabsContain {
  width: 95%;
}
.tabContain {
  display: flex;
  flex: 1;
  justify-content: center;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
