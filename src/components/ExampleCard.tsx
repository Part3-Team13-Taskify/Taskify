import { Card } from './common/Card';

const ExampleCard = () => {
  const imgSource = 'assets/card/desktop/card_image1.svg';
  const title = '새로운 일정 관리 Taskify';
  const date = '2022.12.31';
  const profile = 'assets/chip/ellipseDefault.svg';
  return <Card src={imgSource} title={title} date={date} profile={profile}></Card>;
};

export default ExampleCard;
