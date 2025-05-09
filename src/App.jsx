import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import FacturaDetalle from './components/views/FacturaDetalle';
import VerFactura from './components/views/VerFactura';
import RegistrarCliente from './components/views/CrearCliente';
import TodasFacturas from './components/views/TodasFacturas';
import KardexFacturas from './components/views/Kardex';

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FacturaDetalle />} />
          <Route path="/factura/:facturaId" element={<VerFactura />} />
          <Route path="/registrar-cliente" element={<RegistrarCliente />} />
          <Route path="/ver-facturas" element={<TodasFacturas />} />
          <Route path="/kardex" element={<KardexFacturas />} />
        </Routes>
      </Router>
    </CookiesProvider>
  );
}

export default App;
