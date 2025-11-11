import { Link } from "react-router-dom";
import type Usuario from "../../../models/Usuario";

interface CardUsuarioProps {
  usuario: Usuario;
}


  return (
    <div className="flex flex-col rounded-2xl overflow-hidden justify-between shadow-lg border border-gray-200">
      <header className="py-2 px-6 bg-[#0077B6] text-white font-bold text-2xl">
        {usuario.nome}
      </header>

      <div className="p-8 bg-white min-h-[120px] flex flex-col gap-2">
        <p className="text-sm text-gray-500">📧 {usuario.email}</p>
        {usuario.foto && (
          <img
            src={usuario.foto}
            alt={usuario.nome}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <span
          className={`inline-block text-xs px-2 py-1 rounded w-fit ${cargoColor}`}
        >
          {usuario.cargo || "usuario"}
        </span>
      </div>

      <div className="flex">
        <Link
          to={`/editarusuario/${usuario.id}`}
          className="w-full text-slate-100 bg-[#0077B6] hover:bg-[#0B2C59]
            flex items-center justify-center py-3 transition-colors"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletarusuario/${usuario.id}`}
          className="text-slate-100 bg-[#0B2C59] hover:bg-red-600 w-full
            flex items-center justify-center transition-colors"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardUsuario;