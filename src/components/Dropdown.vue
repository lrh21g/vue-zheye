<template>
  <!-- 下拉菜单组件 -->
  <div class="dropdown" ref="dropdownRef">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggleOpen">
      {{ title }}
    </a>
    <ul class="dropdown-menu" :style="{ display: 'block' }" v-if="isOpen">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import useClickOutside from "../hooks/useClickOutside";

export default defineComponent({
  name: "Dropdown",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);
    const dropdownRef = ref<null | HTMLElement>(null);
    const toggleOpen = () => {
      isOpen.value = !isOpen.value;
    };
    // 判断是否点击其他区域
    // 通过点击DOM标签下是否包含该下拉标签
    const isClickOutside = useClickOutside(dropdownRef);

    watch(isClickOutside, () => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false;
      }
    });

    return {
      isOpen,
      toggleOpen,
      dropdownRef,
    };
  },
});
</script>
