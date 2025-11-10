import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { AuthContext } from "../../contexts/AuthContext";
import type UsuarioLogin from "../../models/UsuarioLogin";


function Login() {

  const navigate = useNavigate();

  const {usuario, handleLogin, isLoading} = useContext(AuthContext)

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin)

  useEffect(() => {
    if (usuario.token !== "") {
      navigate('/home')
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
    })
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleLogin(usuarioLogin)
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-semibold bg-gradient-to-r from-orange-600 to-yellow-400 text-slate-900">
         <form className="flex justify-center items-center flex-col w-3/4 max-w-md bg-white/90 rounded-2xl shadow-xl p-10 gap-6" onSubmit={login}>
            <h2 className="text-4xl text-orange-700 font-extrabold">Entrar!</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario" className="mb-1 text-sm text-slate-700">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuário"
              className="border border-slate-300 rounded-xl p-3 focus:outline-orange-600"
              value={usuarioLogin.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario" className="mb-1 text-sm text-slate-700">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border border-slate-300 rounded-xl p-3 focus:outline-orange-600"
              value={usuarioLogin.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-yellow-500 hover:bg-orange-600 transition-all flex justify-center text-white w-full py-3 mt-2"
          >
            {isLoading ? 
                <ClipLoader 
                    color="#fff" 
                    size={24} 
                    /> : 
                    <span>Entrar</span>
                }
          </button>
          <hr className="border-slate-300 w-full" />

        <p className="text-sm text-slate-700">
          Ainda não tem uma conta? 
          <Link to='/cadastro' className="text-orange-700 font-bold hover:underline ml-1">Cadastre-se</Link>
        </p>
        </form>

        <div className="hidden lg:block w-full h-full bg-cover bg-center bg-[url('https://ik.imagekit.io/rdhursqzd/padrao-de-boas-vindas-em-diferentes-idiomas_23-2147869891.jpg?updatedAt=1761694330242')] 
        opacity-90 mix-blend-multiply"></div>
      </div>
    </>
  );
}

export default Login;