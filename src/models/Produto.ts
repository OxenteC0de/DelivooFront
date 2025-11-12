export default interface Produto {
  id: number;
  nome: string;
  descricao: string;
  quantidade: number;
  preco: number | string;
  saudavel: boolean;
  foto?: string;
  categoria: {
    id: number;
    descricao?: string;
  };
  usuario?: {
    id: number;
    nome?: string;
  };
}
