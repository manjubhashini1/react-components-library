import { Outlet } from 'react-router-dom';
import SideNav from '../components/SideNav';

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
