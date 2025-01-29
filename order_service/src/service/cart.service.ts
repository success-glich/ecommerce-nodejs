import { CartLineItem } from "../db/schema";
import { CartRequestInput } from "../dto/cartRequest.dto";
import { CartRepositoryType } from "../repository/cart.repo";
import { GetProductDetail, GetStockDetails } from "../utils/broker/api";
import { NotFoundError } from "../utils/error";
import { logger } from "../utils/logger";
import { SendCreateOrderMessage } from "./broker.service";

export const CreateCart = async (input: CartRequestInput & { userId: number }, repo: CartRepositoryType) => {

    // * get product details from catalog service
    const product = await GetProductDetail(input.productId)
    logger.info(product)
    console.log('product',product);
    if (product.stock < input.qty) {
        throw new NotFoundError("Product out of stock")
    }


    //* find if the product is already in cart
    const lineItem = await repo.findCartByProductId(input.userId, input.productId);

    console.log('lineItem',lineItem);
    if (lineItem) {
        return repo.updateCart(lineItem.id, lineItem.qty +input.qty);
    }

    console.log('lineItem',lineItem); // return


    return await repo.createCart(input.userId, {
        productId: product.id,
        price: product.price.toString(),
        qty: input.qty,
        itemName: product.name,
      } as CartLineItem);


}

export const GetCart = async (id: number, repo: CartRepositoryType) => {

    const cart = await repo.findCart(id);
    if (!cart) {
        throw new NotFoundError("cart does not exist");
      }

  const lineItems = cart.lineItems;

  if (!lineItems.length) {
    throw new NotFoundError("cart items not found");
  }

  // verify with inventory service if the product is still available
  const stockDetails = await GetStockDetails(
    lineItems.map((item) => item.productId)
  );

  if (Array.isArray(stockDetails)) {
    // update stock availability in cart line items
    lineItems.forEach((lineItem) => {
      const stockItem = stockDetails.find(
        (stock) => stock.id === lineItem.productId
      );
      if (stockItem) {
        lineItem.availability = stockItem.stock;
      }
    });

    // update cart line items
    cart.lineItems = lineItems;
  }

  SendCreateOrderMessage("hello from order service")
  return cart;

}

export const DeleteCart = async (id: number, repo: CartRepositoryType) => {
    const data = await repo.deleteCart(id);

    return data;

}

export const EditCart = async (input: any, repo: CartRepositoryType) => {
    const data = await repo.updateCart(input.id, input.qty);

    return data;

}
