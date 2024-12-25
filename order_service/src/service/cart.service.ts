import { CartRepositoryType } from "../types/repository.types";
import { GetProductDetail } from "../utils/broker/api";
import { NotFoundError } from "../utils/error";
import { logger } from "../utils/logger";

export const CreateCart = async (input:any,repo:CartRepositoryType) => {

    // * get product details from catalog service
    const product = await GetProductDetail(input.productId)
    logger.info(product)

    if(product.stock <input.quantity){
        throw new NotFoundError("Product out of stock")
    }

    const data = await repo.create(input);

    return data;

}

export const GetCart = async (id:number,repo:CartRepositoryType) => {

    const data = await repo.find(id);

    return data;

}

export const DeleteCart = async (id:number,repo:CartRepositoryType) => {
    const data = await repo.delete(id);

    return data;

}

export const EditCart = async (input:any,repo:CartRepositoryType) => {
    const data = await repo.update(input);

    return data;

}