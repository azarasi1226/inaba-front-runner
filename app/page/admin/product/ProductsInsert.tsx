
import React, { useState , useEffect } from 'react';
import { BrowserRouter, Link, useNavigate, useLoaderData ,useParams } from 'react-router-dom';
import axios from 'axios';
import { ulid } from 'ulid';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, colors, styled, tableCellClasses, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';

// interface Product {  
//   stockId: string,
//   name: string,
//   description: string,
//   imageUrl: string,
//   price: number,
//   quantity: number
// }

// interface PostProduct {  
//   name: string,
//   description: string,
//   imageUrl: string,
//   price: number,
//   }

export default function ProductsInsert() {    

    const [changedId, setChangedId] = useState<string>('');
    const [changedBrandId, setchangedBrandId] = useState<string>('');    
    const [changedName, setChangedName] = useState<string>('');
    const [changedDescription, setChangedDescription] = useState<string>('');
    const [changedImage, setChangedImage] = useState<File>();
    const [changedPrice, setChangedPrice] = useState<number>(0);
    
    async function ProductRegister (){

      const productIdUlid = ulid();
      setChangedId(productIdUlid);
      
      // const insertProduct = {
      //   id: changedId,
      //   brandId:changedBrandId, 
      //   name: changedName,
      //   description: changedDescription,
      //   imageUrl: changedImageUrl,
      //   price: changedPrice
      // }
     const changedPriceString:string = changedPrice.toString()

     const formData = new FormData();
      formData.append("id", changedId)
      formData.append("brandId",changedBrandId)
      formData.append("name" , changedName)
      formData.append("description", changedDescription)
      if (changedImage != undefined) {
        formData.append("image", changedImage)
      }
      formData.append("price" ,changedPriceString)

      try{
        const response = await axios.post('http://localhost:8082/api/products',formData)
            console.log('商品情報を登録しました:', response.data);
        } catch (error) {
            console.error('失敗だドン:', error);
        }  
     }

     function handleFileChange (event: React.ChangeEvent<HTMLInputElement>) {
      if (event.target.files && event.target.files.length > 0) {
        setChangedImage(event.target.files[0]);
      }
     }

     function handleUploadClick(){
      document.getElementById("file-input")?.click();
    };
  

    return (
    <div>
    <h1>商品新規登録</h1>

          <label>商品名:</label>
          <input
            type="text"
            value={changedName}
            onChange={(e) => setChangedName(e.target.value)}
          ></input>

          
          <label>会社ID:</label>
          <input
            type="text"
            value={changedBrandId}
            onChange={(e) => setchangedBrandId(e.target.value)}
          ></input>


          <label>説明:</label>
          <input
            type="text"
            value={changedDescription}
            onChange={(e) => setChangedDescription(e.target.value)}
          ></input>

          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <input
              id="file-input"
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUploadClick}
            >
              ファイルを選択
            </Button>
            {changedImage && <Typography variant="body1">選択されたファイル: {changedImage.name}</Typography>}
          </Box>

          {/* <label>URL:</label>
          <input
            type="file"
            value={changedImage}
            onChange={(e) => setChangedImage(e.target.value)}
          ></input> */}

          <label>価格:</label>
          <input
            type="number"
            value={changedPrice}
            onChange={(e) => setChangedPrice(Number(e.target.value))}
          ></input>

        <Button type="submit" onClick={ProductRegister}>
            新規登録
        </Button>

    </div>

    )
}