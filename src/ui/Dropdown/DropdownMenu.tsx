import { ReactElement, ReactNode, useContext } from "react";
import DropdownContext from "./DropdownContext";

const DropdownMenu = ({ as, children }: {as: ReactElement, children: ReactNode}) => {
    const { isOpen } = useContext(DropdownContext);
    
    if (!as) as = <div></div>

    const Component = as.type;
    const props = as.props;

    if (!isOpen) {
        return null;
    }

    return (
        <Component {...props}>
            {children}
        </Component>
    )
}

export default DropdownMenu;