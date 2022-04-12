import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Stars from './layouts/stars-layout';
import Navbar from './components/navbar/navbar';
import './App.css';
import Register from './components/users/register';
import Login from './components/users/login';
import { authorizeUser } from './services/user-service';
import Users from './components/users/users';
import Home from './layouts/home-layout';
import Events from './layouts/events-layout';
import Profile from './components/users/profile';
import { PlatformType, UserRole } from './types/string-types';

const App = () => {
  const getCurrPlatform = () => {
    const tempPlatform = localStorage.getItem('platformToShow');
    if (tempPlatform) return tempPlatform;
    return 'רעם';
  };

  const [userRole, setUserRole] = useState<UserRole | 'guest'>('guest');
  const [platformToShow, setPlatformToShow] = useState<PlatformType>(
    getCurrPlatform(),
  );

  useEffect(() => {
    const getUserRole = async (): Promise<void> => {
      const res = await authorizeUser();
      setUserRole(res);
    };

    const user = localStorage.getItem('user');
    if (user) getUserRole();
  }, [userRole]);

  if (userRole !== 'guest') {
    return (
      <div className="App" dir="rtl">
        <HashRouter>
          <Navbar {...{ userRole }} />
          <Stars {... { userRole, platformToShow, setPlatformToShow }} />
          <Events {... { userRole, platformToShow }} />
          <Routes>
            <Route path="/" element={<Home {... { userRole }} />} />
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
