import type Produto from "../../../models/Produto";
import { Link } from "react-router-dom";
import { Edit, Trash2, CheckCircle, Leaf } from "lucide-react";

interface CardProdutoProps {
  produto: Produto;
  exibirTags?: boolean;
}

function CardProduto({ produto, exibirTags = false }: CardProdutoProps) {
  const preco =
    typeof produto.preco === "string"
      ? parseFloat(produto.preco)
      : produto.preco || 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      {/* Header com gradiente */}
      <div className="bg-gradient-to-r from-[#E12727] to-[#FF9B00] p-6 relative">
        <h3 className="text-white font-bold text-xl truncate">
          {produto.nome || "Sem título"}
        </h3>

        {/* Tags */}
        {exibirTags && (
          <div className="absolute top-3 right-3 flex gap-2">
            {produto.saudavel && (
              <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Leaf className="w-3 h-3" />
                Saudável
              </span>
            )}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-6 space-y-4">
        <p className="text-gray-600 text-sm line-clamp-3 min-h-[60px]">
          {produto.descricao || "Sem descrição disponível"}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#E12727]">
              R$ {preco.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Quantidade: {produto.quantidade}
            </p>
            {produto.usuario && produto.usuario.id && (
              <p className="text-xs text-gray-400 mt-1">
                Usuário ID: {produto.usuario.id}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex border-t border-gray-100">
        <Link
          to={`/editarproduto/${produto.id}`}
          className="flex-1 bg-gradient-to-r bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500  text-white py-3 flex items-center justify-center gap-2 transition-all font-semibold"
        >
          <Edit className="w-4 h-4" />
          Editar
        </Link>

        <Link
          to={`/deletarproduto/${produto.id}`}
          className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 flex items-center justify-center gap-2 transition-all font-semibold"
        >
          <Trash2 className="w-4 h-4" />
          Deletar
        </Link>
      </div>
    </div>
  );
}

export default CardProduto;
