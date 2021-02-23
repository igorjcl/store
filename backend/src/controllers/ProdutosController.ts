import { Request, Response } from "express";
import db from "../database/connection";
import { ApiResponse } from "./../entities/ApiResponse";
import { Produto } from "../entities/Produto";
import { Compra } from "../entities/Compra";

export default class ProdutosController {
  async listAll(req: Request, res: Response) {
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

  async update(req: Request, res: Response) {
    const {
      produto: { id },
    } = req.body as Compra;

    try {
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
