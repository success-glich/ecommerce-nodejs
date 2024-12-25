import { ICatalogRepository } from "../interface/catalogRepositoryInterface";
import { Product } from "../models/product.model";

export class MockCatalogRepository implements ICatalogRepository {
    create(data: any): Promise<Product> {
        // throw new Error("Method not implemented.");
        const mockProduct = {
            id:123,
           ...data} as Product 
        return Promise.resolve(mockProduct);
    }
    update(id: number, data: any): Promise<Product> {
        // throw new Error("Method not implemented.");

        return Promise.resolve({id,...data} as unknown as Product)
    }
    delete(id: any) {
        return Promise.resolve(id)
    }
    find(id: number): Promise<Product> {
        // throw new Error("Method not implemented.");
        return Promise.resolve({id} as Product)
    }
    findAll(limit:number,offset:number): Promise<Product[]> {
        return Promise.resolve([]);
    }
  

}