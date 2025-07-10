import './App.css'
import DashBoard  from './pages/dashboard';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import { useState } from 'react';

function App() {

  const [state , setState ] = useState('Dashboard');

  if(state === 'login'){
    return (
      <div className='font-serif grid place-content-center h-screen'>
        <SignIn setState={setState}/>
      </div>
    )
  }

  else if(state === 'signup'){
    return (
      <div className='font-serif grid place-content-center h-screen'>
        <SignUp />
      </div>
    )
  }
  else if(state === 'Dashboard'){
    return (
      <div className='font-serif'>
        <DashBoard />
      </div>
    )
  }

  else{
    return (
      <div className='font-serif text-6xl grid place-content-center w-screen h-screen text-gray-800'>
          404 Error Not Found !
      </div>
    )
  }
}  


export default App;
