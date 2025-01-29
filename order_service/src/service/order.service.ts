import { MessageType } from "../types";
import { CartRepositoryType } from "../types/repository.types";
import { logger } from "../utils";

export const CreateOrder = async (userId:number,repo:any,CartRepo:CartRepositoryType,) => {

    // const  cart = await CartRepo.findCart(userId)

    // const cart = await CartRepo.findCartByProductId

}


export const HandleSubscription = async (message: MessageType) => {
    console.log("Message received by order Kafka consumer", message);
  
    // if (message.event === OrderEvent.ORDER_UPDATED) {
    // call create order
  };
  