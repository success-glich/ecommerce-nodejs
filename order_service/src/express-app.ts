import express, { NextFunction, Request, Response } from 'express';
import orderRoutes from './routes/order.route';
import cartRoutes from './routes/cart.route';
import { HandleErrorWithLogger, httpLogger } from './utils';
import { INitializeBroker } from './service/broker.service';


export const ExpressApp= async()=>{
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(httpLogger)


    //* initialize message broker
    await INitializeBroker()
    
    app.use(cartRoutes);
    app.use(orderRoutes);

    app.use("/", (req: Request, res: Response, _: NextFunction) => {
        return res.status(200).json({ message: "I am healthy!" });
      });
    app.use(HandleErrorWithLogger)

    return app;
}


