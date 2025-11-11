import { Link } from "react-router-dom";

function Footer(){
    return(
        <div className=" flex flex-col items-center justify-center bg-gradient-to-r from-[#FF512F] to-[#F09819] p-2 text-white">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Coluna 1: Logo e descrição */}
        <div>
          <h2 className="text-2xl font-bold mb-3">DELIVOO</h2>
          <p className="text-sm text-white/90 leading-relaxed">
            Entregamos com rapidez, qualidade e carinho.  
            Sua refeição, no seu tempo 💛
          </p>
        </div>

        {/* Coluna 2: Links */}
        <div>
          <ul className="space-y-2 text-white/90">
            <li><Link to="/devs" className="text-lg font-semibold mb-3 hover:underline underline-offset-4">Sobre nós</Link></li>
          </ul>
        </div>

        {/* Coluna 3: Contato / Redes */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contato</h3>
          <ul className="space-y-2 text-white/90">
            <li>Email: <a href="mailto:contato@delivoo.com" className="hover:underline">contato@delivoo.com</a></li>
          </ul>

          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-yellow-200 transition"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </div>

      {/* Linha inferior */}
      <div className="text-center text-white/80 text-sm mt-8 border-t border-white/20 pt-4">
        © {new Date().getFullYear()} Delivoo — Todos os direitos reservados.
      </div>
        </div>


    )
}

export default Footer;