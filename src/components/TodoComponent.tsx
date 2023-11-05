import { useCallback, useMemo } from 'react';
import styled from "styled-components"
import Dropdown from "../ui/Dropdown"
import InputComponent from "../ui/Input/InputComponent";
import { Todo } from "../types/Todo";
import { expandFromDown } from "../ui/keyframes";
import TodoTitle from "./TodoTitle";
import { invoke } from '@tauri-apps/api';
import TextareaComponent from '../ui/Input/TextareaComponent';

interface TodoProps {
  todo: Todo;
}

const TodoComponent = ({ todo }: TodoProps) => {
  const { id, title, deadline, description, completed } = todo;
  const date = useMemo(() => new Date(deadline), [todo]);

  const toggleChecked = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    await invoke("toggle_completed", {
      id,
      deadline,
      isCompleted: completed,
    });

    invoke("regenerate_todos");

  }, [todo]);

  const removeTodo = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    await invoke("remove_todo", {
      id,
      deadline,
      isCompleted: completed,
    });

    invoke("regenerate_todos");
  }, [todo])

  return (
    <Dropdown selected="" onSelect={() => { }}>
      <Dropdown.Trigger as={
        <TodoTitle date={date} title={title} completed={completed} onChecked={toggleChecked} onRemove={removeTodo} />
      } />
      <Dropdown.Menu as={<TodoMenu></TodoMenu>}>
        <InputComponent
          title="시간"
          value={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`}
          readOnly />
        {description && <TextareaComponent
          title="상세 설명"
          value={description}
          readOnly />}
      </Dropdown.Menu>
    </Dropdown>
  )
}

const TodoMenu = styled.div`

  width: 100%;
  display: flex;
  flex-direction: column;

  padding: 2rem;
  gap: 1rem;

  background-color: #f4f4f4;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--light-gray);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;

  animation: ${expandFromDown} 0.1s forwards;

  margin-bottom: 1rem;
`

export default TodoComponent;