import { Link } from "react-router-dom";
function Navbar() {
    return(
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#FF512F] to-[#F09819] p-8 text-white">
            <div className="container flex justify-between text-lg mx-8">
        {/* Logo */}
        <Link to="/home" className="flex items-center space-x-2">
          <img 
          src="/Delivoo.png" 
          alt="Logo Delivoo"
          className="h-20 w-auto"
           />
        </Link>

        {/* Links de navegação */}
        <ul className="hidden md:flex space-x-8 text-lg">
          <li>
            <Link to="/produtos" className="hover:underline text-yellow-200 transition-colors duration-300">
              Cardápio
            </Link>
          </li>
          <li>
            <Link to="/buscar" className="hover:underline text-yellow-200 transition-colors duration-300">
              Buscar
            </Link>
          </li>
          <li>
            <Link to="/carrinho" className="hover:underline text-yellow-200 transition-colors duration-300">
              Carrinho
            </Link>
          </li>
          <li>
            <Link to="/perfil" className="hover:underline text-yellow-200 transition-colors duration-300">
              Perfil
            </Link>
          </li>
        </ul>


        </div>
        </div>

    )

}
export default Navbar;