import * as express from 'express';

const router = express.Router()


router.post('/order',async (req:express.Request,res:express.Response)=>{


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