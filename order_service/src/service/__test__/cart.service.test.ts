import { CartRepositoryType } from '../../types/repository.types';
import * as repository from '../../repository/cart.repo';

import { CreateCart } from '../cart.service';
describe('cartService',()=>{

    let repo:CartRepositoryType


    beforeEach(()=>{
        repo = repository.CartRepository
    })

    afterEach(()=>{
        repo = {} as CartRepositoryType;
    })

    describe('CreateCart',()=>{
        it('should create cart',async()=>{

            const mockCart = {
                title:'smart phone',
                user_id:1,
                product_id:1,
                quantity:1,
                amount:2000
            }
            jest.spyOn(repo,'create').mockImplementation(()=>Promise.resolve({ message:'Fake response from test repos',data:mockCart}))
            // const res = repo.create(mockCart);
            const res = await CreateCart(mockCart,repo);
            expect(res)
            .toEqual({ message:'Fake response from test repos',data:mockCart})


        });
    })
})