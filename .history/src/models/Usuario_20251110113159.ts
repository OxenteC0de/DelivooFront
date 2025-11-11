export default interface Usuario {
  id: number;
  email: string;
  nome: string;
  senha?: string;
  foto?: string;
  cargo?: "admin" | "usuario" | "moderador";
}