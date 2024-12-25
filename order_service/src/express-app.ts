import express from 'express';
import orderRoutes from './routes/order.route';
import cartRoutes from './routes/cart.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cartRoutes);
app.use(orderRoutes);




export default app;