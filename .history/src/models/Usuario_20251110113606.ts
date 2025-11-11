export default interface Usuario {
  id: number;
  
  email: string;
  senha?: string;
  foto?: string;
  cargo?: "admin" | "usuario" | "moderador";
}