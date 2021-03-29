import { ApiResponse } from "./../entities/ApiResponse";
import { Request, Response } from "express";
import db from "../database/connection";
import { Produto } from "../entities/Produto";
import { Venda } from "../entities/Venda";

export default class VendasController {
  async create(req: Request, res: Response) {
    const tr = await db.transaction();
    const { data, valor, produto, anotacao, quantidade } = req.body as Venda;

    try {
      const p = (await tr("produtos")
        .where("id", produto.id)
        .first()) as Produto;

      const quantidadeVendida = p.estoque - quantidade;

      if (quantidadeVendida < 0) {
        tr.commit();
        return res
          .status(400)
          .json(
            new ApiResponse<any>(
              null,
              400,
              "Erro: Quantidade vendida deve ser menor que a do estoque"
            )
          );
      }

      await tr("produtos").update("estoque", quantidadeVendida);

      await tr("vendas").insert({
        data,
        valor,
        quantidade,
        anotacao,
        produto_id: produto.id,
      });

      tr.commit();

      return res
        .status(201)
        .json(new ApiResponse<any>(null, 201, "Venda efetuada com sucesso"));
    } catch (err) {
      console.log(err);

      tr.commit();
      return res
        .status(400)
        .json(new ApiResponse<any>(null, 400, "Erro Interno"));
    }
  }

  async listAll(req: Request, res: Response) {
    let nome = req.query.nome ? req.query.nome : "";
    let data = req.query.data ? req.query.data : "";

    try {
      const vendas: any = await db("vendas")
        .leftJoin("produtos", "produtos.id", "vendas.produto_id")
        .where("nome", "like", `%${nome}%`)
        .where("data", "like", `%${data}%`);

      const v = vendas.map((venda: any) => ({
        produto: {
          id: venda.produto_id,
          nome: venda.nome,
          descricao: venda.descricao,
          estoque: venda.estoque,
          preco: venda.preco,
        },
        id: venda.id,
        valor: venda.valor,
        quantidade: venda.quantidade,
        data: venda.data,
        anotacao: venda.anotacao,
      }));

      return res.status(200).json(new ApiResponse<Venda[]>(v, 200, ""));
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json(new ApiResponse<any>(null, 400, "Erro Interno"));
    }
  }

  async edite(req: Request, res: Response) {
    try {
      const vendas: Venda[] = await db("produtos as p").innerJoin(
        "vendas as v",
        "p.id",
        "v.produto_id"
      );

      return res.status(200).json(new ApiResponse<Venda[]>(vendas, 200, ""));
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json(new ApiResponse<any>(null, 400, "Erro Interno"));
    }
  }
}
