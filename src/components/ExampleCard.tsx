import Card from './common/Card';

const ExampleCard = () => {
  const imgSource = 'assets/card/desktop/card_image1.svg';
  const title = '새로운 일정 관리 Taskify';
  const date = '2024-04-16T06:28:59.964Z';
  const profile = 'assets/chip/ellipseDefault.svg';
  return (
    <div className="m-20">
      <Card src={imgSource} title={title} date={date} profile={profile} />
    </div>
  );
};

export default ExampleCard;
