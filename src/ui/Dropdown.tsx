import { ReactElement, ReactNode, createContext, useContext } from "react";
import useToggle from "../hooks/useToggle";

const DropdownContext = createContext({
    isOpen: false,
    toggle: () => { },
});

const DropdownComponent = ({ children }: { children: ReactNode }) => {
    const [isOpen, toggle] = useToggle();

    return (
        <DropdownContext.Provider value={{ isOpen, toggle }}>
            {children}
        </DropdownContext.Provider>
    )
}

type DropdownCompoundProps = {
    as: ReactElement,
}

const DropdownTrigger = ({ as }: DropdownCompoundProps) => {
    const { toggle } = useContext(DropdownContext);

    const Component = as.type;
    const { children, ...props } = as.props;

    const clickHandler = (e: React.MouseEvent) => {
        e.preventDefault();

        if (props.onClick) {
            props.onClick(e);
        }

        toggle();
    }

    return (
        <Component {...props} onClick={clickHandler}>
            {children}
        </Component>
    )
}

const DropdownMenu = ({ as }: DropdownCompoundProps) => {
    const { isOpen, toggle } = useContext(DropdownContext);

    const Component = as.type;
    const { children, ...props } = as.props;

    if (!isOpen) {
        return null;
    }

    const clickHandler = (e: React.MouseEvent) => {
        e.preventDefault();

        if (props.onClick) {
            props.onClick(e);
        }

        toggle();
    }

    return (
        <Component {...props} onClick={clickHandler}>
            {children}
        </Component>
    )
}

export default DropdownComponent;

DropdownComponent.Trigger = DropdownTrigger;
DropdownComponent.Menu = DropdownMenu;