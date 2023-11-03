import { useCallback, useEffect, useState } from "react";
import { Todo } from "../types/Todo";
import { invoke } from "@tauri-apps/api";
import { listen } from "@tauri-apps/api/event";
import TodoComponent from "./TodoComponent";
import styled from "styled-components";

interface Props {
  date: {
    day: number,
    month: number,
    year: number,
  };
}

const TodoList = ({date} : Props) => {
  const [todoList, setData] = useState<Todo[]>([]);

	const getTodoList = useCallback(async ({ year, month, day }: {
		year: number,
		month: number,
		day: number,
	}) => {
		setData(await invoke("get_todo", { year, month, day }));
	}, [setData]);

	useEffect(() => {
		getTodoList({ year: date.year, month: date.month, day: date.day });
		const changeEventListener = listen<void>('regenerate_todo', () => getTodoList({ year: date.year, month: date.month, day: date.day }));

		return () => {
			changeEventListener.then(unmount => unmount());
		}
	}, [date])

  return (
    <StyledTodoList>
      {todoList.length ? todoList.map(todo => <TodoComponent key={todo.id} todo={todo} />) : <div>텅~</div>}
    </StyledTodoList>
  )
}

export default TodoList;

const StyledTodoList = styled.div`
  overflow-y: auto; 
  width: 80%; 
  height: 100%; 
  margin: 0 auto;
`