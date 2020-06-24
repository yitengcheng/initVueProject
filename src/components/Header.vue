<template>
  <div class="contain">
    <div class="title">大屏</div>
    <div class="headerContain">
      <span @click="getFullCreeen">
        <icon name="全屏" w="30px" h="30px" style="marginRight: 20px" />
      </span>
      <el-image :src="img" class="logo" />
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return { n: 0, img: require("../assets/LOGO.png") };
    },
    methods: {
        getFullCreeen() {
            this.n++;
            this.n % 2 === 0
                ? this.outFullCreeen(document)
                : this.inFullCreeen(document.documentElement);
        },
        inFullCreeen(element) {
            let el = element;
            let rfs =
        el.requestFullScreen ||
        el.webkitRequestFullScreen ||
        el.mozRequestFullScreen ||
        el.msRequestFullScreen;
            if (typeof rfs !== "undefined" && rfs) {
                rfs.call(el);
            } else if (typeof window.ActiveXObject !== "undefined") {
                /* global ActiveXObject */
                let wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
        },
        outFullCreeen(element) {
            let el = element;
            let cfs =
        el.cancelFullScreen ||
        el.webkitCancelFullScreen ||
        el.mozCancelFullScreen ||
        el.exitFullScreen;
            if (typeof cfs !== "undefined" && cfs) {
                cfs.call(el);
            } else if (typeof window.ActiveXObject !== "undefined") {
                let wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
        }
    }
};
</script>
<style lang='scss' scoped>
.contain {
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.title {
  font-size: 28px;
  color: #ffffff;
}
.logo {
  width: 180px;
  height: 30px;
}
.headerContain {
  display: flex;
}
</style>
