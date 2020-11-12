<template>
  <form class="validate-form-container">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitForm">
      <slot name="submit">
        <button type="submit" class="btn btn-primary">提交</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from "vue";
// Vue 3.x 中，移除了 $on，$off 和 $once 方法
// 可以通过使用实现事件发射器接口的外部库来替换现有的 event hub mitt
import mitt from "mitt";

type ValidateFunc = () => boolean;
export const emitter = mitt();
export default defineComponent({
  name: "ValidateForm",
  emits: ["form-submit"], // emits 选项：在组件上定义已发出的事件
  setup(props, context) {
    let funcArr: ValidateFunc[] = [];
    const submitForm = () => {
      // 遍历执行校验规则函数，判断是否全部通过校验
      const result = funcArr.map(func => func()).every(result => result);
      context.emit("form-submit", result);
    };
    const callback = (func?: ValidateFunc) => {
      if (func) {
        funcArr.push(func);
      }
    };
    // 监听 form-item-created 事件
    emitter.on("form-item-created", callback);
    onUnmounted(() => {
      emitter.off("form-item-created", callback);
      funcArr = [];
    });
    return {
      submitForm,
    };
  },
});
</script>
