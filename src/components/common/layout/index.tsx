import SideBar from '../sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-screen">
      <SideBar />
      <div className="flex flex-col flex-grow">{children}</div>
    </div>
  );
};

export default Layout;
