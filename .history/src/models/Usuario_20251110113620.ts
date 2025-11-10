export default interface Usuario {
    id: number;
    nome: string;
    ail: string;
  senha?: string;
  foto?: string;
  cargo?: "admin" | "usuario" | "moderador";
}