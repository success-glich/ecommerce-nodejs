import { PrismaClient } from "@prisma/client";
import { ICatalogRepository } from "../interface/catalogRepositoryInterface";
import { Product } from "../models/product.model";

export class CatalogRepository implements ICatalogRepository {

    _prisma: PrismaClient

    constructor(){
        this._prisma = new PrismaClient()
    }
    create(data: any): Promise<Product> {
        // throw new Error("Method not implemented.");
        // const mockProduct = {
        //     id:123,
        //    ...data} as Product 
        // return Promise.resolve(mockProduct);

        return this._prisma.product.create({
            data
        })

    }
    update(id: number, data: any): Promise<Product> {
        // throw new Error("Method not implemented.");
        return this._prisma.product.update({
            where:{
                id
            },
            data
        })
    }
    delete(id: number): Promise<{}> {
        // throw new Error("Method not implemented.");

        // return Promise.resolve(id);
        return this._prisma.product.delete({
            where:{
                id
            }
        })
    }
    find(id: number): Promise<Product> {
        // throw new Error("Method not implemented.");
        // return Promise.resolve({id}as Product);

        return this._prisma.product.findUnique({
            where:{
                id
            }
        })
    }
    findAll(limit:number,offset:number): Promise<Product[]> {
        // throw new Error("Method not implemented.");
        // return Promise.resolve([])
        return this._prisma.product.findMany({
            take:limit,
            skip:offset
        })
    }
  

}