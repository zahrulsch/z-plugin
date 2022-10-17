## Plugin Support for Vue 3 and Typescript

<h1 align="center">@mantracode/z-plugin</h1>
<p align="center">For Vue 3</p>
<p align="center"><b><img height="13px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/64px-Typescript_logo_2020.svg.png" /> Typescript & <img height="13px" src="https://vitejs.dev/logo.svg" /> Vite Full Support</b></p>

### Intallations
Add __zplugin__ to vue app in _`main.ts`_
```ts
import { createApp } from "vue";
import { zplugin } from "@mantracode/z-plugin";
import App from "./App.vue";
import "@mantracode/z-plugin/dist/style.css"

const app = createApp(App);
app.use(zplugin);
app.mount("#app");

```

**`ZPluginProvider`**, as Root component for plugin on _`App.vue`_.

```vue
<script setup lang="ts">
import { ZPluginProvider } from "@mantracode/z-plugin";
import MyLayout from "./layout/MyLayout.vue"
</script>

<template>
  <z-plugin-provider>
    <my-layout>
      ...
    </my-layout>
  </z-plugin-provider>
</template>
```
  
### Hooks
- **`useMessage`**, hook for creating a message _`./layout/MayLayout.vue`_

  ```vue
  <script setup lang="ts">
  import { useMessage } from "@mantracode/z-plugin";

  const msg =  useMessage();

  const show_msg = () => {
    msg({
      text: "You are so beautiful tonight."
    })
  }
  </script>
  
  <template>
    <button @click="show_msg">Show Message</button>
  </template>
  ```