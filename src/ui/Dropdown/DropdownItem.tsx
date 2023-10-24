import { ReactElement, ReactNode, useContext } from "react";
import DropdownContext from "./DropdownContext";

const DropdownItem = ({ as, value, children }: { as?: ReactElement ,value: string, children?: ReactNode}) => {
    const { handleSelect } = useContext(DropdownContext);

    as = as || <button>{value}</button>
    const val = value;

    const Component = as.type;
    const props = as.props;

    return (
        <Component {...props} onClick={() => handleSelect(val)}>
            {children}
        </Component>
    )
}

export default DropdownItem;