import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Global from './components/Global.jsx'

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Global/>} />
    </Routes>
  </Router>
  )
}

export default App
