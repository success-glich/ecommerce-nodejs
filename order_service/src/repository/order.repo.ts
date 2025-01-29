import { orders } from './../db/schema';
import DB from "../config/dbConnection";
import { orderLineItems,  } from "../db/schema/order";
import { OrderLineItemType, OrderWithLineItems } from "../dto/OrderWithLineItems"
import { eq } from 'drizzle-orm';




export type OrderRepositoryType ={
    createOrder:(lineItem: OrderWithLineItems)=> Promise<number>;
    findOrder:(id:number)=>Promise<OrderWithLineItems | null>;
    updateOrder:(id:number,status:string)=>Promise<OrderWithLineItems>;
    deleteOrder:(id:number)=>Promise<boolean>;
    findOrdersByCustomerId:(customerId:number)=>Promise<OrderWithLineItems[]>;
}

const createOrder = async (lineItem: OrderWithLineItems): Promise<number> => {

    const result= await DB.insert(orders).values({
        customerId:lineItem.customerId,
        orderNumber:lineItem.orderNumber,
        amount:lineItem.amount,
        status:lineItem.status,
        txnId:lineItem.txnId
    })
    .returning();

    const [{id}]=result;

    if(id>0){
        for(const item of lineItem.orderItems){
            await DB.insert(orderLineItems).values({
                orderId:id,
                itemName:item.itemName,
                qty:item.qty,
                price:String(item.price),
            }).execute();
        }
    }
    return id;
}

//*   findOrder:(id:number)=>Promise<OrderWithLineItems | null>;

const findOrder = async(id:number):Promise<OrderWithLineItems | null>=>{    
    const orders =await DB.query.orders.findFirst({
        where:(orders,{eq})=>eq(orders.id,id),
        with:{
            lineItems:true
        }
    });
    if(!orders){
        throw new Error("Order not found")
    }

    return orders as unknown as OrderWithLineItems;
}


const updateOrder = async (
    id: number,
    status: string
  ): Promise<OrderWithLineItems> => {
    await DB.update(orders)
      .set({
        status: status,
      })
      .where(eq(orders.id, id))
      .execute();
  
    const order = await findOrder(id);
    if (!order) {
      throw new Error("Order not found");
    }
    return order;
  };
  
  const deleteOrder = async (id: number): Promise<boolean> => {
    await DB.delete(orders).where(eq(orders.id, id)).execute();
    return true;
  };
  
  const findOrdersByCustomerId = async (
    customerId: number
  ): Promise<OrderWithLineItems[]> => {
    const orders = await DB.query.orders.findMany({
      where: (orders, { eq }) => eq(orders.customerId, customerId),
      with: {
        lineItems: true,
      },
    });
  
    return orders as unknown as OrderWithLineItems[];
  };
  
  export const OrderRepository: OrderRepositoryType = {
    createOrder,
    findOrder,
    updateOrder,
    deleteOrder,
    findOrdersByCustomerId,
  };
  