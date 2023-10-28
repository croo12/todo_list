import styled from "styled-components"
import Dropdown from "../ui/Dropdown"
import InputComponent from "../ui/Input/InputComponent";
import { Todo } from "../types/Todo";
import { expandFromDown } from "../ui/keyframes";
import TodoTitle from "./TodoTitle";

interface TodoProps {
  todo: Todo;
}

const TodoComponent = ({ todo }: TodoProps) => {
  const { title, time, description, completed } = todo;

  return (
    <Dropdown selected="" onSelect={() => { }}>
      <Dropdown.Trigger as={
        <TodoTitle title={title} completed={completed} />
      }/>
      <Dropdown.Menu as={<TodoMenu></TodoMenu>}>
        <InputComponent
          title="시간"
          value={`${time[0]}:${time[1]}`}
          readOnly />
        <InputComponent
          title="상세 설명"
          value={description}
          readOnly />
        <InputComponent
          title="수행 여부"
          type="checkbox"
          checked={completed} />
      </Dropdown.Menu>
    </Dropdown>
  )
}

const TodoMenu = styled.div`
  width: 85%;

  margin: 0 auto;

  background-color: #f4f4f4;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  padding: 10px;
  transform: translateY(-1.2%) !important;

  animation: ${expandFromDown} 0.1s forwards;
`

export default TodoComponent;