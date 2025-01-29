import { catalogService } from './../api/catalog.routes';
import { Consumer, Producer } from "kafkajs";
import { CatalogService } from "./catalog.service";
import {MessageBroker} from '../utils/broker/message-broker';


 class BrokerService {
    private consumer: Consumer | null = null;
    private producer: Producer | null = null;
    private catalogService: CatalogService;

    constructor(catalogService: CatalogService) {
        this.catalogService = catalogService;
    }

    public async initializeBroker() {
        this.producer = await MessageBroker.connectProducer<Producer>();
        this.producer.on("producer.connect", async () => {
            console.log('Catalog Service Producer connected successfully.')
        });

        this.consumer = await MessageBroker.connectConsumer<Consumer>();
        this.consumer.on("consumer.connect", async () => {
            console.log('Catalog Consumer connected successfully.')
        });

        //* Keep listening to consumer events
        //* perform the action on the event
        await MessageBroker.subscribe(this.catalogService.handleBrokerMessage, "CatalogEvents");
    }

    //* publish discontinue product event.
    public async sendDeleteProductMessage(data: any) {

    }

}
export default BrokerService