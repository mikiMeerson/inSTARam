import { useCallback, useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Stars from './layouts/Stars';
import Navbar from './components/navbar/navbar';
import './App.css';
import Register from './components/users/register';
import Login from './components/users/login';
import { authorizeUser } from './services/user-service';
import Users from './components/users/users';

const App = () => {
  const [userRole, setUserRole] = useState<userRole>('viewer');
  const user = localStorage.getItem('user');

  const getUserRole = useCallback(async (): Promise<void> => {
    const res = await authorizeUser();
    setUserRole(res);
  }, []);

  useEffect(() => {
    if (user) {
      getUserRole();
    }
  }, [getUserRole, user]);

  if (user) {
    return (
      <div className="App" dir="rtl">
        <HashRouter>
          <Navbar userRole={userRole} />
          <Stars userRole={userRole} />
          <Routes>
            <Route path="/users" element={<Users />} />
          </Routes>
        </HashRouter>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
