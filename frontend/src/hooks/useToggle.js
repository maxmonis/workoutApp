import { useState } from 'react';

const useToggle = (initialState) => {
  const [state, setState] = useState(initialState);
  const toggle = () => {
    setState(!state);
  };
  const reset = () => setState(initialState);
  return [state, toggle, reset];
};

export default useToggle;
