import { HashRouter, Routes, Route } from 'react-router-dom';
import Stars from './layouts/Stars';
import Navbar from './components/navbar/navbar';
import './App.css';
import Register from './components/users/register';
import Login from './components/users/login';

const App = () => {
  const user = localStorage.getItem('user');

  return (
    <HashRouter>
      {
        user && (
          <div className="App" dir="rtl">
            <Navbar />
            <Stars />
          </div>
        )
      }
      {
        (!user) && (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )
      }
    </HashRouter>
  );
};

export default App;
