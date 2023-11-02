import { faCheck, faTrashCan, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { FlexContainer } from "../ui/Container/FlexContainer";

interface Props {
    title: string,
    completed: boolean,
    date: Date,
    onClick?: (e: React.MouseEvent) => void,
    onChecked: (e: React.MouseEvent) => void,
    onRemove: (e: React.MouseEvent) => void
}

const TodoTitle = ({ title, completed, date, onClick, onChecked, onRemove }: Props) => {
    const now = new Date();
    const timeDiff = date.getTime() - now.getTime();
    const expired = timeDiff < 0;

    const message = leftDateMessage(timeDiff);

    return (
        <TodoContainer $isCompleted={completed}>
            <ButtonLayout onClick={onChecked}>
                <FontAwesomeIcon icon={faCheck} color={completed ? "var(--basic-green)" : "var(--light-gray)"} />
            </ButtonLayout>
            <TodoText onClick={onClick}>
                <Title $isCompleted={completed}>
                    {title}
                </Title>
                <FlexContainer $vertical style={{ alignItems: "center", gap: "5px" }}>
                    {!completed && (
                        <>
                            <FontAwesomeIcon icon={faClock} color={expired ? "var(--basic-red)" : "var(--basic-green)"} type="regular" />
                            <LeftTimeSpan $expired={expired}>{expired ? "expired" : message}</LeftTimeSpan>
                        </>
                    )}
                </FlexContainer>
            </TodoText>
            <ButtonLayout onClick={onRemove}>
                <FontAwesomeIcon icon={completed ? faTrashCan : faXmark} color={completed ? "var(--light-gray)" : "var(--basic-gray)"} />
            </ButtonLayout>
        </TodoContainer>

    )
}

export default TodoTitle;

const leftDateMessage = (timeDiff: number) => {
    const { day, hour, minute } = calcLeftDate(timeDiff);

    if (day !== 0)
        return `${day} days`;

    if (hour !== 0)
        return `${hour} hours`;

    return `${minute ? minute : 1} minutes`;
};

const calcLeftDate = (timeDiff: number) => {
    const second = timeDiff / 1000;
    const minute = second / 60;
    const hour = minute / 60;
    const day = hour / 24;

    return {
        day: Math.floor(day),
        hour: Math.floor(hour % 24),
        minute: Math.floor(minute % 60),
    }
}

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

const LeftTimeSpan = styled.span<{ $expired: boolean }>`
  font-size: 1rem;
  font-weight: 300;

  color: ${props => props.$expired ? "var(--basic-red)" : "var(--basic-green)"};
`

const TodoText = styled.div`
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding-left: 1rem;

    flex: 1;
`

const Title = styled.span<{ $isCompleted: boolean }>`
    color: ${props => props.$isCompleted? "var(--dark-gray)" : "var(--basic-black)"};

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