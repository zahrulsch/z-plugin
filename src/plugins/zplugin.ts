import { App, Plugin, ref } from "vue";
import { MessagePropRequired } from "../hooks/useMessage";

export const zplugin: Plugin = {
  install: (app: App<any>) => {
    const limit_messages = ref<number>(5);
    const messages = ref<MessagePropRequired[]>([]);

    function msg_remover(msg: MessagePropRequired) {
      setTimeout(() => {
        messages.value = messages.value.filter((m) => m.timestamp !== msg.timestamp);
      }, msg.timeout);
    }

    // message __provider__
    app.provide("msg", messages);
    app.provide("limit_msg", limit_messages);

    app.provide("mod_msg", (msg?: MessagePropRequired) => {
      if (msg) {
        messages.value.length + 1 > limit_messages.value && messages.value.shift();

        messages.value.push(msg);
        msg_remover(msg);
      }
    });

    app.provide("mod_msg_remove", (i?: number) => {
      if (i) messages.value = messages.value.filter(m => m.timestamp !== i)
    })

    app.provide("mod_limit_msg", (limit?: number) => {
      if (limit) limit_messages.value = limit;
    })

    const modals = ref<Node[]|null>(null);

    app.provide("modal", modals);
    app.provide("mod_modal", (content?: Node[] | null) => {
      if (content !== undefined) {
        modals.value = content;
      }
    });
  },
};
