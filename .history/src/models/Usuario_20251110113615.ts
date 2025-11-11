export default interface Usuario {
    id: number;
    nome: string;
  email: string;
  senha?: string;
  foto?: string;
  cargo?: "admin" | "usuario" | "moderador";
}