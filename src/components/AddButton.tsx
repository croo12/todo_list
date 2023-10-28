import styled from "styled-components";
import useToggle from "../hooks/useToggle";
import AddTodoForm from "./AddTodoForm";

interface Props {
    date: {
        day: number,
        month: number,
        year: number,
    },
    getTodoList: (date: { year: number, month: number, day: number }) => Promise<void>,
}

const AddButton = ({ date, getTodoList }: Props) => {

    const [visible, toggle] = useToggle();

    return (
        <>
            <PlusButton onClick={toggle}>+</PlusButton>
            <AddTodoForm date={date} visible={visible} toggle={toggle} getTodoList={getTodoList} />
        </>
    );
}

export default AddButton;

const PlusButton = styled.button`
  width: 3rem;
  height: 3rem;
  background-color: #f7f7f7;
  border: 1px solid #dddddd;
  border-radius: 50%;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 600;
  color: #333;

  margin: 1rem auto;
  margin-left: 5%;
  margin-right: auto;

  &:hover {
    background-color: var(--basic-green);
    border: 1px solid var(--basic-green);
  }
`;