import { ref, onMounted, onUnmounted, Ref } from "vue";

// 判断是否点击当前DOM元素的外部区域
const useClickOutside = (elementRef: Ref<null | HTMLElement>) => {
  const isClickOutSide = ref(false);
  const handler = (e: MouseEvent) => {
    if (elementRef.value) {
      // Node.contains()返回的是一个布尔值，来表示传入的节点是否为该节点的后代节点。
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutSide.value = false;
      } else {
        isClickOutSide.value = true;
      }
    }
  };
  onMounted(() => {
    document.addEventListener("click", handler);
  });
  onUnmounted(() => {
    document.removeEventListener("click", handler);
  });
  return isClickOutSide;
};

export default useClickOutside;
