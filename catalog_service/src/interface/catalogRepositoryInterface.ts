import { Product } from "../models/product.model";

export interface ICatalogRepository {
    create(data:any):Promise< Product>,
    update(id:number,data:any):Promise<{}>,
    delete(id:number):Promise<{}>,
    findAll(limit:number,offset:number):Promise<Product[]>,
    find(id:number):Promise<Product>
}