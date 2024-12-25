import axios from "axios";
import { logger } from "../logger";
import { NotFoundError } from "../error";
import { Product } from "../../dto/product.dto";


const CATALOG_BASE_URL = process.env.CATALOG_BASE_URL || "http://localhost:9001/api";

export const GetProductDetail = async (id:string) => {
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