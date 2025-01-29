
import { Consumer, Kafka, logLevel, Partitioners, Producer } from "kafkajs";
import { CatalogEvent, MessageBrokerType, MessageHandler, MessageType, PublishType, TOPIC_TYPE } from "./broker.types";

const ClientId = process.env.KAFKA_CLIENT_ID || 'catalog_service';
const GROUP_ID = process.env.KAFKA_GROUP_ID || 'catalog_group';
const BROKERS = [process.env.KAFKA_BROKER_URL || 'localhost:9092'];

const kafka = new Kafka({
    clientId:ClientId,
    brokers:BROKERS,
    logLevel:logLevel.INFO
});

let producer:Producer;
let consumer:Consumer;


 const createTopic = async(topic:string[])=>{
    const topics = topic.map((t)=>({
        topic:t,
        numPartitions:2,
        replicationFactor:1
    }))
    const admin = kafka.admin();
    await admin.connect();

    const topicExists = await admin.listTopics();
    console.log('topic exists',topicExists)

    for(const t of topics){
        if(!topicExists.includes(t.topic)){
            await admin.createTopics({
                topics:[t],
            })
        }
    }
    await admin.disconnect();
}

 const connectProducer = async <T>():Promise<T>=>{

    await createTopic(['CatalogEvent']);

    if(producer){
        console.log('producer already connected with existing connection')
        return producer as unknown as T
    }

    producer = kafka.producer({
        createPartitioner: Partitioners.DefaultPartitioner
    })
    
    await producer.connect();
    console.log('producer connected with a new connection');

    return producer as unknown as T
}

 const disconnectProducer = async ()=>{
    if(producer){
        await producer.disconnect();
    }
}

 const publish = async(data:PublishType)=>{

    const producer = await connectProducer<Producer>();
    const result = await producer.send({
        topic:data.topic,
        messages:[{
            headers:data.headers,
            key:data.event,
            value:JSON.stringify(data.message)
        }]
    });
    console.log('publishing the result',result)
    return result.length>0;
  
}

//* consumer workflow
 const connectConsumer = async <T>():Promise<T>=>{
    if(consumer){
        console.log('consumer already connected with existing connection')
        return consumer as unknown as T
    }
    consumer = kafka.consumer({
        groupId:GROUP_ID
    })
    await consumer.connect();

    return consumer as unknown as T;
}

const disconnectConsumer = async()=>{
    if(consumer){
        await consumer.disconnect();
    }
}

const subscribe = async(messageHandler:MessageHandler,topic:TOPIC_TYPE)=>{

    const consumer = await connectConsumer<Consumer>();
    await consumer.subscribe({topic:topic,fromBeginning:true});

    await consumer.run({
        eachMessage: async({topic,partition,message})=>{
            if(topic!=="CatalogEvent"){
                return;
            }
            if(message.key && message.value){
                const inputMessage:MessageType = {
                    headers:message.headers!,
                    event:message.key.toString() as CatalogEvent,
                    data:JSON.parse(message.value.toString())
                }
               await messageHandler(inputMessage);

               await consumer.commitOffsets([
                {topic,partition,offset:(Number(message.offset)+1).toString()}
            ])
            }
        }
    })

}


export  const MessageBroker:MessageBrokerType ={
    connectConsumer,
    disconnectConsumer,
    subscribe,
    connectProducer,
    disconnectProducer,
    publish,
}