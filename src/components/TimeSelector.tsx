import { ReactNode, useState } from "react";
import Dropdown from "../ui/Dropdown"
import InputComponent from "../ui/Input/InputComponent";
import ReactDOM from "react-dom";
import { Overlay } from "../ui/Modal/Overlay";
import { FixedContainer } from "../ui/Container/FixedContainer";
import { FlexContainer } from "../ui/Container/FlexContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";

interface Props {
    time: { hour: number, minute: number };
    setTime: (time: { hour: number, minute: number }) => void;
}

const TimeSelector = ({ time, setTime }: Props) => {

    const valueAs = `${time.hour < 10 ? `0${time.hour}` : time.hour}:${time.minute < 10 ? `0${time.minute}` : time.minute}`;
    const [tmpTime, setTmpTime] = useState<{ hour: number, minute: number }>(time);

    return (
        <Dropdown selected={valueAs} onSelect={(item) => {
            const [hour, minute] = item.split(":");
            setTime({ hour: parseInt(hour), minute: parseInt(minute) });
        }}>
            <Dropdown.Trigger as={<TimeDisplay >{valueAs}</TimeDisplay>} />
            <Dropdown.Menu as={<TimeMenu time={tmpTime} setTime={setTmpTime}>{ }</TimeMenu>}>
                {ReactDOM.createPortal(
                    <Dropdown.Item as={<Overlay />} value={valueAs} />,
                    document.body
                )}
                <Dropdown.Item value={`${tmpTime.hour}:${tmpTime.minute}`}>Done</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

const TimeMenu = ({ time, setTime, children }: {
    time: { hour: number, minute: number },
    setTime: React.Dispatch<React.SetStateAction<{
        hour: number;
        minute: number;
    }>>,
    children: ReactNode
}
) => {
    const { hour, minute } = time;
    const calculatedHour = hour % 12 || 12;

    const addHour = () => {
        setTime(prev => {
            if (prev.hour === 23)
                return { hour: 0, minute: prev.minute };
            return { hour: prev.hour + 1, minute: prev.minute }
        })
    };

    const subtractHour = () => {
        setTime(prev => {
            if (prev.hour === 0)
                return { hour: 23, minute: prev.minute };
            return { hour: prev.hour - 1, minute: prev.minute }
        })
    };

    const addMinute = () => {
        setTime(prev => {
            if (prev.minute === 55 && prev.hour !== 23)
                return { hour: prev.hour + 1, minute: 0 }
            if (prev.minute === 55 && prev.hour === 23)
                return { hour: 0, minute: 0 };
            return { hour: prev.hour, minute: prev.minute + 5 }
        })
    };

    const subtractMinute = () => {
        setTime(prev => {
            if (prev.minute === 0 && prev.hour !== 0)
                return { hour: prev.hour - 1, minute: 55 }
            if (prev.minute === 0 && prev.hour === 0)
                return { hour: 23, minute: 55 };
            return { hour: prev.hour, minute: prev.minute - 5 }
        })
    };

    return ReactDOM.createPortal(
        <FixedContainer>
            <FlexContainer $vertical>
                <FlexContainer>
                    <NotBorderButton type="button" onClick={addHour}>
                        <FontAwesomeIcon color={'var(--basic-green)'} icon={faChevronUp} />
                    </NotBorderButton>
                    <TimeBox>
                        {calculatedHour < 10 ? `0${calculatedHour}` : calculatedHour}
                    </TimeBox>
                    <NotBorderButton type="button" onClick={subtractHour}>
                        <FontAwesomeIcon color={'var(--basic-green)'} icon={faChevronDown} />
                    </NotBorderButton>
                </FlexContainer>
                <FlexContainer>
                    <NotBorderButton type="button" onClick={addMinute}>
                        <FontAwesomeIcon color={'var(--basic-green)'} icon={faChevronUp} />
                    </NotBorderButton>
                    <TimeBox>
                        {minute < 10 ? `0${minute}` : minute}
                    </TimeBox>
                    <NotBorderButton type="button" onClick={subtractMinute}>
                        <FontAwesomeIcon color={'var(--basic-green)'} icon={faChevronDown} />
                    </NotBorderButton>
                </FlexContainer>
                <FlexContainer style={{ justifyContent: 'center', flex: '1' }}>
                    <TimeBox>
                        {hour >= 12 ? "PM" : "AM"}
                    </TimeBox>
                </FlexContainer>
            </FlexContainer>
            <FlexContainer>
                {children}
            </FlexContainer>
        </FixedContainer>, document.body);
}

export default TimeSelector;

const TimeDisplay = styled.button`
  display: inline-block;
  padding: 10px 20px;
  background-color: #f4f4f4;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  font-size: 16px;
  font-weight: 600;
  color: #333;

  &:hover {
    background-color: #e9e9e9;
  }
`;

const TimeBox = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;

    border-top: 2px solid var(--basic-green);
    border-bottom: 2px solid var(--basic-green);

    padding-top: 0.5rem;
    padding-bottom: 0.5rem;

    min-width: 3rem;
`

const NotBorderButton = styled.button`
    border: none;
    box-shadow: none;
`