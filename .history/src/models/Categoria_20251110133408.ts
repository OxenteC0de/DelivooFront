//descomentar depois do model Produto.ts pronto
// import type  Produto from "./Produto";

export default interface Tema {
    id: number;
    descricao: string;
    produto?: Produto[] | null;
}