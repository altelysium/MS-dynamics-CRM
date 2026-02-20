import { onMounted, onUnmounted } from "vue";

export function useKeyPress(key: string, callback: (e: KeyboardEvent) => void, target: Window | Document | HTMLDocument = window) {
  const eventHandler: EventListener = (e) => {
    if (e instanceof KeyboardEvent &&  e.key === key) {
      callback(e);
    }
  }
  onMounted(() => target.addEventListener("keyup", eventHandler));
  onUnmounted(() => target.removeEventListener("keyup", eventHandler));
}