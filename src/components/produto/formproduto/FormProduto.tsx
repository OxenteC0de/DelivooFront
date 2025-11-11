import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import type Produto from "../../../models/Produto";
import type Clientes from "../../../models/Clientes";
import { atualizar, buscar, cadastrar } from "../../../services/service";

function FormProduto() {
  const navigate = useNavigate();

  const [produto, setProduto] = useState<Produto>({
    id: 0,
    titulo: "",
    descricao: "",
    valor: 0,
    status: false,
    cliente: { id: 0 },
  });

  const [clientes, setClientes] = useState<Clientes[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    buscarClientes();
  }, []);

  async function buscarClientes() {
    try {
      await buscar("/clientes", setClientes, {});
    } catch (error: any) {
      console.error("Erro ao buscar clientes:", error);
    }
  }

  async function buscarPorId(id: string) {
    try {
      setIsLoadingData(true);
      await buscar(
        `/produto/${id}`,
        (dados) => {
          console.log("Dados buscados:", dados);
          setProduto({
            id: dados.id,
            titulo: dados.titulo || "",
            descricao: dados.descricao || "",
            valor:
              typeof dados.valor === "string"
                ? parseFloat(dados.valor)
                : dados.valor || 0,
            status: dados.status || false,
            cliente: dados.cliente || { id: 0 },
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

    if (name === "clienteId") {
      setProduto({
        ...produto,
        cliente: { id: parseInt(value) || 0 },
      });
    } else if (name === "valor") {
      setProduto({
        ...produto,
        valor: parseFloat(value) || 0,
      });
    } else {
      setProduto({
        ...produto,
        [name]: value,
      });
    }
  }

  function atualizarStatus(e: ChangeEvent<HTMLInputElement>) {
    setProduto({
      ...produto,
      status: e.target.checked,
    });
  }

  function retornar() {
    navigate("/produto");
  }

  async function gerarNovoProduto(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (!produto.cliente?.id) {
      alert("Selecione um cliente!");
      setIsLoading(false);
      return;
    }

    if (produto.valor <= 0) {
      alert("Informe um valor válido!");
      setIsLoading(false);
      return;
    }

    try {
      if (id !== undefined) {
        // ATUALIZAR
        const dadosAtualizacao: any = {
          titulo: produto.titulo,
          valor: produto.valor,
          status: produto.status,
        };
        if (produto.descricao) {
          dadosAtualizacao.descricao = produto.descricao;
        }

        console.log("Atualizando:", dadosAtualizacao);
        await atualizar(
          `/produto/${id}`,
          dadosAtualizacao,
          setProduto,
          {}
        );
        alert("Produto atualizado com sucesso!");
      } else {
        // CRIAR
        const dados = {
          titulo: produto.titulo,
          descricao: produto.descricao,
          valor: produto.valor,
          status: produto.status,
          cliente: produto.cliente,
        };

        console.log("Criando:", dados);
        await cadastrar(`/produto`, dados, setProduto);
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
    <div className="bg-gradient-to-r from-from-[#fef7e9] via-[#fc9035] to-[#f9e2bb] flex justify-center w-full min-h-screen items-center p-4">
      <div className="backdrop-blur-sm bg-white/90 rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h1 className="text-4xl text-center my-8 text-gray-800">
          {id === undefined ? "Cadastrar Produto" : "Editar Produto"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={gerarNovoProduto}>
          {/* Cliente - Só em cadastro */}
          {id === undefined && (
            <div className="flex flex-col gap-2">
              <label
                htmlFor="clienteId"
                className="font-semibold text-gray-700"
              >
                Cliente *
              </label>
              <select
                name="clienteId"
                id="clienteId"
                className="border-2 border-slate-700 rounded p-2"
                value={produto.cliente?.id || ""}
                onChange={atualizarEstado}
                required
              >
                <option value="">Selecione um cliente</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Cliente - Leitura em edição */}
          {id !== undefined && (
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-700">Cliente</label>
              <div className="border-2 border-slate-300 rounded p-2 bg-gray-100 text-gray-700">
                {clientes.find((c) => c.id === produto.cliente?.id)?.nome ||
                  "Carregando..."}
              </div>
            </div>
          )}

          {/* Título */}
          <div className="flex flex-col gap-2">
            <label htmlFor="titulo" className="font-semibold text-gray-700">
              Título do Produto *
            </label>
            <input
              type="text"
              placeholder="Ex: Website Corporativo"
              name="titulo"
              id="titulo"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.titulo || ""}
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
              placeholder="Descreva o Produto"
              name="descricao"
              id="descricao"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.descricao || ""}
              onChange={atualizarEstado}
            />
          </div>

          {/* Valor */}
          <div className="flex flex-col gap-2">
            <label htmlFor="valor" className="font-semibold text-gray-700">
              Valor (R$) *
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="Ex: 8000.00"
              name="valor"
              id="valor"
              className="border-2 border-slate-700 rounded p-2"
              value={produto.valor || 0}
              onChange={atualizarEstado}
              required
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="status"
              className="flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                name="status"
                id="status"
                checked={produto.status || false}
                onChange={atualizarStatus}
                className="mr-2 w-4 h-4"
              />
              <span className="font-semibold text-gray-700">
                Produto
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