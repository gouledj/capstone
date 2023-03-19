import { useState, useEffect } from 'react';

const useDebounce = (values, delay) => {

  const [debouncedValues, setDebouncedValues] = useState(values);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValues(values);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [values, delay]);

  return debouncedValues;

}

export default useDebounce