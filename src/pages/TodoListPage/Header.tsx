import styled from "styled-components";
import DateSelector from "../../components/DateSelector";


type Props = {
  year: number,
  month: number,
  day: number,
  setDate: ({ year, month, day }: { year: number, month: number, day: number }) => void
}

const HeaderComponent = ({ year, month, day, setDate }: Props) => {

  return (
    <Header>
      <H1>TODO LIST</H1>
      <DateContainer>
        <Button onClick={() => setDate({ year, month, day: day - 1 })}>←</Button>
        <DateSelector year={year} month={month} day={day} setDate={setDate} />
        <Button onClick={() => setDate({ year, month, day: day + 1 })}>→</Button>
      </DateContainer>
    </Header>
  )
}

const Header = styled.header`
  max-height: 30vh;
  padding-bottom: 2rem;
`

const H1 = styled.h1`
    color: var(--basic-green);
    text-shadow: 
    -1px -1px 0 #3FC98E,  
    1px -1px 0 #3FC98E,
    -1px 1px 0 #3FC98E,
    1px 1px 0 #3FC98E;

    max-height: 20vh;
`

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  position: relative;
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

export default HeaderComponent;