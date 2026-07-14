import { HashRouter, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ProjectPage from './pages/ProjectPage';
import './App.css';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/projects/:id" element={<ProjectPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
