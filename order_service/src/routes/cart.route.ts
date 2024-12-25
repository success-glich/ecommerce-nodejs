import * as express from 'express';
import * as service from '../service/cart.service';
import * as repository from '../repository/cart.repo';

const router = express.Router()
const repo = repository.CartRepository;

router.post('/cart',async (req:express.Request,res:express.Response)=>{
    console.log(req.body)
    const response =await service.CreateCart(req.body,repo);
 res.status(201).json({
    success:true,
    message:"Cart created successfully!",
    data:response
 })
});

router.get('/cart',async (req:express.Request,res:express.Response)=>{


    const response =await service.GetCart(req.body,repo);
 res.status(200).json(response)
});
router.get('/cart/:id',async (req:express.Request,res:express.Response)=>{

    const response =await service.GetCart(Number(req.params.id),repo);
    res.status(200).json(response)
});
router.delete('/cart/:id',async (req:express.Request,res:express.Response)=>{


    const response =await service.DeleteCart(Number(req.params.id),repo);
 res.status(200).json(response)
});
router.delete('/cart',async (req:express.Request,res:express.Response)=>{


    res.status(200).json({
        message:"Delete cart"
    })
});
router.delete('/cart',async (req:express.Request,res:express.Response)=>{


    res.status(200).json({
        message:"Delete cart"
    })
});



router.patch('/cart',async (req:express.Request,res:express.Response)=>{


    res.status(200).json({
        message:"Create cart"
    })
});

export default router;
