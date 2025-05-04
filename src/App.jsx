import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import FacturaDetalle from './components/views/FacturaDetalle';

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FacturaDetalle />} />
        </Routes>
      </Router>
    </CookiesProvider>
  );
}

export default App;
