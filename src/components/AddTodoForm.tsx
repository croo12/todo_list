import { FormEvent, useEffect, useState } from "react";

import RightSidebarComponent from "../ui/Sidebar/Sidebar"
import Form from "../ui/Form";
import InputComponent from "../ui/Input/InputComponent";
import { FlexContainer } from "../ui/Container/FlexContainer";
import styled from "styled-components";
import Button from "../ui/Button";
import { invoke } from "@tauri-apps/api/tauri";

type TodoFormState = {
    title: string;
    time: [number, number];
    description: string;
}

const defaultState: TodoFormState = {
    title: "",
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
    }
}

const AddTodoForm = ({ date, visible, toggle }: Props) => {

    const [state, setState] = useState<TodoFormState>(defaultState);

    useEffect(() => {
        setState(defaultState);
    }, [date]);

    const insertTodo = async () => {
        invoke("insert_todo", {
            title: state.title,
            time: state.time,
            description: state.description,
            day: date.day,
            month: date.month,
            year: date.year,
        });
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
                        onChange={(e) => setState({...state, title: e.target.value })}
                        required
                    />
                </FlexContainer>
                <FlexContainer $vertical>
                    <InputComponent
                        title="시"
                        type="number"
                        value={state.time[0]}
                        onChange={(e) => setState({...state, time: [e.target.valueAsNumber, state.time[1]] })}
                    />
                    <Span>:</Span>
                    <InputComponent
                        title="분"
                        type="number"
                        value={state.time[1]}
                        onChange={(e) => setState({...state, time: [state.time[0], e.target.valueAsNumber] })}
                    />
                </FlexContainer>
                <FlexContainer>
                    <InputComponent
                        title="상세 설명"
                        type="text"
                        name="description" 
                        placeholder="상세 설명을 입력하세요"
                        value={state.description}
                        onChange={(e) => setState({...state, description: e.target.value })}
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