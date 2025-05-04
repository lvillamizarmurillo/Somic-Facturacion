import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import FacturaDetalle from './components/views/FacturaDetalle';
import VerFactura from './components/views/VerFactura';

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FacturaDetalle />} />
          <Route path="/factura/:facturaId" element={<VerFactura />} />
        </Routes>
      </Router>
    </CookiesProvider>
  );
}

export default App;
