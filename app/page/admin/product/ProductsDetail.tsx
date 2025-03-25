
import React, { useState , useEffect } from 'react';
import { BrowserRouter, Link, useNavigate, useLoaderData ,useParams } from 'react-router-dom';
import axios from 'axios';
import type { Route } from '../../../page/admin/product/+types/ProductsDetail';

interface Product {  
  stockId: string,
  name: string,
  description: string,
  imageUrl: string,
  price: number,
  quantity: number
}

// interface PostProduct {  
//   name: string,
//   description: string,
//   imageUrl: string,
//   price: number,
//   }

export async function loader({ params }: Route.LoaderArgs) {

    const response = await axios.get<Product>(`http://localhost:8082/api/products/${params.productId}`,{
      //  params: {
      //    id: params.productId
      //  },
    })
    return response.data;
}

export default function ProductsDetail({
  loaderData
}: Route.ComponentProps) {    

    const {productId} = useParams();

    const [changedName, setChangedName] = useState<string>(loaderData.name);
    const [changedDescription, setChangedDescription] = useState<string>(loaderData.description);
    const [changedImageUrl, setChangedImageUrl] = useState<string>(loaderData.imageUrl);
    const [changedPrice, setChangedPrice] = useState<number>(loaderData.price);

    async function ProductChange (){

      const UpdateProduct = {
        name: changedName,
        description: changedDescription,
        imageUrl: changedImageUrl,
        price: changedPrice
      }

      try{
        const response = await axios.put(`http://localhost:8082/api/products/${productId}`,UpdateProduct)
        console.log('商品情報を更新しました:', response.data);
      } catch (error) {
        console.error('失敗だドン:', error);
      }  
    }

    return (
    <div>
    <h1>商品詳細マスタ</h1>
          <label>商品ID:</label>
          <textarea
            //type="text"
            value={productId}
            //onChange={(e) => setChangedId(e.target.value)}
          ></textarea>

          <label>商品名:</label>
          <input
            type="text"
            value={changedName}
            onChange={(e) => setChangedName(e.target.value)}
          ></input>

          <label>説明:</label>
          <input
            type="text"
            value={changedDescription}
            onChange={(e) => setChangedDescription(e.target.value)}
          ></input>

          <label>URL:</label>
          <input
            type="text"
            value={changedImageUrl}
            onChange={(e) => setChangedImageUrl(e.target.value)}
          ></input>

          <label>価格:</label>
          <input
            type="number"
            value={changedPrice}
            onChange={(e) => setChangedPrice(Number(e.target.value))}
          ></input>

        <button type="submit" onClick={ProductChange}>
          更新
        </button>

    </div>

    )
}