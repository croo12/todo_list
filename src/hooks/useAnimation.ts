import { useCallback, useEffect, useState } from "react";

const useAnimation = (condition: boolean) : [boolean, (e:React.TransitionEvent) => void] => {
  //애니메이션이 끝났을 때 실제로 visible이 false로 바뀌게 된다.
  const [visible, setVisible] = useState(condition);

  useEffect(() => {
    if (condition) {
      setVisible(true);
    }
  }, [condition]);

  const transitionEndHandler = useCallback((e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget) return;

    if (!condition) {
      setVisible(false);
    }
  }, []);

  return [
    visible,
    transitionEndHandler,
  ]
}

export default useAnimation;