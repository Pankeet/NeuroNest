import './App.css'
import DashBoard  from './pages/dashboard';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { BrowserRouter as Router , Routes , Route, useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function App() {
return (
  <Router>
    <Routes>
    <Route path="/" element={<HomePage />} />

    <Route path="/login" element={<SignIn  />} />

    <Route path="/signup" element={<SignUp  />} />

    <Route path="/dashboard" element={<DashBoard />} />
    <Route path="*" element={<ErrorPage />} />
    </Routes>
  </Router>
)

}
function ErrorPage(){
    return (
      <div className='font-serif text-6xl grid place-content-center w-screen h-screen text-gray-800'>
          404 Error Not Found !
      </div>
    )
  }
 
  function HomePage() {
    const token = localStorage.getItem("token");
    const nav = useNavigate();
  
    useEffect(() => {
      if (!token) {
        nav("/login");
      } else {
        nav("/dashboard");
      }
    }, [token, nav]);
  
    return null;
  }
export default App;
