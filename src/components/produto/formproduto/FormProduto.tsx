import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Produto from "../../../models/Produto";
import type Usuario from "../../../models/Usuario";
import { atualizar, buscar, cadastrar } from "../../../services/Services";

function FormProduto() {
  const navigate = useNavigate();

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    nome: "", // ← Mudou de "titulo"
    descricao: "",
    preco: 0, // ← Mudou de "valor"
    quantidade: 0, // ← Novo campo
    saudavel: false,
    usuario: { id: 0 }, // ← Mudou de "cliente"
  });

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    buscarUsuarios();
  }, []);

  async function buscarUsuarios() {
    try {
      await buscar("/usuarios", setUsuarios, {}); // ← Ajuste a rota conforme seu backend
    } catch (error: any) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  async function buscarPorId(id: string) {
    try {
      setIsLoadingData(true);
      await buscar(
        `/produto/${id}`,
        (dados: {
          id: any;
          nome: any;
          descricao: any;
          preco: string;
          quantidade: any;
          saudavel: any;
          usuario: any;
        }) => {
          console.log("Produto encontrado:", dados);
          setProduto({
            id: dados.id,
            nome: dados.nome || "",
            descricao: dados.descricao || "",
            preco:
              typeof dados.preco === "string"
                ? parseFloat(dados.preco)
                : dados.preco || 0,
            quantidade: dados.quantidade || 0,
            saudavel: dados.saudavel || false,
            usuario: dados.usuario || { id: 0 },
          });
        },
        {}
      );
    } catch (error: any) {
      console.error("Erro ao buscar produto:", error);
      alert("Erro ao buscar produto: " + error.message);
    } finally {
      setIsLoadingData(false);
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    } else {
      setIsLoadingData(false);
    }
  }, [id]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    if (name === "usuarioId") {
      setProduto({
        ...produto,
        usuario: { id: parseInt(value) || 0 },
      });
    } else if (name === "preco" || name === "quantidade") {
      setProduto({
        ...produto,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setProduto({
        ...produto,
        [name]: value,
      });
    }
  }

  function atualizarSaudavel(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      saudavel: e.target.checked,
    });
  }

  function retornar() {
    navigate("/produto");
  }

  async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (!produto.usuario?.id) {
      alert("Selecione um usuário!");
      setIsLoading(false);
      return;
    }

    if (produto.preco <= 0) {
      alert("Informe um preço válido!");
      setIsLoading(false);
      return;
    }

    if (produto.quantidade < 0) {
      alert("Informe uma quantidade válida!");
      setIsLoading(false);
      return;
    }

    try {
      if (id !== undefined) {
        // ATUALIZAR
        const dadosAtualizacao: any = {
          nome: produto.nome,
          preco: produto.preco,
          quantidade: produto.quantidade,
          saudavel: produto.saudavel,
        };
        if (produto.descricao) {
          dadosAtualizacao.descricao = produto.descricao;
        }

        console.log("Atualizando:", dadosAtualizacao);
        await atualizar(`/produto/${id}`, dadosAtualizacao, setProduto, {});
        alert("Produto atualizado com sucesso!");
      } else {
        // CRIAR
        const dados = {
          nome: produto.nome,
          descricao: produto.descricao,
          preco: produto.preco,
          quantidade: produto.quantidade,
          saudavel: produto.saudavel,
          usuario: produto.usuario,
        };

        console.log("Criando:", dados);
        await cadastrar(`/produto`, dados, setProduto, {});
        alert("Produto cadastrado com sucesso!");
      }
      retornar();
    } catch (error: any) {
      console.error("Erro:", error);
      alert("Erro: " + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoadingData) {
    return (
      <div className="bg-gradient-to-r from-[#fef7e9] via-[#fc9035] to-[#f9e2bb] flex justify-center w-full min-h-screen items-center">
        <ClipLoader color="white" size={50} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-[#fef7e9] via-[#fc9035] to-[#f9e2bb] flex justify-center w-full min-h-screen items-center p-4">
      <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h1 className="text-4xl text-center my-8 text-gray-800">
          {id === undefined ? "Cadastrar Produto" : "Editar Produto"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={gerarNovoProduto}>
          {/* Usuário - Só em cadastro */}
          {id === undefined && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="usuarioId"
                className="font-semibold text-gray-700"
              >
                Usuário *
              </label>
              <select
                name="usuarioId"
                id="usuarioId"
                className="border-2 border-slate-700 rounded p-2"
                value={produto.usuario?.id || ""}
                onChange={atualizarEstado}
                required
              >
                <option value="">Selecione um usuário</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nome}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Usuário - Leitura em edição */}
          {id !== undefined && (
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">Usuário</label>
              <div className="border-2 border-slate-300 rounded p-2 bg-gray-100 text-gray-700">
                {usuarios.find((u) => u.id === produto.usuario?.id)?.nome ||
                  "Carregando..."}
              </div>
            </div>
          )}

          {/* Nome */}
          <div className="flex flex-col gap-2">
            <label htmlFor="nome" className="font-semibold text-gray-700">
              Nome do Produto *
            </label>
            <input
              type="text"
              placeholder="Ex: Hambúrguer Vegano"
              name="nome"
              id="nome"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.nome || ""}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Descrição */}
          <div className="flex flex-col gap-2">
            <label htmlFor="descricao" className="font-semibold text-gray-700">
              Descrição
            </label>
            <input
              type="text"
              placeholder="Descreva o produto"
              name="descricao"
              id="descricao"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.descricao || ""}
              onChange={atualizarEstado}
            />
          </div>

          {/* Preço */}
          <div className="flex flex-col gap-2">
            <label htmlFor="preco" className="font-semibold text-gray-700">
              Preço (R$) *
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Ex: 25.90"
              name="preco"
              id="preco"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.preco || 0}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Quantidade */}
          <div className="flex flex-col gap-2">
            <label htmlFor="quantidade" className="font-semibold text-gray-700">
              Quantidade *
            </label>
            <input
              type="number"
              placeholder="Ex: 50"
              name="quantidade"
              id="quantidade"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.quantidade || 0}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Saudável */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="saudavel"
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                name="saudavel"
                id="saudavel"
                checked={produto.saudavel || false}
                onChange={atualizarSaudavel}
                className="mr-2 w-4 h-4"
              />
              <span className="font-semibold text-gray-700">
                Produto Saudável
              </span>
            </label>
          </div>

          <button
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white px-8 py-3 
              rounded-lg font-semibold shadow-lg 
              hover:scale-105 hover:shadow-cyan-500/30 transition-transform duration-300"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <ClipLoader color="white" size={24} />
            ) : (
              <span>{id === undefined ? "Cadastrar" : "Atualizar"}</span>
            )}
          </button>

          <button
            type="button"
            onClick={retornar}
            className="bg-gray-500 text-white px-8 py-3 rounded-lg font-semibold 
              hover:bg-gray-600 transition-colors duration-300"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormProduto;
