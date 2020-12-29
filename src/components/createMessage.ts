import { createApp } from "vue";
import Message from "./Message.vue";
export type MessageType = "success" | "error" | "default";

const createMessage = (message: string, type: MessageType, timeout = 2000) => {
  // createApp：返回一个提供应用上下文的应用实例。应用实例挂载的整个组件树共享同一个上下文。
  // 在 createApp 之后链式调用其它方法
  // 该函数接收一个根组件选项对象作为第一个参数
  // 使用第二个参数，可以将根 prop 传递给应用程序
  const messageInstance = createApp(Message, {
    message,
    type,
  });
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);
  // mount 将应用实例的根组件挂载在提供的 DOM 元素上。
  messageInstance.mount(mountNode);
  setTimeout(() => {
    // unmount 在提供的 DOM 元素上卸载应用实例的根组件。
    messageInstance.unmount(mountNode);
    document.body.removeChild(mountNode);
  }, timeout);
};

export default createMessage;
