import { Consumer, Producer } from "kafkajs"
import { MessageBroker } from "../utils/broker/message-broker"
import { MessageType, OrderEvent } from "../types/subscription.types";
import { HandleSubscription } from "./order.service";
// 

export const INitializeBroker = async () => {
    
    // * initialize message broker
    const producer = await MessageBroker.connectProducer<Producer>();
    producer.on('producer.connect',async()=>{
        console.log("Producer connected successfully");
    });

    const consumer = await MessageBroker.connectConsumer<Consumer>();
    consumer.on('consumer.connect',async()=>{
        console.log('Consumer connected successfully.')
    })

    //* keep listening to consumers event
    //* perform the action based on the event
    await MessageBroker.subscribe(HandleSubscription,'OrderEvents')


}


//* publish dedicated events based on usecases
export const SendCreateOrderMessage = async (data: any) => {
  await MessageBroker.publish({
    event: OrderEvent.CREATE_ORDER,
    topic: "CatalogEvents",
    headers: {},
    message: data,
  });
};

export const SendOrderCanceledMessage = async (data: any) => {
  await MessageBroker.publish({
    event: OrderEvent.CANCEL_ORDER,
    topic: "CatalogEvents",
    headers: {},
    message: data,
  });
};


