import './App.css';
import { useState, useRef, useEffect } from 'react';
import Line from './Line';

function App() {
  const [lines, setLines] = useState([[],[5],[10],[],[1]]);
  const inputRef = useRef();

  function checkout() {
    const items = inputRef.current.value;
    if (isNaN(items) || Number(items) <= 0)
      return;

    const shortestLine = lines
                            .map(line => line.reduce((sum, item) => sum + Number(item), 0))
                            .reduce((shortest, line, i, arr) => line < arr[shortest] ? i : shortest, 0);

    const newLines = lines.map((line, i) => {
      if (i === shortestLine)
        return [...line, items];
      return [...line];
    });
    
    setLines(newLines);
  }

  useEffect(() => {
    const scanItem = () => {
      const newLines = lines.map((line) => {
        if (line.length === 0)
          return [];
        if (line[0] === 1)
          return [...line.slice(1)];
        return [line[0] - 1, ...line.slice(1)];
      });
  
      setLines(newLines);
    }


    const interval = setInterval(scanItem, 1000);
    return () => clearInterval(interval);
  }, [lines]);

  return (
    <>
      <div className="input-form">
        <input type="text" ref={inputRef} />
        <button onClick={checkout}>Checkout</button>
      </div>
      <div className="checkout-lines">
        { lines.map((line, idx) => <Line key={idx} idx={idx} lineData={line} />) }
      </div>
    </>
  );
}

export default App;
