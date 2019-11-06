import { useState } from 'react';

export default function useVisualMode (initial) {
  const [mode, setMode] = useState(initial)
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setMode(newMode);
    if (!replace) {
      setHistory(prev => ([mode, ...prev]))
    }
  }

  function back() {
    if(history.length > 1) {
      setHistory(([_, ...history]) => history);
      setMode(history[0])
    }
  }

  return { mode, transition, back };
}