import styled from "styled-components"
import { RelativeContainer } from "../ui/Container/RelativeContainer"
import Dropdown from "../ui/Dropdown"
import Input from "../ui/Input/Input";
import { Todo } from "../types/Todo";
import { expandDown } from "../ui/keyframes";

interface TodoProps {
    todo: Todo;
}

const TodoComponent = ({ todo }: TodoProps) => {
    const { title, time, description, completed } = todo;

    return (
        <RelativeContainer>
            <Dropdown selected="" onSelect={() => { }}>
                <Dropdown.Trigger as={<TodoButton $isCompleted={completed}>{title}</TodoButton>} />
                <Dropdown.Menu as={<TodoMenu></TodoMenu>}>
                    <Input title="시간" value={`${time[0]}:${time[1]}`} readOnly />
                    <Input title="상세 설명" value={description} readOnly />
                </Dropdown.Menu>
            </Dropdown>
        </RelativeContainer>
    )
}

const TodoButton = styled.button<{ $isCompleted: boolean }>`
  width: 100%;

  padding: 10px 20px;
  background-color: #f4f4f4;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-decoration: ${props => props.$isCompleted ? 'line-through' : 'none'};

  &:hover {
    background-color: #e9e9e9;
  }
`;

const TodoMenu = styled.div`
  background-color: #f4f4f4;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 10px;
  transform: translateY(-1.2%) !important;

  animation: ${expandDown} 0.1s forwards;
`

export default TodoComponent;