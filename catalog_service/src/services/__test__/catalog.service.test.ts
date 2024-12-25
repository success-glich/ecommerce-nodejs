import exp from "constants";
import { ICatalogRepository } from "../../interface/catalogRepositoryInterface";
import { MockCatalogRepository } from "../../repository/mockCatalog.repository";
import { CatalogService } from "../catalog.service";
import {faker} from '@faker-js/faker'   
import { Product } from "../../models/product.model";
import { Factory } from "rosie";

const mockProduct = (rest:any)=>{
    return {
        id:123,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({min:10,max:10}),
        // price: faker.commerce.price()
        ...rest
    }
}

const productFactory = new Factory<Product>()
.attr('id',faker.number.int({min:1,max:1000}))
.attr('name',faker.commerce.productName())
.attr('description',faker.commerce.productDescription())
.attr('stock',faker.number.int({min:10,max:10}))
.attr('price',+faker.commerce.price())

describe('catalog service', () => {
    let repository: ICatalogRepository;
    beforeEach(() => {
        repository = new MockCatalogRepository();
    })

    afterEach(() => {
        repository = {} as MockCatalogRepository;

    })

    describe('createProduct',  () => {
        test('should create a product', async() => {
            const service = new CatalogService(repository);
            const requestBody = mockProduct({
                price:Number(faker.commerce.price())
            });
           const result =await  service.createProduct(requestBody)

           expect(result).toMatchObject({
            id:expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),   
            price: expect.any(Number),
            stock: expect.any(Number)

           });

        })
        test('should throw error with  unable to create product',async () => {
            const service = new CatalogService(repository)
            const requestBody = mockProduct({
                price:+faker.commerce.price()
            })
            jest
            .spyOn(repository,'create')
            .mockImplementationOnce(()=>Promise.resolve({} as Product) )
            await expect(service.createProduct(requestBody)).rejects.toThrow('Unable to create product')
        })

        test('should throw error with product already exists',async () => {
            const service = new CatalogService(repository)
            const requestBody = mockProduct({
                price:+faker.commerce.price()
            })
            jest
            .spyOn(repository,'create')
            .mockImplementationOnce(()=>Promise.reject(new Error('Product already exists')))

            await expect(service.createProduct(requestBody)).rejects.toThrow('Product already exists')
        })
    })

    describe('updateProduct',  () => {
        test('should update a product', async() => {
            const service = new CatalogService(repository);
            const requestBody = mockProduct({
                price:Number(faker.commerce.price()),
                id:faker.number.int({min:10,max:100})
            });
           const result =await service.updateProduct(requestBody)

           expect(result).toMatchObject(requestBody);
        })

        test('should throw error with product does not exists',async () => {
            const service = new CatalogService(repository)
          
            jest
            .spyOn(repository,'update')
            .mockImplementationOnce(()=>Promise.reject(new Error('Product does not exists')))

            await expect(service.updateProduct({})).rejects.toThrow('Product does not exists')
        })
    })

    describe('getProducts',  () => {

        test('should get all products', async() => {
            const service = new CatalogService(repository);
            const randomLimit = faker.number.int({min:1,max:50});
                const products = productFactory.buildList(randomLimit);
            jest
            .spyOn(repository,'findAll')
            .mockImplementationOnce((limit,offset)=>Promise.resolve(products));
            
          const results =  await service.getProducts(randomLimit,0)
          console.log(results)

          expect(results.length).toEqual(randomLimit);
      
          expect(results).toMatchObject(products)

        
        })
        test('should throw error with product does not exists',async () => {
            const service = new CatalogService(repository)
          
            jest
            .spyOn(repository,'findAll')
            .mockImplementationOnce(()=>Promise.reject(new Error('Product does not exists')))

            await expect(service.getProducts(0,0)).rejects.toThrow('Product does not exists')
        })


    })
    describe('getProduct',  () => {

        test('should get product by id', async() => {
            const service = new CatalogService(repository);
            const product = productFactory.build();
            jest
            .spyOn(repository,'find')
            .mockImplementationOnce(()=>Promise.resolve(product));
            
          const results =  await service.getProduct(product.id!)
          console.log(results)

        //   expect(results.length).toEqual(randomLimit);
      
          expect(results).toMatchObject(product)

        
        })
        test('should throw error with product does not exists',async () => {
            const service = new CatalogService(repository)
          
            jest
            .spyOn(repository,'find')
            .mockImplementationOnce(()=>Promise.reject(new Error('Product does not exists')))

            await expect(service.getProduct(0)).rejects.toThrow('Product does not exists')
        })


    })

    describe('deleteProduct',  () => {

        test('should delete product by id', async() => {
            const service = new CatalogService(repository);
            const product = productFactory.build();
            jest
            .spyOn(repository,'delete')
            .mockImplementationOnce(()=>Promise.resolve({
                id:product.id!
            }));
            
          const results =  await service.deleteProduct(product.id!)
          console.log(results)
      
          expect(results).toMatchObject({
            id:product.id!})

        
        })
        test('should throw error with product does not exists',async () => {
            const service = new CatalogService(repository)
          
            jest
            .spyOn(repository,'delete')
            .mockImplementationOnce(()=>Promise.reject(new Error('Product does not exists')))

            await expect(service.deleteProduct(0)).rejects.toThrow('Product does not exists')
        })


    })
})



