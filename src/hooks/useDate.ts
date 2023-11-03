import { useCallback, useState } from "react";

type Date = {
	day: number;
	month: number;
	year: number;
}

const useDate = (): [Date, (date: Date) => void] => {
	const [date, setter] = useState(new Date());

	const setDate = useCallback(({ year, month, day }: Date) => {
		setter(new Date(year, month - 1, day));
	}, [setter]);

	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	return [{ year, month, day }, setDate];
}

export default useDate;