
import { useTimer } from "./Components/useTimer";
import "./index.css";

export const App = () => {
  const { pause, reset, running, seconds, start, stop } = useTimer();

  return (
    <div className="App">
      <h1>{seconds}</h1>
      <button onClick={running ? pause : start}>Start</button>
      <button onClick={reset}>Reset</button>
      <button onClick={stop}>Stop</button>
    </div>
  );
};
export default App;