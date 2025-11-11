import type Produto from "../../../models/Produto";
import { Link } from "react-router-dom";

interface CardProdutoProps {
  produto: Produto;
}

function CardProduto({ produto }: CardProdutoProps) {
  const valor =
    typeof produto.valor === "string"
      ? parseFloat(produto.valor)
      : produto.valor || 0;

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden justify-between shadow-lg border border-gray-200">
      <header className="py-2 px-6 bg-[#fef7e9] text-white font-bold text-2xl">
        {produto.titulo || "Sem título"}
      </header>

      <div className="p-8 bg-white min-h-[120px] flex flex-col gap-2">
        <p className="text-xl text-gray-700">
          {produto.descricao || "Sem descrição"}
        </p>
        <p className="text-lg font-bold text-green-600">
          R$ {valor.toFixed(2)}
        </p>
        {produto.cliente && produto.cliente.id && (
          <p className="text-sm text-gray-500">
            Cliente ID: {produto.cliente.id}
          </p>
        )}
        {produto.status && (
          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded w-fit">
            Ativa
          </span>
        )}
      </div>

      <div className="flex">
        <Link
          to={`/editarproduto/${produto.id}`}
          className="w-full text-slate-100 bg-[#fc9035] hover:bg-[#e1b586]
            flex items-center justify-center py-3 transition-colors"
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletarproduto/${produto.id}`}
          className="text-slate-100 bg-[#fc9035] hover:bg-red-600 w-full
    flex items-center justify-center transition-colors"
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  );
}

export default CardProduto;
