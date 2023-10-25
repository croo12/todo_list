import useDate from "../../hooks/useDate";
import Body from "./Body";
import Header from "./Header";

const TodoListPage = () => {
    const [date, setDate] = useDate();

    return (
        <div>
            <h1>Todo List</h1>
            <Header year={date.year} month={date.month} day={date.day} setDate={setDate} />
            <Body date={date} />
        </div>
    )
}

export default TodoListPage;