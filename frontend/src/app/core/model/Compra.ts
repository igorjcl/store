import { Produto } from './Produto';

export type Compra = {
  id?: number;
  produto: Produto;
  valor: string;
  data: Date;
  anotacao?: string;
  quantidade: number;
};
