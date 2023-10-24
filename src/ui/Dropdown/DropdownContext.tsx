import { createContext } from "react";

interface DropdownContextType {
    isOpen: boolean;
    toggle: () => void;
    selected: string;
    handleSelect: (selected: string) => void;
}

const DropdownContext = createContext<DropdownContextType>({
    isOpen: false,
    toggle: () => { },
    selected: "",
    handleSelect: (_item: string) => { },
});

export default DropdownContext;