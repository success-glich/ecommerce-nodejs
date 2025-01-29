import { Application } from 'express';
import * as express from "express";
// import cors from 'cors';
// import morgan from 'morgan';
// import { catalogRouter } from './api/rest/catalog.routes';
import catalogRouter from './api/catalog.routes'

export class ExpressApp {
    public app: Application;

    constructor() {
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
    }

    private setupMiddleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        // this.app.use(cors());
        // this.app.use(morgan('dev'));
    }

    private setupRoutes(): void {

        this.app.use('/api', catalogRouter)
        this.app.get('/health-check', (_, res) => {
            res.status(200).json({ status: 'OK' });
        });
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}