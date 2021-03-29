import { Request, Response } from "express";
import db from "../database/connection";
import { ApiResponse } from "./../entities/ApiResponse";
import { Produto } from "../entities/Produto";
import { Compra } from "../entities/Compra";

export default class ProdutosController {
  async listAll(req: Request, res: Response) {
    const params = req.params;
    const pa = req.query;
    try {
      const produtos = (await db("produtos")) as Produto[];
      return res
        .status(200)
        .json(new ApiResponse<Produto[]>(produtos, 200, ""));
    } catch (err) {
      return res
        .status(400)
        .json(new ApiResponse<any>(null, 400, "Error interno"));
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const produto = (await db("produtos").where("id", id).first()) as Produto;

      if (!produto) {
        return res
          .status(200)
          .json(new ApiResponse<any>(null, 404, "Produto não encontrado"));
      }

      return res.status(200).json(new ApiResponse<Produto>(produto, 200, ""));
    } catch (err) {
      return res
        .status(400)
        .json(new ApiResponse<any>(null, 400, "Error interno"));
    }
  }

  async update(req: Request, res: Response) {
    const { produto, ...compra } = req.body as Compra;
    const produtoId = req.params.id;
    const quantidade = +compra.quantidade;

    try {
      const p = (await db("produtos")
        .where("id", produtoId)
        .first()) as Produto;

      const estoqueMaisQuantidade = +p.estoque + quantidade;

      await db("produtos")
        .where("id", produtoId)
        .update("estoque", estoqueMaisQuantidade);

      await db("compras").insert({ ...compra, produto_id: produtoId });

      return res
        .status(201)
        .json(new ApiResponse<any>(null, 201, "Produto inserido com sucesso"));
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json(new ApiResponse<any>(null, 400, "Error interno"));
    }
  }
}
