export default interface Produto {
  id: number;
  nome: string;
  descricao: string;
  quantidade: number;
  preco: number; 
  saudavel: boolean; 
  usuario?: {
    id: number;
    nome?: string;
  };
}
