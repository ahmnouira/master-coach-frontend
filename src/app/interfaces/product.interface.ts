import { ProductType } from "../models/product/product-type.enum"

export interface IProduct {
    title: string 
    description: string 
    duration?: number
    type: ProductType
    category?: string 
    price: string
    isFree?: boolean
    displayedInShop?: boolean
    image?: any
    files?: any[]
}
  