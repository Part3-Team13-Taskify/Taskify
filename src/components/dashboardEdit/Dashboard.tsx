import ColorPicker from '../common/colorpicker';

const Dashboard = () => {
  return (
    <div className="w-620 h-256 rounded-8 bg-white px-28 py-32">
      <div className="flex justify-between">
        <p className="font-bold text-20">비브리지</p>
        <ColorPicker />
      </div>
    </div>
  );
};

export default Dashboard;
