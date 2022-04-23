import { useCallback } from "react";
import "./App.css";

function App() {
  const increase = useCallback(() => {
    window.im.increase(3);
  }, []);

  const decrease = useCallback(() => {
    window.im.decrease(5);
  }, []);

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
