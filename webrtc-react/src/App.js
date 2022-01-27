import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Conference } from './pages/conference';
import { HomePage } from './pages/homepage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/conference/:roomID" element={<Conference />} />
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
