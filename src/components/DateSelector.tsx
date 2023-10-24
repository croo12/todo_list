import styled from "styled-components";
import Dropdown from "../ui/Dropdown";
import useCalendar from "../hooks/useCalendar";
import { ReactNode } from "react";

type Props = {
    year: number,
    month: number,
    day: number,
    setDate: ({ year, month, day }: { year: number, month: number, day: number }) => void
}

const DateSelector = ({ year, month, day, setDate }: Props) => {

    const { days, calendar } = useCalendar({ year, month });

    const onSelect = (item: string) => {
        const ymd = item.split("-").map(Number);
        setDate({ year: ymd[0], month: ymd[1], day: ymd[2] });
    }

    return (<Dropdown selected={`${year}-${month}-${day}`} onSelect={onSelect}>
        <Dropdown.Trigger />
        <Dropdown.Menu as={
            <CalendarMenu days={days}>{ }</CalendarMenu>
        }>
            {calendar.map((item, index) => {
                return (
                    <tr key={`calendar_item_${index}`}>
                        {item.map((day) => {
                            return (
                                <Dropdown.Item
                                    key={day.toDateString()}
                                    as={<StyledCell $clickable></StyledCell>}
                                    value={`${day.getFullYear()}-${day.getMonth() + 1}-${day.getDate()}`}>
                                    <DateText
                                        $isThisMonth={day.getMonth() + 1 === month}
                                        $isWeekend={day.getDay() === 0 || day.getDay() === 6}
                                    >{day.getDate()}</DateText>
                                </Dropdown.Item>
                            )
                        })}
                    </tr>
                )
            })}
        </Dropdown.Menu>
    </Dropdown>)
}

export default DateSelector;

const CalendarMenu = ({ days, children }: { days: string[], children: ReactNode }) => {

    return (
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
    )
}

const Table = styled.table`
    width: 100%;
    max-width: 80%; 
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