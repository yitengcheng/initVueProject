<template>
  <el-form-item :label="label" :prop="value">
    <el-upload
      :list-type="listType || 'picture-card'"
      ref="upload"
      action="/api/upload"
      :http-request="upload"
      :show-file-list="showList === 'hidden' ? false :true"
      :file-list="fileList"
      :on-remove="remove"
      :accept="accept"
      :before-upload="before"
      :limit="limit*1"
      multiple
    >
      <i v-if="listType !== 'text' && !fileList[fileList.length-1]" class="el-icon-plus"></i>
      <img v-else :src="fileList[fileList.length-1].url" class="avatar" />
      <el-button v-if="listType === 'text'" size="small" type="primary">点击上传</el-button>
      <div v-if="accept" slot="tip" class="el-upload__tip">只能上传{{accept}}文件</div>
    </el-upload>
  </el-form-item>
</template>

<script>
export default {
    name: "upload",
    props: ["value", "label", "listType", "accept", "form", "limit", "showList"],
    data() {
        return {
            fileList: []
        };
    },
    watch: {
        form: {
            handler(newValue, oldValue) {
                this.fileList = newValue[this.value] || [];
            },
            deep: true
        }
    },
    mounted() {
        this.fileList = this.form ? this.form[this.value] : [];
    },
    methods: {
        upload() {
            const formData = new FormData();
            const uploadFiles = this.$refs.upload.uploadFiles;
            const fileIndex = uploadFiles.length - 1;
            const file = uploadFiles[fileIndex];
            const headerConfig = {
                headers: { "Content-Type": "multipart/form-data" }
            };
            formData.append("image", file.raw);
            this.$http.post("/api/upload", formData, headerConfig).then(res => {
                let { success, url } = res;
                let name = url.split("/");
                this.fileList.push({
                    url: this.$API + url,
                    name: name[name.length - 1]
                });
                this.$emit("onChange", this.fileList, this.value);
            });
        },
        before(file) {
            let testmsg = file.name.substring(file.name.lastIndexOf("."));
            let acceptList = this.accept && this.accept.split(",");
            let flag = this._.findIndex(acceptList, o => {
                return o.trim() === testmsg;
            });
            if (this.accept && flag === -1) {
                this.$message({
                    message: `上传文件只能是 ${this.accept}格式!`,
                    type: "warning"
                });
            }
            return this.accept && flag !== -1;
        },
        remove(file) {
            let index = this._.findIndex(this.fileList, o => {
                return o.uid === file.uid;
            });
            this.fileList.splice(index, 1);
            this.$emit("onChange", this.fileList, this.value);
        }
    }
};
</script>
<style lang='scss' scoped>
.avatar {
  width: 145px;
  height: 145px;
  display: block;
}
</style>
