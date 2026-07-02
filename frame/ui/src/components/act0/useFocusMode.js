import { useState, useCallback, useRef } from "react";

// Pattern A focus mode: typing recedes HUD to 3% opacity, returns 2s after last keystroke.
export function useFocusMode() {
  const [focused, setFocused] = useState(false);
  const timerRef = useRef(null);

  const onTyping = useCallback(() => {
    setFocused(true);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setFocused(false), 2000);
  }, []);

  const onBlur = useCallback(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setFocused(false), 2000);
  }, []);

  const cancelFocus = useCallback(() => {
    clearTimeout(timerRef.current);
    setFocused(false);
  }, []);

  return { focused, onTyping, onBlur, cancelFocus };
}
