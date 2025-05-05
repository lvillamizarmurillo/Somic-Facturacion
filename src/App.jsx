import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import FacturaDetalle from './components/views/FacturaDetalle';
import VerFactura from './components/views/VerFactura';
import RegistrarCliente from './components/views/CrearCliente';

function App() {
  return (
    <CookiesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FacturaDetalle />} />
          <Route path="/factura/:facturaId" element={<VerFactura />} />
          <Route path="/registrar-cliente" element={<RegistrarCliente />} />
        </Routes>
      </Router>
    </CookiesProvider>
  );
}

export default App;
