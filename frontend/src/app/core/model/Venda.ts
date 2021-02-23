import { Produto } from './Produto';

export type Venda = {
  id?: number;
  produto: Produto;
  quantidade: number;
  precoVenda: string;
  data: Date;
  anotacao?: string;
};
