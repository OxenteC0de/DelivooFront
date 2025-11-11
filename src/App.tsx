import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import DevsPage from './pages/devs/DevsPage'
import ProdutosSaudaveis from './pages/ProdutosSaudaveis';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="min-h-[80vh]">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/devs" element={<DevsPage />}/>
          <Route path="/produtos-saudaveis" element={<ProdutosSaudaveis />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
