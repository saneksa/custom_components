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
    <div className="App">
      <header className="App-header">
        Управление из дочернего компонента:
      </header>

      <div>
        <button onClick={increase}>+</button>
        <button onClick={decrease}>-</button>
      </div>
    </div>
  );
}

export default App;
