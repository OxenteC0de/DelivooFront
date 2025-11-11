import { Link } from "react-router-dom";
import type Tema from "../../../models/Tema";

interface CardTemaProps{
    tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
  
  return (
    <div className="border-2 rounded-xl overflow-auto">
      <div className="bg-stone-900 text-white text-xl font-bold px-4 py-2">
        Tema
      </div>
      <p className='p-8 text-3xl bg-slate-200 h-full'>{tema.descricao}</p>
      <div className="flex">
        <Link to={`/editartema/${tema.id}`} className="flex-1 px-4 py-2 font-bold text-white bg-indigo-400 hover:bg-stone-800 text-center">
          <button>Editar</button> 
        </Link>
        <Link to='' className="flex-1 px-4 py-2 font-bold text-white bg-red-400 hover:bg-red-800 text-center">
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardTema;