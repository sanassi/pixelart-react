import {useEffect, useState} from "react";

export default function useColorState(initialValue) {
  const [colorValue, setColorValue] = useState(initialValue);
  
  useEffect(() => {
    if (initialValue) {
      setColorValue(initialValue);
    }
  }, [initialValue])
  
  return [colorValue, setColorValue];
}