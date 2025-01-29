export enum CatalogEvent {
    CREATE_ORDER="create_order",
    CANCEL_ORDER="cancel_order",
}

export type TOPIC_TYPE ="OrderEvents" | "CatalogEvents";

export interface MessageType{
    headers?:Record<string,any>,
    event:CatalogEvent,
    data:Record<string,any>
}

export type MessageHandler=(input:MessageType)=>void;

export interface PublishType{
    headers?:Record<string,any>,
    topic:TOPIC_TYPE,
    event:CatalogEvent,
    message:Record<string,any>
}

export interface MessageBrokerType{
    connectProducer:<T>()=>Promise<T>; 
    disconnectProducer:()=>Promise<void>; 
    publish:(data:PublishType)=>Promise<boolean>; 

    connectConsumer: <T>()=>Promise<T>;
    disconnectConsumer:<T>()=>Promise<void>;
    subscribe:(messageHandler:MessageHandler,topic:TOPIC_TYPE)=>Promise<void>;
}