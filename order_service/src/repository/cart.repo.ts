import DB from "../config/dbConnection";
import { carts } from "../db/schema";
import { CartRepositoryType } from "../types/repository.types";

 const createCart =async (input:any):Promise<any> => {
    // * connect to db and perform db operations
    const result = await DB.insert(carts).values({
        userId:input.user_id,
    }).returning({
        id: carts.id
    });

    // return Promise.resolve({ message:'Fake response from test repo',data:result})
    return result

}

const findCart =async (input:any):Promise<any> => {

    return Promise.resolve({})

}
const updateCart =async (input:any):Promise<any> => {

    return Promise.resolve({})

}
const deleteCart =async (input:any):Promise<any> => {

    return Promise.resolve({})

}

export const CartRepository:CartRepositoryType = {
    create: createCart,
    find: findCart,
    update: updateCart,
    delete: deleteCart,
}