import { inject } from "vue";

export type MessagePlacement =
  | "top"
  | "bottom"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type MessageType = "success" | "error" | "info" | "warning";

export interface MessageProp {
  text?: string;
  timestamp?: number;
  placement?: MessagePlacement;
  timeout?: number;
  type?: MessageType
}

export type MessagePropRequired = Required<MessageProp>;

export function useMessage() {
  const msgMod = inject<(msg?: MessagePropRequired) => void>("mod_msg");

  return (msg: MessageProp) => {
    msgMod?.({
      placement: msg.placement || "top",
      text: msg.text || "",
      timestamp: new Date().getTime(),
      type: msg.type || "info",
      timeout: msg.timeout || 1000
    })
  }
}