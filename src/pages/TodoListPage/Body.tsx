import { useCallback, useEffect, useState } from "react";
import TodoComponent from "../../components/Todo";
import { FlexContainer } from "../../ui/Container/FlexContainer";
import { invoke } from "@tauri-apps/api/tauri";
import { Todo } from "../../types/Todo";
import AddButton from "../../components/AddButton";

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
    }, [date])

    return (
        <FlexContainer>
            {todoList.length ? todoList.map(todo => <TodoComponent todo={todo}></TodoComponent>) : <div>텅~</div>}
            <AddButton date={date} />
        </FlexContainer>
    )
};

export default Body;