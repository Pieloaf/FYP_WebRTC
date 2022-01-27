import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Conference } from './pages/conference';
import { HomePage } from './pages/homepage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/conference" element={<Conference />} />
        <Route path="/conference/:roomID" element={<Conference />} />
      </Routes>
    </div>
  );
}

export default App;
