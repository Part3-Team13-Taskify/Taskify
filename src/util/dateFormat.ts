import { format } from 'date-fns';

const FormatDate = (date: string) => {
  return format(new Date(date), 'yyyy.MM.dd');
};

export default FormatDate;
