import { LinkedinLogoIcon, GithubLogoIcon } from "@phosphor-icons/react";

export default function DevsPage() {
  const devs = [
    {
      nome: "David Barbosa",
      cargo: "Frontend Developer",
      bio: "Especialista em documentação e desenvolvimento de interfaces intuitivas.",
      foto: "https://media.licdn.com/dms/image/v2/D4D03AQG9wjkfe91tpQ/profile-displayphoto-scale_200_200/B4DZmoBAKLGQAY-/0/1759460460107?e=1764201600&v=beta&t=jAyjeliYB346Styruhabar0Xp7PimHpj66vsRnlSW4w",
      linkedin: "https://www.linkedin.com/in/dev-davidbarbosa/",
      github: "https://github.com/DavidBaarbosa",
    },
    {
      nome: "Dilvani Estrela",
      cargo: "Frontend Developer",
      bio: "Especialista em identidade visual, construindo pages harmoniosas e responsivas.",
      foto: "https://media.licdn.com/dms/image/v2/C5603AQFtV3U91SUD1g/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1558430134472?e=1764201600&v=beta&t=r5OmHwxR07_RnTQaWEMhl60RBlXB4M-3A8B0AqNeiyM",
      linkedin: "https://www.linkedin.com/in/dilvani-estrela/",
      github: "https://github.com/Dilvaniestrela",
    },
    
     {
      nome: "Janaína Bezerra",
      cargo: "Frontend Developer",
      bio: "Design responsivo, acessibilidade e performance são minhas paixões.",
      foto: "https://avatars.githubusercontent.com/u/218551912?v=4",
      linkedin: "https://www.linkedin.com/in/janainabezerraas/",
      github: "https://github.com/Janainabezerraas",
    },
    {
      nome: "Karine Santos",
      cargo: "Frontend Developer",
      bio: "Apaixonada por design, React e criar interfaces intuitivas.",
      foto: "https://media.licdn.com/dms/image/v2/D4D03AQGggZwsYPiMXA/profile-displayphoto-scale_200_200/B4DZg_AvjIHsAc-/0/1753403816875?e=1764201600&v=beta&t=chbJxO_NM_mGy7L1PlQSzT5Z-tnFmFsg8Qi5fDVJb6M", // Substitua pela foto real
      linkedin: "https://www.linkedin.com/in/karine-cristine-lopes-dos-santos/",
      github: "https://github.com/k4rin",
    },
    {
      nome: "Tauane Soares",
      cargo: "Developer Full Stack",
      bio: "Estruturou a base do projeto, e atuou no desenvolvimento frontend.",
      foto: "https://media.licdn.com/dms/image/v2/D4D03AQGZPzL_SGV5sA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1693271331623?e=1764201600&v=beta&t=_iVe96NiwIc3n3OEihpsNt6Ro-w5wLEDpoQjclAn9v4",
      linkedin: "https://www.linkedin.com/in/tauanews/",
      github: "https://github.com/tauanesoares",
    },
    {
      nome: "Winnie Sant'Ana",
      cargo: "Frontend Developer",
      bio: "Transforma ideias em experiências digitais incríveis.",
      foto: "https://media.licdn.com/dms/image/v2/D4D03AQEu1cR1lv4a4w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1694560536092?e=1764201600&v=beta&t=nXiddyrMsnneaPeoy4ho83LccCd_8CR1uFnMQ4-MOok",
      linkedin: "https://www.linkedin.com/in/winniesantana/",
      github: "https://github.com/wssant",
    },
    {
      nome: "William Alemeida",
      cargo: "Scrum Master",
      bio: "Especialista em APIs, banco de dados e arquitetura Node.js.",
      foto: "https://media.licdn.com/dms/image/v2/D4E03AQElydPuHdDSfg/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1682979178325?e=1764201600&v=beta&t=ec_d3CEzla-WTsC0I4wQh0EqvPAyERPYUNmW75tGJ4A",
      linkedin: "https://www.linkedin.com/in/william-m-almeida/",
      github: "https://github.com/willmartinsss",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF512F] to-[#F09819] flex flex-col items-center justify-center py-16 px-6">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">
        Conheça o Time Delivoo
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
        {devs.map((dev, i) => (
          <div
            key={i}
            className="backdrop-blur-md bg-white/20 rounded-2xl shadow-lg p-6 text-center border border-white/30 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={dev.foto}
              alt={dev.nome}
              className="w-28 h-28 rounded-full mx-auto border-4 border-white/40 mb-4 object-cover"
            />
            <h2 className="text-xl font-semibold text-white">{dev.nome}</h2>
            <p className="text-yellow-200 text-sm mb-3">{dev.cargo}</p>
            <p className="text-white/90 mb-4">{dev.bio}</p>
            <div className="flex justify-center gap-4">
              <a
                href={dev.linkedin}
                target="_blank"
                className="text-white/80 hover:text-white transition"
              >
                <LinkedinLogoIcon size={32} />
              </a>
              <a
                href={dev.github}
                target="_blank"
                className="text-white/80 hover:text-white transition"
              >
                <GithubLogoIcon size={32} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
