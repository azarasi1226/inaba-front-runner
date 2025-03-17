import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import createClient from "openapi-fetch";
import type { paths } from "../../../api/schema.d.ts";
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, colors, styled, tableCellClasses, FormControl, InputLabel, Select, MenuItem , Pagination} from '@mui/material';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "#ECEFF1"
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface Product {
  id: string,
  name: string,
  imageUrl: string | undefined,
  price: number,
  quantity: number
}

interface SortValue{
  title: string,
  direction:"ASC"|"DESC",
  property:"PRICE"|"REGISTRATION_DATE"
}

// interface Paging {
//   totalCount: number
//   pageSize: number
//   pageNumeber: number
// }
// interface Page {
//   items: Product[]
//   paging: Paging
// 


const sorts: Map<number, SortValue> = new Map<number, SortValue>([
  // 価格の昇順
  [1, {title: "価格の昇順", direction: "ASC", property: "PRICE" }],
  // 価格の降順
  [2, {title: "価格の降順", direction: "DESC", property: "PRICE" }],
  // 登録された順
  [3, {title: "登録された順", direction: "ASC", property: "REGISTRATION_DATE" }],
]);

export default function Products() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [searchDBProducts, setSearchDBProducts] = useState<Product[]>([]);
  // const [selectSortProperty, setSelectSortProperty] = useState('');
  const [selectSort, setSelectSort] = useState<number>(1);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // const pricehigh:SortValue = "a"

  //ソートを実施した場合の処理
  useEffect(() => {
    const sort = sorts.get(selectSort)
    Search(sort!.property,sort!.direction,page);
  }, [selectSort ,page]);

  //検索ボタン押下時の処理
  async function hundleButtonSerach() {
    await Search("PRICE","ASC",1);
  }

  //共通検索処理
  async function Search(sortProperty: "PRICE"|"REGISTRATION_DATE" ,sortDirection: "ASC"|"DESC" ,pageNumber: number) {
    if (!search&&totalPages!==1) window.location.reload();
    if (!search) return;  // 商品名が空の場合は

    const client = createClient<paths>({ baseUrl: "http://localhost:8082" })

    const response = await client.GET('/api/products', {
      params: {
        query: {
          likeProductName: search,  // 商品名をクエリパラメータとして渡す
          pageSize: 10,
          pageNumber: pageNumber - 1,
          sortProperty: sortProperty,
          sortDirection: sortDirection
        }
      },
    });

    if (response.data == undefined) {
      // SDKの結果が帰らない場合のエラー処理
      console.log(response.error)
      return
    }

    //正常系の処理、商品リストを取得
    setSearchDBProducts(response.data.page.items.map(item =>
      ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        price: item.price,
        quantity: item.quantity
      })
    ));  

    //ページング数の確定
    setTotalPages(Math.ceil(response.data.page.paging.totalCount / response.data.page.paging.pageSize));
  }

  function productClick(id: string) {
    navigate(`/products/${id}`)
  }

  function ProductRegister() {
    navigate('../ProductsInsert')
  }

  function handleSortChanged(event: any){
    setSelectSort(event.target.value);
  } 

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <Box sx={{ backgroundColor: "#757575", padding: 2, borderRadius: 1 }}>
          <h2 style={{ fontSize: "24px", color: "#FAFAFA" }}>気持ち良すぎる商品マスタ</h2>
        </Box>
      </Box>

      <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginY: 2 }}>
        <TextField
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="商品名で検索"
          margin="normal"
        />

        <Button variant="outlined"
          onClick={hundleButtonSerach}>
          検索
        </Button>

        <Button variant="outlined"
          onClick={ProductRegister}>
          新規登録
        </Button>
      </Box>
      </Box>


        <Box sx={{ marginTop: 2 , mr: 4,display: "flex",justifyContent: "flex-end"}}>
        <FormControl>
          <InputLabel id="Sort-label">並び替え</InputLabel>
            <Select sx={{width:180}}
              labelId="Sort-label"
              id="Sort-label"
              label="項目"
              onChange={handleSortChanged}
              // renderValue={(selected) => {
              //   const parsed: SortValue = JSON.parse(selected);
              //   return `${parsed.property} (${parsed.direction})`;
              // }}
              >
            {
            Array.from(sorts.entries()).map(([key, value]) => (
                <MenuItem key={key} value={key}>{value.title}</MenuItem>
            ))
            }
          </Select>
         </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{marginTop:2}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: 18 }}>商品コード</TableCell>
              <TableCell sx={{ fontSize: 18 }}>商品名</TableCell>
              <TableCell sx={{ fontSize: 18 }}>値段</TableCell>
              <TableCell sx={{ fontSize: 18 }}>在庫数</TableCell>
              <TableCell sx={{ fontSize: 18 }}>更新</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {searchDBProducts.map((product, index) => (
              <StyledTableRow key={index}>
                <TableCell sx={{ fontSize: 16 }}>{product.id}</TableCell>
                <TableCell sx={{ fontSize: 16 }}>{product.name}</TableCell>
                <TableCell sx={{ fontSize: 16 }}>{product.price}</TableCell>
                <TableCell sx={{ fontSize: 16 }}>{product.quantity}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small" onClick={() => productClick(product.id)}>更新</Button>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ marginTop: 2, display: "flex", justifyContent: "center" }}>
        <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} />
      </Box>
    
    </>
  );
} 