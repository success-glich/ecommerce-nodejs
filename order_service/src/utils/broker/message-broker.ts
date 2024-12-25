import { Consumer, Kafka, logLevel, Producer } from "kafkajs";
import { MessageBrokerType, MessageHandler, PublishType } from "./broker.type"; 


// * configuration properties
const CLIENT_ID = process.env.CLIENT_ID  ?? "order-service";
const GROUP_ID = process.env.GROUP_ID  ?? "order-service";
const BROKERS= [process.env.BROKER_1 || 'localhost:9092',process.env.BROKER_2 || 'localhost:9093',process.env.BROKER_3 || 'localhost:9094']

const kafka= new Kafka({
    clientId: CLIENT_ID,
    brokers: BROKERS,
    logLevel:process.env.LOG_LEVEL ? Number(process.env.LOG_LEVEL) : logLevel.INFO
})

let producer:Producer;
let consumer:Consumer;



export const MessageBroker:MessageBrokerType  ={
    connectProducer: function <T>(): Promise<T> {
        throw new Error("Function not implemented.");
    },
    disconnectProducer: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    publish: function (data: PublishType): Promise<boolean> {
        throw new Error("Function not implemented.");
    },
    connectConsumer: function <T>(): Promise<T> {
        throw new Error("Function not implemented.");
    },
    disconnectConsumer: function <T>(): Promise<void> {
        throw new Error("Function not implemented.");
    },
    subscribe: function (messageHandler: MessageHandler, topic: string): Promise<void> {
        throw new Error("Function not implemented.");
    }
}