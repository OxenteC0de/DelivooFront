import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Menu,
  X,
  ChefHat,
  LogOut,
  User,
  Package,
  FolderOpen,
  Target,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function logout() {
    handleLogout();
    alert("Usuário deslogado com sucesso!");
    navigate("/login");
  }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-[#E12727] to-[#FF9B00] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2 group">
            <ChefHat className="text-[#FFDD00] w-8 h-8 group-hover:rotate-12 transition-transform" />

            <span className="text-white text-2xl font-bold flex items-center">
              Deli
              <span className="text-[#FFDD00] flex items-center">
                v
                <span className="flex items-center relative top-[2px]">
                  {/* ajuste fino: top-[1px], top-[2px], top-[3px] */}
                  <Target className="w-5 h-5 inline-block" />
                  <Target className="w-5 h-5 inline-block -ml-1" />
                </span>
              </span>
            </span>
          </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/home"
              className="text-white hover:text-[#FFDD00] transition-colors font-semibold flex items-center gap-2"
            >
              <ChefHat className="w-4 h-4" />
              Início
            </Link>

            <Link
              to="/produto"
              className="text-white hover:text-[#FFDD00] transition-colors font-semibold flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Produtos
            </Link>

            <Link
              to="/categorias"
              className="text-white hover:text-[#FFDD00] transition-colors font-semibold flex items-center gap-2"
            >
              <FolderOpen className="w-4 h-4" />
              Categorias
            </Link>

            {usuario.token ? (
              <div className="flex items-center gap-4">
                {/* Link para Perfil com "Olá, [nome]" */}
                <Link
                  to="/perfil"
                  className="text-white hover:text-[#FFDD00] transition-colors font-semibold flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
                >
                  <User className="w-4 h-4" />
                  Olá, {usuario.nome || usuario.usuario}
                </Link>

                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-md hover:shadow-xl hover:scale-105"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-[#FFDD00] hover:bg-[#FFD000] text-[#B22222] px-6 py-2 rounded-full font-bold transition-all shadow-md hover:shadow-xl hover:scale-105"
              >
                Entrar
              </Link>
            )}
          </div>

          {/* Botão Mobile */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-[#FFDD00] transition-colors"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-white/20 pt-4">
            <Link
              to="/home"
              onClick={toggleMenu}
              className="block text-white hover:text-[#FFDD00] transition-colors font-semibold flex items-center gap-2"
            >
              <ChefHat className="w-4 h-4" />
              Início
            </Link>

            <Link
              to="/produto"
              onClick={toggleMenu}
              className="block text-white hover:text-[#FFDD00] transition-colors font-semibold flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Produtos
            </Link>

            <Link
              to="/categorias"
              onClick={toggleMenu}
              className="block text-white hover:text-[#FFDD00] transition-colors font-semibold flex items-center gap-2"
            >
              <FolderOpen className="w-4 h-4" />
              Categorias
            </Link>

            {usuario.token ? (
              <>
                {/* Link para Perfil Mobile */}
                <Link
                  to="/perfil"
                  onClick={toggleMenu}
                  className="block text-white hover:text-[#FFDD00] transition-colors font-semibold flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg"
                >
                  <User className="w-4 h-4" />
                  Olá, {usuario.nome || usuario.usuario}
                </Link>

                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={toggleMenu}
                className="block bg-[#FFDD00] hover:bg-[#FFD000] text-[#B22222] px-6 py-2 rounded-full font-bold transition-all text-center"
              >
                Entrar
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
