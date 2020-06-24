<template>
  <el-form-item :label="label" :prop="value">
    <el-cascader
      @change="onChange"
      :clearable="clearable"
      v-model="input"
      :props="props"
      class="cascader"
      :placeholder="place"
    />
  </el-form-item>
</template>

<script>
import axios from 'axios';
export default {
    props: ['form', 'label', 'value', 'clearable', 'placeholder'],
    data () {
        return {
            props: {
                lazy: true,
                lazyLoad (node, resolve) {
                    axios
                        .post('/api/getRegion', { pcode: node.value || '0' })
                        .then(res => {
                            let { success, regions, msg } = res;
                            if (success) {
                                resolve(regions);
                            } else {
                                this.$alert(msg);
                            }
                        });
                }
            },
            input: '',
            place: ''
        };
    },
    mounted () {
        this.place = this.placeholder || '请选择' + this.label;
    },
    methods: {
        onChange (value) {
            this.input = value;
            this.$emit('onChange', value.join(','), this.value);
        }
    }
};
</script>
<style lang='scss' scoped>
.cascader {
  width: 100%;
}
</style>
