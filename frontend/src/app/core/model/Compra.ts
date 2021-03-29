import { Produto } from './Produto';

export type Compra = {
  id?: number;
  produto: Produto;
  valor: number;
  data: Date;
  anotacao?: string;
  quantidade: number;
};
