import { Routes, Route } from 'react-router-dom'
import SignUp from './Components/Authentication/SignUp';
import Login from './Components/Authentication/Login';
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
