import { useEffect } from "react";
import TodoComponent from "../../components/Todo";
import { Todo } from "../../types/Todo";
import { FlexContainer } from "../../ui/Container/FlexContainer";

const TodoList: Todo[] = [
    {
        id: 1,
        title: "Todo 1",
        time: [12, 0],
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quibusdam!",
        completed: false
    },
    {
        id: 2,
        title: "Todo 2",
        time: [12, 0],
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quibusdam!",
        completed: true
    },
    {
        id: 3,
        title: "Todo 3",
        time: [12, 0],
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, quibusdam!",
        completed: false
    },
]

interface Props {
    date: {
        day: number,
        month: number,
        year: number,
    };
}

const Body = ({ date }: Props) => {

    useEffect(() => {
        
    },[date])

    return (
        <FlexContainer>
            {TodoList.map(todo => <TodoComponent todo={todo}></TodoComponent>)}
        </FlexContainer>
    )
};

export default Body;