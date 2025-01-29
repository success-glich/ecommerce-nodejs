import axios from "axios";
import { logger } from "../logger";
import { AuthorizationError, NotFoundError } from "../error";
import { Product } from "../../dto/product.dto";
import { User } from "../../dto/User.Model";


const CATALOG_BASE_URL = process.env.CATALOG_BASE_URL || "http://localhost:9001/api";
const AUTH_SERVICE_BASE_URL = process.env.AUTH_SERVICE_BASE_URL || "http://localhost:9000";
export const GetProductDetail = async (id: number) => {
  // const response = await fetch(`${CATALOG_BASE_URL}/products/${id}`);
  // const product = await response.json();
  // return product;

  try {

    const res = await axios.get(`${CATALOG_BASE_URL}/products/${id}`);

    return res.data as Product
  } catch (error) {
    logger.error(error)
    throw new NotFoundError('Product not found')
  }
}
export const GetStockDetails = async (ids: number[]) => {
  try {
    const response = await axios.post(`${CATALOG_BASE_URL}/products/stock`, {
      ids,
    });
    return response.data as Product[];
  } catch (error) {
    logger.error(error);
    throw new NotFoundError("error on getting stock details");
  }
};


export const ValidateUser = async (token: string) => {
  try {
    console.log('ValidateUser called', token);
    const response = await axios.get(`${AUTH_SERVICE_BASE_URL}/auth/validate`, {
      headers: {
        Authorization: token,
      }
    })
    console.log('response', response.data);

    if (response.status !== 200) {
      throw new AuthorizationError("user not authorized");
    }

    return response.data.tokenData as User
  } catch (err) {
    console.log('error while validating user', err);

  }
}