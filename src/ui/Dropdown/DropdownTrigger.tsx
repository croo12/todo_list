import { ReactElement, useContext } from "react";
import DropdownContext from "./DropdownContext";
import Button from "../Button";

const DropdownTrigger = ({ as }: { as?: ReactElement }) => {
    const { selected, toggle } = useContext(DropdownContext);

    if (!as) as = <Button>{selected}</Button>

    const Component = as.type;
    const { children, ...props } = as.props;

    const clickHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        if (props.onClick)
            props.onClick(e);
        toggle();
    }

    return (
        <Component {...props} onClick={clickHandler}>
            {children}
        </Component>
    )
}

export default DropdownTrigger;