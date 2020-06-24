<template>
  <el-form-item :label="label" :prop="value">
    <el-date-picker
      class="picker"
      v-model="input"
      :type="type || 'datetime'"
      :align="align || 'right'"
      :size="size"
      @change="onChange"
      :clearable="clearable || false"
      :picker-options="options || pickerOptions"
      :disabled="disabled"
    ></el-date-picker>
  </el-form-item>
</template>

<script>
export default {
    props: [
        "form",
        "options",
        "label",
        "value",
        "align",
        "size",
        "clearable",
        "type",
        "disabled"
    ],
    data() {
        return {
            input: "",
            pickerOptions: {
                disabledDate(time) {
                    return (
                        time.getTime() < new Date(new Date().toLocaleDateString()).getTime()
                    );
                },
                shortcuts: [
                    {
                        text: "今天",
                        onClick(picker) {
                            picker.$emit("pick", new Date());
                        }
                    },
                    {
                        text: "昨天",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit("pick", date);
                        }
                    },
                    {
                        text: "一周前",
                        onClick(picker) {
                            const date = new Date();
                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit("pick", date);
                        }
                    }
                ]
            }
        };
    },
    watch: {
        form: {
            handler(newValue, oldValue) {
                this.input = newValue[this.value] || "";
            },
            deep: true
        }
    },
    mounted() {
        this.input = this.form ? this.form[this.value] : "";
    },
    methods: {
        onChange(value) {
            this.input = value;
            this.$emit(
                "onChange",
                this.$moment(value).format("YYYY-MM-DD hh:mm:ss"),
                this.value
            );
        }
    }
};
</script>
<style lang='scss' scoped>
</style>
