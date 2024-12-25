import {faker} from '@faker-js/faker'
import catalogRouter, { catalogService } from '../catalog.routes'
import * as request from 'supertest'
import * as express from "express";
// const app = new ExpressApp().app;
const app =  express(); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(catalogRouter)

const mockRequest = ()=>{
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        stock: faker.number.int({min:1, max:100}),
        price: +faker.commerce.price()
    }
}

describe('Catalog Routes',()=>{
  describe("POST /products", () => {
    test("should create product successfully", async () => {
      const requestBody = mockRequest();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() => Promise.resolve(requestBody));
      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");
        
      expect(response.status).toBe(201);
      expect(response.body).toEqual(requestBody);
    });

    test("should response with validation error 400", async () => {
      const requestBody = mockRequest();
      const response = await request(app)
        .post("/products")
        .send({ ...requestBody, name: "" })
        .set("Accept", "application/json");
      expect(response.status).toBe(400);
      expect(response.body).toEqual("name should not be empty");
    });

    test("should response with an internal error code 500", async () => {
      const requestBody = mockRequest();
      jest
        .spyOn(catalogService, "createProduct")
        .mockImplementationOnce(() =>
          Promise.reject(new Error("unable to create product"))
        );
      const response = await request(app)
        .post("/products")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(500);
      expect(response.body).toEqual("unable to create product");
    });
  });
    describe('GET /products',()=>{

        test('should get all products successfully.',async ()=>{
            const product = mockRequest();
            jest
            .spyOn(catalogService,'getProducts')
            .mockImplementationOnce(()=>Promise.resolve([product]));
            const response = await request(app).get('/products').set('Accept', 'application/json');
            expect(response.status).toBe(200);
        })
        test('should response with an internal error',async ()=>{
            jest
            .spyOn(catalogService,'getProducts')
            .mockImplementationOnce(()=>Promise.reject(new Error('Product does not exists')));

            const response = await request(app).get('/products').set('Accept', 'application/json');
        

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Product does not exists')
        })
    })

})
