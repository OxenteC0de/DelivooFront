function Home() {
  return (
    <>
    
      <div className="bg-linear-to-r from-[#E12727] to-[#FF9B00] flex justify-center items-center min-h-[90vh] md:min-h-screen text-white">
        <div className="container grid grid-cols-1 md:grid-cols-2 items-center px-4 md:px-16 py-8 md:py-10 gap-10">

      
          <div className="flex flex-col gap-6 items-center md:items-start text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-md">
              Bem-vindo ao <span className="text-[#FFDD00]">Delivoo</span>!
            </h2>

            <p className="text-lg md:text-xl text-white/90">
              Sua plataforma inteligente para <span className="font-semibold">restaurantes e lancherias</span>.  
              Cadastre seus pratos, gerencie categorias e mantenha seu cardápio atualizado com facilidade.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
              <button className="bg-[#FFDD00] text-[#B22222] font-semibold px-6 md:px-8 py-3 rounded-full text-base md:text-lg hover:bg-[#FFD000] transition shadow-md">
                Cadastrar Prato
              </button>
              <button className="border border-white text-white px-6 md:px-8 py-3 rounded-full text-base md:text-lg font-semibold hover:bg-white hover:text-[#E12727] transition">
                Gerenciar Categorias
              </button>
            </div>

            <p className="text-sm text-white/80 mt-2">
              Suporte para empresas:{" "}
              <span className="font-bold text-white">contato@delivoo.com</span>
            </p>
          </div>

          
          <div className="flex justify-center items-center">
            <img
              src="src/assets/hamburguer.png"
              alt="Ilustração de hamburguer"
              className="w-full max-w-[380px] md:max-w-[480px] lg:max-w-[550px] object-contain"
            />
          </div>
        </div>
      </div>

      
      <div className="bg-[#FFF0E0] text-center py-10 px-6">
        <h3 className="text-2xl md:text-3xl font-bold text-[#E12727] mb-4">
          Gerencie seu cardápio de forma simples e rápida!
        </h3>
        <p className="text-[#7A3A00] text-base md:text-lg max-w-2xl mx-auto">
          O <span className="font-semibold text-[#E12727]">Delivoo</span> ajuda seu negócio a manter o cardápio sempre atualizado.  
          Cadastre comidas, organize categorias e destaque seus produtos com praticidade.
        </p>
      </div>
    </>
  );
}

export default Home;
