import { ChefHat, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#B22222] to-[#E12727] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ChefHat className="text-[#FFDD00] w-8 h-8" />
              <span className="text-2xl font-bold">
                Deli<span className="text-[#FFDD00]">voo</span>
              </span>
            </div>
            <p className="text-white/80 text-sm">
              Sua plataforma completa para gerenciar cardápios de restaurantes e
              lancherias.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#FFDD00]">
              Links Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/home"
                  className="text-white/80 hover:text-[#FFDD00] transition-colors text-sm"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/produto"
                  className="text-white/80 hover:text-[#FFDD00] transition-colors text-sm"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link
                  to="/produto/recomendacoes"
                  className="text-white/80 hover:text-[#FFDD00] transition-colors text-sm"
                >
                  Produtos Saudáveis
                </Link>
              </li>
              <li>
                <Link
                  to="/cadastro"
                  className="text-white/80 hover:text-[#FFDD00] transition-colors text-sm"
                >
                  Cadastre-se
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#FFDD00]">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-white/80 text-sm">
                <Mail className="w-4 h-4 text-[#FFDD00]" />
                contato@delivoo.com
              </li>
              <li className="flex items-center gap-2 text-white/80 text-sm">
                <Phone className="w-4 h-4 text-[#FFDD00]" />
                (71) 99999-9999
              </li>
              <li className="flex items-center gap-2 text-white/80 text-sm">
                <MapPin className="w-4 h-4 text-[#FFDD00]" />
                Brasil - BR
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#FFDD00]">Siga-nos</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-[#FFDD00] p-3 rounded-full transition-all hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-[#FFDD00] p-3 rounded-full transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-[#FFDD00] p-3 rounded-full transition-all hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} Delivoo. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;