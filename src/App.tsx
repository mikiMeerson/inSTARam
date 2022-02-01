import { HashRouter } from 'react-router-dom';
import Stars from './layouts/Stars';
import Navbar from './components/navbar/navbar';
import './App.css';

const App = () => (
  <HashRouter>
    <div className="App" dir="rtl">
      <Navbar />
      <Stars />
    </div>
  </HashRouter>
);

export default App;
