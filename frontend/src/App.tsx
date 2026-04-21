import { Navigate, Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { SocioeconomicPage } from './pages/SocioeconomicPage';
import { TestPage } from './pages/TestPage';
import { ResultsPage } from './pages/ResultsPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/socioeconomico" element={<SocioeconomicPage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/resultados" element={<ResultsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
