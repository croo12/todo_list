import { useCallback, useEffect, useState } from "react";
import TodoComponent from "../../components/TodoComponent";
import { FlexContainer } from "../../ui/Container/FlexContainer";
import { invoke } from "@tauri-apps/api/tauri";
import { Todo } from "../../types/Todo";
import AddButton from "../../components/AddButton";
import { listen } from "@tauri-apps/api/event";

interface Props {
    date: {
        day: number,
        month: number,
        year: number,
    };
}

const Body = ({ date }: Props) => {
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
        <FlexContainer key={"my_todo_list_body"} style={{ gap: 0 }}>
            {todoList.length ? todoList.map(todo => <TodoComponent key={todo.id} todo={todo}></TodoComponent>) : <div>텅~</div>}
            <AddButton key={"body_add_button"} date={date} getTodoList={getTodoList} />
        </FlexContainer>
    )
};

export default Body;