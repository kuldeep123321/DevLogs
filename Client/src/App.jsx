import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import SignUp from './Components/Authentication/SignUp';
import Login from './Components/Authentication/Login';
import Landing from './ROLES/Landing/LandingPage';
import SideBar from './Components/Common/SideBar';
import NewProject from './Components/Roles/Manager/NewProject.jsx';
import { useAuth } from './Context/AuthContext.jsx';

const RoleRoute = ({ allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/noaccess" />;

  return (
    <div className="flex">
      <SideBar />
      <div className="ml-[260px] w-full min-h-screen bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/noaccess" element={<div>Access Nahi Hai 🚫</div>} />

      <Route element={<RoleRoute allowedRoles={["Manager"]} />}>
        <Route path="/Manager/Dashboard" element={<div>Dashboard</div>} />
        <Route path="/Manager/NewProject" element={<NewProject />} />
      </Route>
    </Routes>
  )
}