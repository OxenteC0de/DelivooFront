import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import ListaProdutos from "./components/produto/listaproduto/ListaProduto";
import FormProduto from "./components/produto/formproduto/FormProduto";
import DeletarProduto from "./components/produto/deletarproduto/DeletarProduto";
import DeletarCategoria from "./components/categorias/deletarcategoria/DeletarCategoria";
import FormCategoria from "./components/categorias/formcategoria/FormCategoria";
import ListaCategorias from "./components/categorias/listacategoria/ListaCategoria";
import DevsPage from './pages/devs/DevsPage'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/*Home E login & cadastro*/}
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />

            {/*Produtos*/}
            <Route path="/produto" element={<ListaProdutos />} />
            <Route path="/produto/cadastrar" element={<FormProduto />} />
            <Route path="/editarproduto/:id" element={<FormProduto />} />
            <Route path="/deletarproduto/:id" element={<DeletarProduto />} />

            {/*Categorias*/}
            <Route path="/categorias" element={<ListaCategorias />} />
            <Route path="/categorias/cadastrar" element={<FormCategoria />} />
            <Route path="/categorias/editar/:id" element={<FormCategoria />}/>
            <Route path="/categorias/deletar/:id" element={<DeletarCategoria/>} />

            <Route path="/devs" element={<DevsPage />}/>

          </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;