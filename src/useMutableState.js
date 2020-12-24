import { useState, useCallback } from "react";
import produce from "immer";

export default function useMutableState(initialValue) {
  const [value, setValue] = useState(initialValue);

  const updateValue = useCallback((callback) => {
    typeof callback === "function"
      ? setValue(produce(callback))
      : setValue(callback);
  }, []);

  return [value, updateValue];
}