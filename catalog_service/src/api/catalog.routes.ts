import { error } from 'console';
import { NextFunction, Request, Response } from 'express';
import * as express from 'express';
import { CatalogService } from '../services/catalog.service';
import { CatalogRepository } from '../repository/catalog.repository';
import { RequestValidator } from '../utils/requestValidator';
import { CreateProductRequest } from '../dto/product.dto';

const router = express.Router();

export const catalogService = new CatalogService(new CatalogRepository());

router.post('/products', async (req:Request, res:Response) => {
try {
    const {error,input} = await RequestValidator(CreateProductRequest,req.body);
    console.log('error',error)
    if(error){
        res.status(400).json(error)
        return
    }
    const data = await catalogService.createProduct(input);
    res.status(201).json(data);
} catch (error) {
  const err = error as Error;
   res.status(500).json(err.message)
   return
}
})

router.put("/products/:id", async (req:Request, res:Response) => {
    const id = Number(req.params["id"]);
    // const input = req.body;
    const {error,input} = await RequestValidator(CreateProductRequest,req.body);
    console.log('error',error)
    if(error){
        res.status(400).json(error)
        return
    }

    try {
        const data = await catalogService.updateProduct({id,...input});
        res.status(200).json(data);
        return
      } catch (error) {
        const err = error as Error;
        res.status(500).json(err.message);
        return
      }
})

router.get("/products", async (req:Request, res:Response) => {
    const limit = Number(req.query["limit"]) || 10;
    const offset = Number(req.query["offset"]) || 0;
    try {
        const data = await catalogService.getProducts(limit, offset);
        res.status(200).json(data);
        return
      } catch (error) {
        const err = error as Error;
        console.log('err',err);
        res.status(500).json({error: err.message});
        return
      }
})

router.get("/products/:id", async (req:Request, res:Response) => {
    const id = Number(req.params["id"]);
    try {
        const data = await catalogService.getProduct(id);
        res.status(200).json(data);
        return
      } catch (error) {
        const err = error as Error;
        res.status(500).json(err.message);
        return
      }
})

router.delete("/products/:id", async (req:Request, res:Response) => {
    const id = Number(req.params["id"]);
    try {
        const data = await catalogService.deleteProduct(id);
        res.status(200).json(data);
        return
      } catch (error) {
        const err = error as Error;
        res.status(500).json(err.message);
        return
      }
})
export default router;