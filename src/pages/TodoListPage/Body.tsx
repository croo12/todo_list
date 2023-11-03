import { FlexContainer } from "../../ui/Container/FlexContainer";
import AddButton from "../../components/AddButton";
import TodoList from "../../components/TodoList";

interface Props {
	date: {
		day: number,
		month: number,
		year: number,
	};
}

const Body = ({ date }: Props) => {
	return (
		<FlexContainer style={{ gap: 0, height: "70vh" }}>
			<TodoList date={date} />
			<AddButton date={date} />
		</FlexContainer>
	)
};

export default Body;