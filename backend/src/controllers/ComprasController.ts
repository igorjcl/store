import { ApiResponse } from "./../entities/ApiResponse";
import { Request, Response } from "express";

import db from "../database/connection";
import { Produto } from "../entities/Produto";
import { Compra } from "../entities/Compra";

export default class ComprasController {
  async create(req: Request, res: Response) {
    const { produto, ...compra } = req.body as Compra;

    try {
      const produtoId = await db("produtos").insert(produto);

      await db("compras").insert({ ...compra, produto_id: produtoId });

      return res
        .status(201)
        .json(new ApiResponse<any>(null, 201, "Compra realizada com sucesso"));
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json(new ApiResponse<any>(null, 400, "Error interno"));
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      const compras: any = await db("compras").leftJoin(
        "produtos",
        "produtos.id",
        "compras.produto_id"
      );

      const c = compras.map((compra: any) => {
        return {
          produto: {
            id: compra.produto_id,
            nome: compra.nome,
            descricao: compra.descricao,
            estoque: compra.estoque,
            preco: compra.preco,
          },
          id: compra.id,
          valor: compra.valor,
          quantidade: compra.quantidade,
          data: compra.data,
          anotacao: compra.anotacao,
        };
      });

      return res.status(200).json(new ApiResponse<Compra[]>(c, 200, ""));
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json(new ApiResponse<any>(null, 400, "Error interno"));
    }
  }
}
