import { Link } from "react-router-dom";
import type Categoria from "../../../models/Categoria";

interface CardCategoriaProps{
    categoria: Categoria
}

function CardCategoria({ categoria }: CardCategoriaProps) {
  
  return (
    <div className="border-2 rounded-xl overflow-auto">
      <div className="bg-stone-900 text-white text-xl font-bold px-4 py-2">
        Tema
      </div>
      <p className="p-8 text-3xl bg-slate-200 h-full">{categoria.descricao}</p>
      <div className="flex">
        <Link
          to={`/editarcategoria/${categoria.id}`}
          className="flex-1 px-4 py-2 font-bold text-white bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 hover:bg-stone-800 text-center"
        >
          <button>Editar</button>
        </Link>
        <Link
          to={`/deletarcategorias/${categoria.id}`}
          className="flex-1 px-4 py-2 font-bold text-white bg-red-400 hover:bg-red-800 text-center"
        >
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardCategoria;