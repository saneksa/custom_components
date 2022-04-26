import { useCallback, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import "./App.css";
import { useAsyncEffect } from "./hooks/useAsyncEffect";
import { Counter } from "./store/Counter/Counter";

const counterState = new Counter();

function App() {
  const [componentsConfigs, setComponentsConfig] = useState<
    Record<string, any>[] | null
  >(null);

  const ref = useRef<HTMLDivElement | null>(null);

  const increase = useCallback(() => {
    counterState.increase(3);
  }, []);

  const decrease = useCallback(() => {
    counterState.decrease(5);
  }, []);

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

  console.warn("update root app");

  return (
    <div>
      <div className="root-app">
        <header>Основное приложение</header>
        <div>
          <b>Counter: {counterState.counter}</b>
        </div>
        <div>
          <button onClick={handleClick}>Запрос компонентов</button>
        </div>
      </div>
      <div ref={ref}></div>

      {Array.from(window.im?.component?.components?.entries()).map(
        ([name, componentGetter]) => {
          const Component: React.ComponentType<ICustomComponentsProps> =
            componentGetter();

          return (
            <Component
              key={name}
              increase={increase}
              decrease={decrease}
              counter={counterState.counter}
            />
          );
        }
      )}
    </div>
  );
}

export default observer(App);
