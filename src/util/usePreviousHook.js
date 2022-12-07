import { useEffect, useRef } from 'react';

function usePrevious(value) {
  let { current } = useRef();
  useEffect(() => {
    current = value; // assign the value of ref to the argument
  }, [value]); // this code will run when the value of 'value' changes
  return current; // in the end, return the current ref value.
}
export default usePrevious;
