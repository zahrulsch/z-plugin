<script setup lang="ts">
import { ref } from "vue";
import { useMessage } from "./hooks/useMessage";
import ZPluginProvider from "./components/ZPluginProvider.vue";
import ZModal from "./components/ZModal.vue";
import ZInput from "./components/ZInput.vue";
import ZSelect from "./components/ZSelect.vue";
import ZButton from "./components/ZButton.vue";
import ZDropdown from "./components/ZDropdown.vue";

const showModal = ref(!1);

const msg = useMessage();

const selected = ref(null);
const menus = ref([
  {
    value: 0,
    label: "Halaman Lumayan",
  },
  {
    value: 1,
    label: "Tentang Saya",
  },
  {
    value: 2,
    label: "Produk dan Deskripsi",
  },
  {
    value: 3,
    label: "Service",
  },
]);
</script>

<template>
  <ZPluginProvider :msg-limit="2">
    <div class="app">
      <ZDropdown>
        <template #content> saya konten </template>
      </ZDropdown>
      <ZSelect placeholder="Pilih Halaman" :options="menus" v-model:value="selected" />
      <ZModal v-model:show="showModal">
        <div class="modal">
          <span style="font-size: 1rem; color: #555; font-weight: 500"
            >Saya akan tampil sebagai modal</span
          >
          <ZInput placeholder="Masukan Inputan">
            <template #suffix>
              <i class="bi bi-currency-exchange"></i>
            </template>
          </ZInput>
        </div>
      </ZModal>
      <ZButton type="button" @click="showModal = !showModal">Modal</ZButton>
      <ZButton
        type="button"
        button-type="info"
        @click="
          msg({
            text: 'Ini Pesan Yang Akan Tampil',
            timeout: 3e3,
            type: 'info',
            placement: 'top-left',
          })
        "
      >
        Info
      </ZButton>
      <ZButton
        type="button"
        button-type="primary"
        @click="
          msg({ text: 'Ini Pesan Yang Akan Tampil', timeout: 3e3, type: 'success' })
        "
      >
        Success
      </ZButton>
      <ZButton
        type="button"
        button-type="warning"
        @click="
          msg({ text: 'Ini Pesan Yang Akan Tampil', timeout: 3e3, type: 'warning' })
        "
      >
        Warning
      </ZButton>
      <ZButton
        type="button"
        button-type="danger"
        @click="msg({ text: 'Ini Pesan Yang Akan Tampil', timeout: 3e3, type: 'error' })"
      >
        Error
      </ZButton>
    </div>
  </ZPluginProvider>
</template>

<style>
:root {
  font-size: 15px;
}
* {
  font-family: "Inter", sans-serif;
}
.modal {
  padding: 12px;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  min-width: 15vw;
  transition: none;
}
.app {
  font-size: 12.5px;
  display: flex;
  column-gap: 7px;
  padding: 10px;
}
</style>
