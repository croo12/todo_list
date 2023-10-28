import styled from "styled-components";
import useDate from "../../hooks/useDate";
import Body from "./Body";
import Header from "./Header";

const TodoListPage = () => {
    const [date, setDate] = useDate();

    return (
        <div>
            <H1>TODO LIST</H1>
            <Header year={date.year} month={date.month} day={date.day} setDate={setDate} />
            <Body date={date} />
        </div>
    )
}

export default TodoListPage;

const H1 = styled.h1`
    color: var(--basic-green);
    text-shadow: 
    -1px -1px 0 #3FC98E,  
    1px -1px 0 #3FC98E,
    -1px 1px 0 #3FC98E,
    1px 1px 0 #3FC98E;
`