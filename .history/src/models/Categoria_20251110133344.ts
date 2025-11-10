//descomentar depois de produto pronto
// import type  Produto from "./Produto";

export default interface Tema {
    id: number;
    descricao: string;
    postagem?: Postagem[] | null;
}