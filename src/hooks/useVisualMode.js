import React, { useState } from 'react';

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if(replace) {
      setMode(newMode);
      let x = history.slice();
      x.splice([history.length - 1], 1, newMode);
      setHistory(x);
    } else {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
  }

  function back() {
    if(history.length > 1) {
      history.pop();
      setMode(history[history.length - 1])
    }
  }

  return { mode, transition, back };
}