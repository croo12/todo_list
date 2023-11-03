import styled from "styled-components";
import useToggle from "../hooks/useToggle";
import AddTodoForm from "./AddTodoForm";

interface Props {
	date: {
		day: number,
		month: number,
		year: number,
	},
}

const AddButton = ({ date }: Props) => {

	const [visible, toggle] = useToggle();

	return (
		<>
			<PlusButton onClick={toggle}>+</PlusButton>
			<AddTodoForm date={date} visible={visible} toggle={toggle} />
		</>
	);
}

export default AddButton;

const PlusButton = styled.button`
  position: fixed;
  left: 1rem;
  bottom: 2rem; 

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  color: #333;

  width: 3rem;
  height: 3rem;
  background-color: var(--basic-green);
  border: 1px solid var(--basic-green);
  border-radius: 50%;
  cursor: pointer;

  margin: 1rem auto;
  margin-left: 5%;
  margin-right: auto;

  &:hover {
    background-color: var(--dark-green);
    border: 1px solid var(--dark-green);
  }
`;