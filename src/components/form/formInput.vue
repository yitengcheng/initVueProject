<template>
  <el-form-item :label="label" :prop="value">
    <el-input
      v-model="input"
      :type="type"
      :rows="rows"
      @change="onChange"
      :placeholder="place"
      :show-password="showPassword"
      :show-word-limit="showWordLimit"
      :maxlength="maxlength"
      :resize="resize"
      :autosize="autosize"
      :disabled="disabled"
    >
      <template v-if="append" slot="append">{{append}}</template>
    </el-input>
  </el-form-item>
</template>

<script>
export default {
    props: [
        "form",
        "label",
        "value",
        "placeholder",
        "showPassword",
        "showWordLimit",
        "type",
        "rows",
        "maxlength",
        "append",
        "resize",
        "autosize",
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
                this.input = newValue[this.value] || "";
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
        this.input = this.form ? this.form[this.value] : "";
        this.place = this.placeholder || "请输入" + this.label;
    },
    methods: {
        onChange(value) {
            this.input = value;
            this.$emit("onChange", value, this.value);
        },
        reset() {
            this.input = "";
        }
    }
};
</script>
<style lang='scss' scoped>
</style>
