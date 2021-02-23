import { Produto } from "./Produto";

export type Venda = {
  id: number;
  produto: Produto;
  quantidade: number;
  valor: string;
  data: string;
  anotacao?: string;
};
