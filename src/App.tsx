import { useEffect, useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Stars from './layouts/Stars';
import Navbar from './components/navbar/navbar';
import './App.css';
import Register from './components/users/register';
import Login from './components/users/login';
import { getUserRole } from './services/user-service';

const App = () => {
  const user = localStorage.getItem('user');
  if (user) {
    const [role, setRole] = useState<userRole>('viewer');

    useEffect(() => {
      getUserRole().then((res) => (res ? setRole(res) : setRole('viewer')));
      localStorage.setItem('role', role);
    }, [role]);

    return (
      <HashRouter>
        <div className="App" dir="rtl">
          <Navbar role={role} />
          <Stars />
        </div>
      </HashRouter>
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
