import {
  ChefHat,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
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
            <p className="text-white/80 text-sm leading-relaxed">
              Sua plataforma completa para gerenciar cardápios de restaurantes e
              lancherias com facilidade e eficiência.
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
                  className="text-white/80 hover:text-[#FFDD00] transition-colors text-sm flex items-center gap-2 hover:translate-x-1 duration-200"
                >
                  <span className="text-[#FFDD00]">›</span> Início
                </Link>
              </li>
              <li>
                <Link
                  to="/produto"
                  className="text-white/80 hover:text-[#FFDD00] transition-colors text-sm flex items-center gap-2 hover:translate-x-1 duration-200"
                >
                  <span className="text-[#FFDD00]">›</span> Produtos
                </Link>
              </li>
              <li>
                <Link
                  to="/produtos-saudaveis"
                  className="text-white/80 hover:text-[#FFDD00] transition-colors text-sm flex items-center gap-2 hover:translate-x-1 duration-200"
                >
                  <span className="text-[#FFDD00]">›</span> Produtos Saudáveis
                </Link>
              </li>
              <li>
                <Link
                  to="/cadastro"
                  className="text-white/80 hover:text-[#FFDD00] transition-colors text-sm flex items-center gap-2 hover:translate-x-1 duration-200"
                >
                  <span className="text-[#FFDD00]">›</span> Cadastre-se
                </Link>
              </li>
              <li>
                <Link
                  to="/devs"
                  className="text-white/80 hover:text-[#FFDD00] transition-colors text-sm flex items-center gap-2 hover:translate-x-1 duration-200"
                >
                  <span className="text-[#FFDD00]">›</span> Sobre Nós
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#FFDD00]">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/80 text-sm">
                <Mail className="w-4 h-4 text-[#FFDD00] mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:contato@delivoo.com"
                  className="hover:text-[#FFDD00] transition-colors"
                >
                  contato@delivoo.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/80 text-sm">
                <Phone className="w-4 h-4 text-[#FFDD00] mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+5571999999999"
                  className="hover:text-[#FFDD00] transition-colors"
                >
                  (71) 99999-9999
                </a>
              </li>
              <li className="flex items-start gap-2 text-white/80 text-sm">
                <MapPin className="w-4 h-4 text-[#FFDD00] mt-0.5 flex-shrink-0" />
                <span>Brasil-BR</span>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#FFDD00]">Siga-nos</h3>
            <p className="text-white/70 text-sm mb-4">
              Acompanhe nossas novidades e promoções
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-[#FFDD00] hover:text-[#B22222] p-3 rounded-full transition-all hover:scale-110 duration-300 shadow-lg"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-[#FFDD00] hover:text-[#B22222] p-3 rounded-full transition-all hover:scale-110 duration-300 shadow-lg"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-[#FFDD00] hover:text-[#B22222] p-3 rounded-full transition-all hover:scale-110 duration-300 shadow-lg"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Delivoo. Todos os direitos
              reservados.
            </p>
            <div className="flex gap-4 text-white/70 text-sm">
              <Link
                to="/termos"
                className="hover:text-[#FFDD00] transition-colors"
              >
                Termos de Uso
              </Link>
              <span>•</span>
              <Link
                to="/privacidade"
                className="hover:text-[#FFDD00] transition-colors"
              >
                Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
