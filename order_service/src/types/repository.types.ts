import { CartLineItem } from "../db/schema"
import { CartWithLineItems } from "../dto/cartRequest.dto"

type Create = (input: any) => Promise<any>
type Find = (input: any) => Promise<any>
type Update = (id:number,qty:number) => Promise<any>
type Delete = (input: any) => Promise<any>


export type CartRepositoryType = {
    create: Create,
    findCart: (id:number)=>Promise<CartWithLineItems>,
    update: Update,
    delete: Delete,
    findCartByProductId: (customerId: number, productId: number) => Promise<CartLineItem>,
    clearCartData: (cartId: number) => Promise<boolean>
}