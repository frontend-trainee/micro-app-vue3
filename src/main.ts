/* eslint-disable @typescript-eslint/no-explicit-any */
import "./public-path";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

let instance: any = null;

function render(props: any = {}) {
  const { container } = props;

  instance = createApp(App);
  instance.use(router);
  instance.use(store);
  instance.mount(container ? container.querySelector("#app") : "#app");
}

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render();
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function bootstrap() {
  console.log("[vue] vue3 app bootstraped");
}

function storeTest(props: any) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value: any, prev: any) =>
        console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function mount(props: any) {
  console.log("[vue] props from main framework", props);

  storeTest(props);
  render(props);
  instance.config.globalProperties.$onGlobalStateChange =
    props.onGlobalStateChange;
  instance.config.globalProperties.$setGlobalState = props.setGlobalState;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function unmount() {
  instance.unmount();
  instance._container.innerHTML = "";
  instance = null;
  // router = null;
}
