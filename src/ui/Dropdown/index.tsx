import DropdownItem from "./DropdownItem";
import DropdownMenu from "./DropdownMenu";
import DropdownTrigger from "./DropdownTrigger";
import Dropdown, { DropdownContextProviderProps } from "./DropdownContextProvider";

interface DropdownType extends React.FC<DropdownContextProviderProps> {
    Trigger: typeof DropdownTrigger;
    Menu: typeof DropdownMenu;
    Item: typeof DropdownItem;
}

(Dropdown as DropdownType).Trigger = DropdownTrigger;
(Dropdown as DropdownType).Menu = DropdownMenu;
(Dropdown as DropdownType).Item = DropdownItem;

export default Dropdown as DropdownType;