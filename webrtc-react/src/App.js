import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Room } from './pages/room';
import { HomePage } from './pages/homepage';
import { RoomManager } from './pages/roommanager';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/room/:roomID" element={<Room />} />
        <Route path="/room" element={<RoomManager />} />
      </Routes>
    </div>
  );
}

export default App;
