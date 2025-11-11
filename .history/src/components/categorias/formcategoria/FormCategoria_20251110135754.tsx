import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type Categoria from "../../../models/Categoria";
//import { AuthContext } from "../../../contexts/AuthContext";
//import { atualizar, buscar, cadastrar } from "../../../services/Service";
//import { ClipLoader } from "react-spinners";

function FormularioCategoria() {

  const navigate = useNavigate()
  
  const [categoria, setCategoria] = useState<Categoria>({} as Categoria)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const {usuario, handleLogout} = useContext(AuthContext)
  const token = usuario.token
  const {id} = useParams<{id: string}>()

  async function buscarPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: {Authorization: token}
      })
    } catch (error: any) {
      if (error.toString().includes('401')) {
        console.log(error);
        alert('Sessão expirada')
        handleLogout()
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      alert('negado, necessario estar logado')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if(id !== undefined) {
      buscarPorId(id)
    }
  }, [id])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value
    })
  }

  function retornar() {
    navigate('/categorias')
  }

  async function gerarNovaCategoria(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    if (id !== undefined) {
      try {
        await atualizar('/categorias', categoria, setCategoria, {
          headers: {Authorization: token}
        })
        alert('Categoria atualizada com sucesso')
      } catch (error: any) {
        if(error.toString().includes('401')) {
          alert('Sessão expirada')
          handleLogout()
        } else {
          alert('Falha ao atualizar a categoria')
        }
      }
    } else {
      try {
        await cadastrar('/categorias', categoria, setCategoria, {
          headers: {Authorization: token}
        })
        alert('Categoria atualizada com sucesso')
      } catch (error: any) {
        if(error.toString().includes('401')) {
          alert('Sessão expirada')
          handleLogout()
        } else {
          alert('Falha ao cadastrar a categoria')
        }
      }
    }

    setIsLoading(false)
    retornar()
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center">
      <h1 className="text-5xl text-center my-8 font-bold font-mono">{id === undefined ? 'Cadastrar' : 'Atualizar'} tema</h1>
      <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaCategoria}>
        <div className="flex flex-col gap-2">
          <label htmlFor="descricao">Descrição da nova categoria</label>
          <input
            type="text"
            placeholder="Digite uma nova categoria aqui..."
            id="descricao"
            name="descricao"
            className="border-2 border-stone-800 rounded p-2"
            value={categoria.descricao}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
          <button
            className="bg-stone-600 py-2 text-lg font-bold text-white w-1/3 mx-auto hover:bg-stone-800 cursor-pointer rounded"
            type="submit"
          >
            {isLoading ? <ClipLoader size={24} color="#fff" /> : <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioCategoria;