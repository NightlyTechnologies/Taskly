import { format, parseISO, addDays } from 'date-fns';

type FormatDate = (date: string, addDay: boolean) => string;

const formatDate: FormatDate = (date, addDay) => {
  try {
    return format(addDays(parseISO(date), addDay ? 1 : 0), 'dd/MM/yyyy');
  } catch (err) {
    return '';
  }
};

export default formatDate;
