export default interface Usuario {
    id: number;
    nome: string;
    eail: string;
  senha?: string;
  foto?: string;
  cargo?: "admin" | "usuario" | "moderador";
}