// src/models/Produto.ts
export default interface Produto {
  id: number;
  nome: string;
  descricao: string;
  quantidade: number;
  preco: number | string; // Backend pode retornar como string
  saudavel: boolean;
  categoria: {
    id: number;
    descricao?: string; // Útil para exibir nome da categoria
  };
  usuario?: {
    id: number;
    nome?: string; // Útil para exibir nome do usuário
  };
}
// src/models/Produto.ts
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
