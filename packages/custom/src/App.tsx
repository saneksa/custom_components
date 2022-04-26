import React from "react";
import "./App.css";

function App(props: ICustomComponentsProps) {
  const increase = React.useCallback(() => {
    props.increase(3);
  }, []);

  const decrease = React.useCallback(() => {
    props.decrease(5);
  }, []);

  console.warn("update custom component");

  return (
    <div className="custom-app">
      <header className="App-header">Кастомный компонент Bar:</header>

      <div>
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
      </div>
    </div>
  );
}

export default App;
