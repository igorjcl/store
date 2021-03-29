import { Router } from "express";
import ComprasController from "./controllers/ComprasController";
import VendasController from "./controllers/VendasController";
import ProdutosController from "./controllers/ProdutosController";

const routes = Router();
const comprasController = new ComprasController();
const vendasController = new VendasController();
const produtosController = new ProdutosController();

routes.get("/produtos", produtosController.listAll);
routes.patch("/produtos/:id", produtosController.update);
routes.get("/produtos/:id", produtosController.getById);

routes.post("/compras", comprasController.create);
routes.get("/compras", comprasController.listAll);

routes.post("/vendas", vendasController.create);
routes.get("/vendas", vendasController.listAll);

export default routes;
