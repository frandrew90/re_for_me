import { useState } from 'react';

const useToggle = (initValue = false) => {
  const [state, setState] = useState(initValue);

  const toggleState = () => {
    setState(prevState => !prevState);
  };

  return [state, toggleState];
};

export default useToggle;
