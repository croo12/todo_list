import styled from "styled-components";
import useToggle from "../hooks/useToggle";
import AddTodoForm from "./AddTodoForm";

interface Props {
    date: {
        day: number,
        month: number,
        year: number,
    }
}

const AddButton = ({date}: Props) => {

    const [visible, toggle] = useToggle();

    return (
        <>
            <PlusButton onClick={toggle}>+</PlusButton>
            <AddTodoForm date={date} visible={visible} toggle={toggle} />
        </>
    );
}

export default AddButton;

const PlusButton = styled.button`
  width: 50px;        // 버튼의 크기. 원하는 크기로 조절 가능
  height: 50px;
  background-color: #f7f7f7;  // 버튼의 배경색. 원하는 색상으로 조절 가능
  border: none;
  border-radius: 8px;  // 둥근 모서리
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;     // + 모양의 크기
  color: #333;         // + 모양의 색상

  &:hover {
    background-color: #e9e9e9;  // 호버 효과 시 색상 변경
  }
`;