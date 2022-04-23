import { useCallback, useRef, useState } from "react";
import { observer } from "mobx-react-lite";

import { useAsyncEffect } from "./hooks/useAsyncEffect";
import { Counter } from "./store/Counter/Counter";

const counterState = new Counter();

function App() {
  const [componentsConfigs, setComponentsConfig] = useState<
    Record<string, any>[] | null
  >(null);

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClick = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8888/api/components", {
        method: "GET",
      });

      if (!response.ok) {
        const message = await response.text();

        throw new Error(message);
      }

      setComponentsConfig(await response.json());
    } catch (error) {
      console.error(error);
    }
  }, []);

  useAsyncEffect(() => {
    componentsConfigs?.forEach((c) => {
      const container = document.createElement("div");

      if (document.getElementById(c.name)) {
        document.getElementById(c.name)?.remove();
      }

      container.id = c.name;

      container.style.maxWidth = "300px";
      container.style.maxHeight = "100px";

      const scriptElement = document.body.querySelector(
        `script[src="${c.entrypoint}"]`
      );

      if (scriptElement) {
        scriptElement.remove();
      }

      const script = document.createElement("script");
      script.src = c.entrypoint;

      ref.current?.appendChild(container);
      document.body.appendChild(script);
    });
  }, [componentsConfigs]);

  return (
    <div>
      <header>Counter: {counterState.counter}</header>
      <div>
        <button onClick={handleClick}>Запрос компонента</button>

        <div ref={ref}></div>
      </div>
    </div>
  );
}

export default observer(App);
