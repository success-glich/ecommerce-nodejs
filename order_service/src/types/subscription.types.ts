export enum OrderEvent{
    CREATE_ORDER='create_order',
    CANCEL_ORDER='cancel_order'
}


export type TopicType ='OrderEvents' |'CatalogEvents'

export interface MessageType {
    headers:Record<string,any>;
    event:OrderEvent;
    payload:Record <string,any>;
}