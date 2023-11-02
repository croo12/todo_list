import { FormEvent, useEffect, useState } from "react";

import RightSidebarComponent from "../ui/Sidebar/Sidebar"
import Form from "../ui/Form";
import InputComponent from "../ui/Input/InputComponent";
import { FlexContainer } from "../ui/Container/FlexContainer";
import styled from "styled-components";
import Button from "../ui/Button";
import { invoke } from "@tauri-apps/api/tauri";
import DateSelector from "./DateSelector";
import TimeSelector from "./TimeSelector";

type TodoFormState = {
    title: string;
    date: Date;
    time: [number, number];
    description: string;
}

const defaultState: TodoFormState = {
    title: "",
    date: new Date(),
    time: [0, 0],
    description: "",
}

interface Props {
    visible: boolean;
    toggle: () => void;
    date: {
        day: number,
        month: number,
        year: number,
    },
    getTodoList: (date: { year: number, month: number, day: number }) => Promise<void>,
}

const AddTodoForm = ({ date, visible, toggle, getTodoList }: Props) => {

    const [state, setState] = useState<TodoFormState>({
        ...defaultState,
        date: new Date(date.year, date.month - 1, date.day)
    });

    useEffect(() => {
        setState(defaultState);
    }, [date]);

    const insertTodo = async () => {
        const year = state.date.getFullYear();
        const month = state.date.getMonth() + 1;
        const day = state.date.getDate();
        const calcedTime = new Date(year, month - 1, day, state.time[0], state.time[1]);
        
        console.log(calcedTime.getTime());

        await invoke("insert_todo", {
            title: state.title,
            deadline: calcedTime.getTime(),
            description: state.description,
        });
        getTodoList(date);
    }

    return (
        <RightSidebarComponent visible={visible}>
            <StyledTitle>할 일 등록하기</StyledTitle>
            <Form onSubmit={(event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                insertTodo();
                toggle();
            }}>
                <FlexContainer>
                    <InputComponent
                        title="할 일"
                        type="text"
                        name="title"
                        placeholder="할 일을 입력하세요"
                        value={state.title}
                        onChange={(e) => setState({ ...state, title: e.target.value })}
                        required
                    />
                </FlexContainer>
                <FlexContainer>
                    <DateSelector
                        year={state.date.getFullYear()}
                        month={state.date.getMonth() + 1}
                        day={state.date.getDate()}
                        setDate={({ year, month, day }: {
                            day: number,
                            month: number,
                            year: number,
                        }) => {
                            setState({ ...state, date: new Date(year, month - 1, day) });
                        }} />
                </FlexContainer>
                <FlexContainer>
                    <TimeSelector
                        time={{hour: state.time[0], minute: state.time[1]}}
                        setTime={(item: {hour: number, minute: number}) => setState({...state, time: [item.hour, item.minute] })} 
                        />
                </FlexContainer>
                <FlexContainer>
                    <InputComponent
                        title="상세 설명"
                        type="text"
                        name="description"
                        placeholder="상세 설명을 입력하세요"
                        value={state.description}
                        onChange={(e) => setState({ ...state, description: e.target.value })}
                    />
                </FlexContainer>
                <FlexContainer>
                    <Button type="submit">등록하기</Button>
                </FlexContainer>
            </Form>
        </RightSidebarComponent>
    )
}

export default AddTodoForm;

const StyledTitle = styled.h1`
    color: black;
`

const Span = styled.span`
    font-size: 1rem;
    font-weight: 600;
    color: black;

    display: flex;
    align-items: center;
    justify-content: center;
`