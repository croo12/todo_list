import { useCallback, useState } from "react";

const useToggle = (value?: true): [boolean, () => void] => {
    const [state, setState] = useState(value || false);

    const toggle = useCallback(() => {
        setState((state) => !state);
    }, [setState]);

    return [state, toggle];
}

export default useToggle;