import { faCheck, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const TodoTitle = ({ title, completed, onClick }: { title: string, completed: boolean, onClick?: (e: React.MouseEvent) => void }) => {

    return (
        <TodoContainer $isCompleted={completed}>
            <ButtonLayout>
                <FontAwesomeIcon icon={faCheck} color={completed ? "var(--basic-green)" : "var(--light-gray)"} />
            </ButtonLayout>
            <TodoText onClick={onClick}>
                <span>
                    {title}
                </span>
                <div>
                    <FontAwesomeIcon icon={faClock} color="var(--basic-green)" type="regular" />
                </div>
            </TodoText>
            <ButtonLayout>
                <FontAwesomeIcon icon={completed ? faTrashCan : faXmark} color={completed ? "var(--light-gray)" : "var(--basic-gray)"} />
            </ButtonLayout>
        </TodoContainer>

    )
}

export default TodoTitle;

const ButtonLayout = styled.button`
  border-right: 1px solid #dddddd;
  width: 4rem;
  height: 4rem;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: 0;
  border-radius: 0;

  background-color: transparent;
  box-shadow: none;
`

const TodoText = styled.div`
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-left: 1rem;

    flex: 1;
`

const TodoContainer = styled.div<{ $isCompleted: boolean }>`
  width: 80%;
  display: flex;
  justify-content: space-between;

  margin: 0 auto; 
  background-color: #f4f4f4;
  border: 1px solid #dddddd;
  border-bottom: none;
  cursor: pointer;
  transition: background-color 0.3s;

  font-size: 1rem;
  font-weight: 600;
  color: #333;
  text-decoration: ${props => props.$isCompleted ? 'line-through' : 'none'};

  &:hover {
    background-color: #e9e9e9;
  }

  &:last-of-type {
    border-bottom: 1px solid #dddddd;
  }
`;