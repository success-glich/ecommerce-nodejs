import * as express from 'express';
import { RequestAuthorizer } from './middleware';

const router = express.Router()


router.post('/order',RequestAuthorizer,async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    const user = req.user;
    if(!user){
        next(new Error("User not found"));
        return;
    }

    // const response = await OrderService.CreateOrder(user);
    res.status(200).json({
        message:"Create order"
    })
});

router.route('/order')
    .get(async (req:express.Request,res:express.Response)=>{
        res.status(200).json({
            message:"Get all order"
        })
    }   

)

router.get('/order/:id',async (req:express.Request,res:express.Response)=>{


    res.status(200).json({
        message:"Get order"
    })
});
router.delete('/order/:id',async (req:express.Request,res:express.Response)=>{


    res.status(200).json({
        message:"Delete order"
    })
});



export default router