import styled from "styled-components";
import DateSelector from "../../components/DateSelector";


type Props = {
    year: number,
    month: number,
    day: number,
    setDate: ({ year, month, day }: { year: number, month: number, day: number }) => void
}

const Header = ({ year, month, day, setDate }: Props) => {

    return (
        <header>
            <DateContainer>
                <Button onClick={() => setDate({ year, month, day: day - 1 })}>←</Button>
                <DateSelector year={year} month={month} day={day} setDate={setDate} />
                <Button onClick={() => setDate({ year, month, day: day + 1 })}>→</Button>
            </DateContainer>
        </header>
    )
}

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: var(--basic-green);
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--dark-green);
  }
`;

export default Header;