import { Produto } from "./Produto";

export type Compra = {
  id: number;
  produto: Produto;
  valor: string;
  quantidade: number;
  data: string;
  anotacao?: string;
};
