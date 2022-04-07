import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Room } from './pages/room.js';
import { HomePage } from './pages/homepage';
import GlobalStyle from "./styles/globalStyle";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/room/:roomID" element={<Room />} />
      </Routes>
    </div>
  );
}

export default App;
