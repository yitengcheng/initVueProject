<template>
  <el-form-item :label="label" :prop="value">
    <el-select
      :multiple="multiple || false"
      class="select"
      v-model="input"
      :placeholder="place"
      :disabled="disabled"
      @change="onChange"
    >
      <el-option
        v-for="(option,index) in options"
        :key="index"
        :label="option.label"
        :value="option.value"
      ></el-option>
    </el-select>
  </el-form-item>
</template>

<script>
export default {
    props: [
        "form",
        "label",
        "value",
        "options",
        "placeholder",
        "multiple",
        "disabled"
    ],
    watch: {
        input: {
            handler(newValue, oldValue) {
                this.input = newValue;
            }
        },
        form: {
            handler(newValue, oldValue) {
                if (this.multiple) {
                    this.input = newValue[this.value] || [];
                } else {
                    this.input = newValue[this.value] || "";
                }
            },
            deep: true
        }
    },
    data() {
        return {
            input: "",
            place: ""
        };
    },
    mounted() {
        if (this.multiple) {
            this.input = this.form ? this.form[this.value] : [];
        } else {
            this.input = this.form ? this.form[this.value] : "";
        }
        this.place = this.placeholder || "请选择" + this.label;
    },
    methods: {
        onChange(value) {
            this.input = value;
            this.$emit("onChange", value, this.value);
        }
    }
};
</script>
<style lang='scss' scoped>
.select {
  width: 100%;
}
</style>
