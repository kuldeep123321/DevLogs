import { Routes, Route, Navigate } from 'react-router-dom'
import SignUp from './Components/Authentication/SignUp';
import Login from './Components/Authentication/Login';
import Landing from './ROLES/Landing/LandingPage';
// import api from './api';
const ProtectedRoute=({children})=>{
  const token=localStorage.getItem("accessToken");
  if(!token) return <Navigate to="/login"/>
  return children;
}
const RoleRoute=({children,allowedRoles})=>{
  const token=localStorage.getItem("accessToken");
  const role=localStorage.getItem("role");
  if(!token){
    return <Navigate to="/login"/>
  }
  if(!allowedRoles.includes(role)){
    return <Navigate to="/noaccess"/>
  }
  return children;
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/noaccess" element={<div>Access Nahi Hai 🚫</div>} />
      <Route paht="/dashboard" element={
        <ProtectedRoute><div>Dashboard</div></ProtectedRoute>
      }/>
      <Route path="/editor" element={
        <RoleRoute allowedRoles={["admin", "editor"]}>
          <div>Editor Page ✏️</div>
        </RoleRoute>
      } /> */}
    </Routes>
  )
}
