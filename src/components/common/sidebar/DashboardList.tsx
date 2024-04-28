import DashboardListItem from './DashboardListItem';

const DashboardList = () => {
  return (
    <div className=" w-full h-45 flex my-16 flex-col mobile:gap-30 mobile:translate-x-4">
      <DashboardListItem />
    </div>
  );
};

export default DashboardList;
