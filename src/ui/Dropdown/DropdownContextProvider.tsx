import { ReactNode, useCallback } from "react";
import useToggle from "../../hooks/useToggle";
import DropdownContext from "./DropdownContext";

export interface DropdownContextProviderProps {
    children: ReactNode;
    selected: string;
    onSelect: (item: string) => void;
}

const DropdownContextProvider = ({ children, selected, onSelect }: DropdownContextProviderProps) => {
    const [isOpen, toggle] = useToggle();

    const handleSelect = useCallback<(item:string) => void>((item) => {
        onSelect(item);
        toggle();
    }, [onSelect, toggle]);

    return (
        <DropdownContext.Provider value={{ isOpen, toggle, selected, handleSelect }}>
            {children}
        </DropdownContext.Provider>
    )
}

export default DropdownContextProvider;