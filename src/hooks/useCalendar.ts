import { useMemo } from "react";

interface Props {
    year: number;
    month: number;
}

const useCalendar = ({ year, month }: Props) => {
    const calendar = useMemo(() => makeCalendar(year, month), [year, month]);

    return {
        days,
        calendar,
    };
};

export default useCalendar;

const days = ["일", "월", "화", "수", "목", "금", "토"];
const makeCalendar = (year: number, month: number): Date[][] => {
    const date = new Date(year, month - 1, 1);
    const days: Date[][] = [[], [], [], [], [], [], []];

    const firstDay = date.getDay();
    date.setDate(date.getDate() - firstDay);

    for (let i = 0; i < 6; i++) {
        for (let _ = 0; _ < 7; _++) {
            days[i].push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
    }

    return days;
}