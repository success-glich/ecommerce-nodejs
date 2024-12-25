import { MessageType, OrderEvent, TopicType } from "../../types/subscription.types";

export interface PublishType{
    headers:Record<string,any>;
    topic:TopicType; 
    event:OrderEvent;
    message:Record<string,any>;
}

export type MessageHandler=(input:MessageType)=>void;
export type MessageBrokerType={
    // * producer
    connectProducer:<T>()=>Promise<T>; 
    disconnectProducer:()=>Promise<void>; 
    publish:(data:PublishType)=>Promise<boolean>; 

    // * consumer
    connectConsumer: <T>()=>Promise<T>;
    disconnectConsumer:<T>()=>Promise<void>;
    subscribe:(messageHandler:MessageHandler,topic:TopicType)=>Promise<void>;
     
}
