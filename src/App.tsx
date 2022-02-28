import { useCallback, useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Stars from './layouts/Stars';
import Navbar from './components/navbar/navbar';
import './App.css';
import Register from './components/users/register';
import Login from './components/users/login';
import { authorizeUser } from './services/user-service';
import Users from './components/users/users';
import Home from './layouts/Home';
import Events from './layouts/Events';
import Profile from './components/users/profile';

const App = () => {
  const [userRole, setUserRole] = useState<userRole | 'guest'>('guest');

  const getUserRole = useCallback(async (): Promise<void> => {
    const res = await authorizeUser();
    setUserRole(res);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      getUserRole();
    }
  }, [userRole]);

  if (userRole !== 'guest') {
    return (
      <div className="App" dir="rtl">
        <HashRouter>
          <Navbar userRole={userRole} />
          <Stars userRole={userRole} />
          <Events />
          <Routes>
            <Route path="users" element={<Users />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </HashRouter>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
