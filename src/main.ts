import { createApp } from "vue";
import { zplugin } from "./plugins/zplugin";
import App from "./App.vue";

const app = createApp(App);
app.use(zplugin);
app.mount("#app");