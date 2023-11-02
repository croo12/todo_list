import { ReactNode, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

import Dropdown from "../ui/Dropdown";
import useCalendar from "../hooks/useCalendar";
import { FlexContainer } from "../ui/Container/FlexContainer";
import Button from "../ui/Button";
import { Overlay } from "../ui/Modal/Overlay";
import { FixedContainer } from "../ui/Container/FixedContainer";

type Month = {
    year: number,
    month: number,
}

interface Props {
    year: number,
    month: number,
    day: number,
    setDate: ({ year, month, day }: { year: number, month: number, day: number }) => void
}

const DateSelector = ({ year, month, day, setDate }: Props) => {

    const [date, setter] = useState<Month>({ year, month });
    const { days, calendar } = useCalendar(date);

    const onSelect = (item: string) => {
        const ymd = item.split("-").map(Number);
        setDate({ year: ymd[0], month: ymd[1], day: ymd[2] });
    }

    return (

        <Dropdown selected={`${year}-${month}-${day}`} onSelect={onSelect}>
            <Dropdown.Trigger as={<DateDisplay>{`${year}-${month}-${day}`}</DateDisplay>} />
            <Dropdown.Menu as={
                <CalendarMenu days={days} date={date} setter={setter}>{ }</CalendarMenu>
            }>
                {ReactDOM.createPortal(
                    <Dropdown.Item as={<Overlay />} value={`${year}-${month}-${day}`} />
                    , document.body)}
                {calendar.map((item, index) => {
                    return (
                        <tr key={`calendar_item_${index}`}>
                            {item.map((day) => {
                                return (
                                    <Dropdown.Item
                                        key={day.toDateString()}
                                        as={<StyledCell $clickable></StyledCell>}
                                        value={`${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`}
                                    >
                                        <DateText
                                            $isThisMonth={day.getMonth() + 1 === date.month}
                                            $isWeekend={day.getDay() === 0 || day.getDay() === 6}
                                        >
                                            {day.getDate()}
                                        </DateText>
                                    </Dropdown.Item>
                                )
                            })}
                        </tr>
                    )
                })}

            </Dropdown.Menu>
        </Dropdown>
    )
}

export default DateSelector;

const CalendarMenu = ({ days, date, setter, children }:
    { days: string[], date: Month, setter: React.Dispatch<React.SetStateAction<Month>>, children: ReactNode }) => {

    return (
        ReactDOM.createPortal(
            (<FixedContainer>
                <FlexContainer $vertical style={{ justifyContent: "center" }}>
                    <Button onClick={
                        (e: React.MouseEvent) => {
                            e.preventDefault();

                            if (date.month === 1)
                                setter(prev => ({ year: prev.year - 1, month: 12 }));
                            else
                                setter(prev => ({ ...prev, month: prev.month - 1 }));
                        }
                    }>←</Button>
                    <Span >{`${date.year}.${date.month}`}</Span>
                    <Button onClick={
                        (e: React.MouseEvent) => {
                            e.preventDefault();

                            if (date.month === 12)
                                setter(prev => ({ year: prev.year + 1, month: 1 }));
                            else
                                setter(prev => ({ ...prev, month: prev.month + 1 }));
                        }
                    }>→</Button>
                </FlexContainer>
                <Table>
                    <THead>
                        <tr>
                            {days.map((day) => (
                                <Th key={day} >
                                    {day}
                                </Th>
                            ))}
                        </tr>
                    </THead>
                    <tbody>
                        {children}
                    </tbody>
                </Table>
            </FixedContainer>
        ), document.body)
    )
}


const Span = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 24px;
    font-weight: 600;
    color: black;
`;

const DateDisplay = styled.button`
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

const Table = styled.table`
    width: 100%;
    min-width: 40rem; 
    border-collapse: collapse;
    margin: 20px auto;


`

const THead = styled.thead`
background-color: #f5f5f5;
`

const Th = styled.th`
font-weight: 600;
color: #666;
padding: 10px;
`

const StyledCell = styled.td<{ $clickable: boolean }>`
  width: 10vw;
  height: 10vh;

  vertical-align: top;
  padding: 5px;
  
  border: 1px solid lightgray;
  background-color: white;
  cursor: ${props => (props.$clickable ? 'pointer' : 'default')};
  
  transition: transform 0.2s;
  transition: background-color 0.3s;

  &:hover {
    transform: ${props => (props.$clickable ? 'scale(1.05)' : 'none')};
    background-color: ${props => (props.$clickable ? '#f5f5f5' : 'white')};
  }

  &.today {
    background-color: #ffeb3b;
    font-weight: bold;
  }
`;

const DateText = styled.span<{ $isThisMonth: boolean, $isWeekend: boolean }>`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  color: ${props => !props.$isWeekend ? 'black' : 'red'};
  font-weight: ${props => !props.$isWeekend ? '450' : '600'};;
  opacity: ${props => props.$isThisMonth ? '1' : '0.5'};
`;