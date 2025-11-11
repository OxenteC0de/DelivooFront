import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type Usuario from '../../models/Usuario';
import { cadastrarUsuario } from '../../services/Service';
import { CircleLoader } from 'react-spinners';

function Cadastro() {
  
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [confirmarSenha, setConfirmarSenha] = useState<string>('');

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: '',
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      retornar();
    }
  }, [usuario]);

  function retornar() {
    navigate('/login');
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({     
      ...usuario,      
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }


  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);

      try {
        await cadastrarUsuario('/usuarios/cadastrar', usuario, setUsuario);
        alert('Usuário cadastrado, bem-vindo!');
      } catch (error) {
        alert('Erro ao cadastar o usuário, tente novamente!');
        console.log(error);
      }
    } else {
      alert('Senha incorreta!');
      setUsuario({ ...usuario, senha: '' });
      setConfirmarSenha('');
    }

    setIsLoading(false);
  }

  return (
    <>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 font-sans">
         <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#E12727] to-[#FF9B00] text-white relative overflow-hidden"></div>
        <div className="hidden lg:flex flex-col justify-center items-center bg-gradient-to-br from-[#E12727] to-[#FF9B00] text-white relative overflow-hidden p-10">
          <h1 className="text-5xl font-bold mb-4">Bem-vindo ao <span className="text-[#FFDD00]">Delivoo!</span>
          </h1>
          <p className="text-lg max-w-md text-center leading-relaxed">
            <br/>
            Cadastre seus pratos e mantenha seu cardápio atualizado com facilidade.
        </p>
        <form
          className="flex justify-center items-center flex-col w-5/6 lg:w-2/3 gap-4 mx-auto bg-white shadow-xl rounded-2xl p-8 my-8"
          onSubmit={cadastrarNovoUsuario}
        >
            <h2 className="text-4xl font-extrabold text-[#B22222] mb-4">Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="Nome completo"
              className="font-medium text-[#B22222] mb-1"
              value={usuario.nome}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              name="usuario"
              id="usuario"
              placeholder="Seu e-mail"
               className="border-2 border-[#FF9B00] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#E12727] transition-all"
              value={usuario.usuario}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              name="foto"
              id="foto"
              placeholder="URL da foto"
             className="border-2 border-[#FF9B00] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#E12727] transition-all"
              value={usuario.foto}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              name="senha"
              id="senha"
              placeholder="Senha (minimo 8 caracteres)"
              className="border-2 border-[#FF9B00] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#E12727] transition-all"
              value={usuario.senha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                atualizarEstado(e)
              }
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              name="confirmarSenha"
              id="confirmarSenha"
              placeholder="Confirme sua senha"
              className="border-2 border-[#FF9B00] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#E12727] transition-all"
              value={confirmarSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleConfirmarSenha(e)
              }
            />
          </div>
          <div className="flex justify-around w-full gap-8 mt-4">
            <button
              type="reset"
              className="rounded-lg text-white bg-[#B22222] hover:bg-[#8B1A1A] w-1/2 py-2 font-semibold shadow-md transition-all"
              onClick={retornar}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg text-[#B22222] bg-[#FFDD00] hover:bg-[#FFCC00] w-1/2 py-2 font-semibold shadow-md transition-all flex justify-center items-center">
              {isLoading ? (
                <CircleLoader
                  color='#B22222'
                  size={24}

                />
              ) : (
                <span>Cadastrar</span>
              )}
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
}

export default Cadastro;