import { ICatalogRepository } from "../interface/catalogRepositoryInterface";

export  class CatalogService{

    private _repository:ICatalogRepository;
    
    constructor(repository:ICatalogRepository){
        this._repository = repository;
    }


  async createProduct(input:any){

    const data =await this._repository.create(input);
    if(!data.id){
        throw new Error("Unable to create product");
    }
    return data;

    }
    async updateProduct(input:any){

        const data =await this._repository.update(input.id,input);
        // emit event  to update record in Elastic Search

        return data;
        
    }

    // instead of this we will get products from elastic search
    async getProducts(limit:number,offset:number){
        console.log('limit',limit)
        console.log('offset',offset)

        const data = await this._repository.findAll(limit,offset);
        return data;
    }
    async getProduct(id:number){
        console.log('id',id)
        const data = await this._repository.find(id);
        return data;
    }
    async deleteProduct(id:number){
        //* delete product from elastic search
        const data = await this._repository.delete(id);
        return data;
    }
} 