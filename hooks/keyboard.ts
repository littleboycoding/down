import { useEffect } from "react";

interface Modifer {
  alt?: boolean;
  shift?: boolean;
  ctrl?: boolean;
}

interface KeyboardConfig {
  key: string;
  action: () => void;
  preventDefault?: boolean;
  modifier?: Modifer;
}

interface KeyboardHook {
  (configs: KeyboardConfig[]): void;
}

const useKeyboard: KeyboardHook = (configs) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      for (let config of configs) {
        if (config.key !== event.key) continue;

        // modifers
        if (config.modifier?.alt && !event.altKey) continue;
        if (config.modifier?.ctrl && !event.ctrlKey) continue;
        if (config.modifier?.shift && !event.shiftKey) continue;

        if (config.preventDefault) event.preventDefault();

        config.action();
      }
    };

    addEventListener("keydown", onKeyDown);

    return () => {
      removeEventListener("keydown", onKeyDown);
    };
  }, [configs]);
};

export default useKeyboard;
