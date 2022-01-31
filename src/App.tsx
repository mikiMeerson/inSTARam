import { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Stars from './layouts/Stars';
import Navbar from './components/navbar/navbar';
import './App.css';
import SignUp from './components/users/signUp';
import LogIn from './components/users/login';

const App = () => {
  const [user, setUser] = useState();

  if (user) {
    return (
      <HashRouter>
        <div className="App" dir="rtl">
          <Navbar />
          <Stars />
        </div>
      </HashRouter>
    );
  }
  return (
    <LogIn />
  );
};

export default App;
