import { useState } from 'react';
import { useNavigate, useSearchParams, useRouteError } from 'react-router';
import createClient from "openapi-fetch";
import type { paths } from "../../../../api/schema";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import IPagination from "~/components/custom/i-pagination";
import type { Route } from "./+types/search-product";

interface Product {
    id: string,
    name: string,
    imageUrl: string | undefined,
    price: number,
    quantity: number
}

interface SortValue {
    title: string,
    direction: "ASC" | "DESC",
    property: "PRICE" | "REGISTRATION_DATE"
}

const sorts: Map<number, SortValue> = new Map<number, SortValue>([
    // 価格の昇順
    [1, { title: "価格の昇順", direction: "ASC", property: "PRICE" }],
    // 価格の降順
    [2, { title: "価格の降順", direction: "DESC", property: "PRICE" }],
    // 登録された順
    [3, { title: "登録された順", direction: "ASC", property: "REGISTRATION_DATE" }],
]);

export async function loader({ request }: Route.LoaderArgs) {
    const client = createClient<paths>({ baseUrl: "http://localhost:8082" })

    const url = new URL(request.url)
    // この画面は10件ずつ表示する
    const pageSize = 10

    const likeProductName = url.searchParams.get("likeProductName") || ""
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1")
    const sortProperty = (url.searchParams.get("sortProperty") || "PRICE") as "PRICE" | "REGISTRATION_DATE"
    const sortDirection = (url.searchParams.get("sortDirection") || "ASC") as "ASC" | "DESC"

    const { data } = await client.GET('/api/products', {
        params: {
            query: {
                likeProductName: likeProductName,
                pageSize: pageSize,
                pageNumber: pageNumber,
                sortProperty: sortProperty,
                sortDirection: sortDirection
            }
        },
    });

    if(data == undefined) {
        throw Error("APIの問い合わせに失敗しました");
    }

    return data
}

export default function SearchProduct({
    loaderData,
}: Route.ComponentProps) {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [_, setSearchParams] = useSearchParams();

    const totalPage = Math.ceil(loaderData.page.paging.totalCount / loaderData.page.paging.pageSize);
    const currentPage = loaderData.page.paging.pageNumber;

    function handleSeach() {
        setSearchParams(prev => {
            prev.set("likeProductName", search);
            return prev;
        });
    }

    function handleSortChange(value: string) {
        setSearchParams(prev => {
            prev.set("sortProperty", sorts.get(parseInt(value))!.property);
            prev.set("sortDirection", sorts.get(parseInt(value))!.direction);
            return prev;
        });
    }

    function handlePageChange(page: number) {
        setSearchParams(prev => {
            prev.set("pageNumber", String(page));
            return prev;
        });
    }

    return (
        <div className="p-6">
            <div className="flex flex-col gap-4 mt-4 p-4">
                <div className="flex justify-center gap-4">
                    <Input
                        placeholder="商品名で検索"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1 max-w-xl"
                    />
                    <Button onClick={handleSeach} className="flex-shrink-0">検索</Button>
                </div>
            </div>

            <div className="flex justify-end mt-4">
                <Select onValueChange={handleSortChange}>
                    <SelectTrigger className="w-44">
                        <SelectValue placeholder="並び替え" />
                    </SelectTrigger>
                    <SelectContent >
                        {Array.from(sorts.entries()).map(([key, value]) => (
                            <SelectItem key={key} value={String(key)}>{value.title}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead>画像</TableHead>
                        <TableHead>商品名</TableHead>
                        <TableHead>値段</TableHead>
                        <TableHead>在庫数</TableHead>
                        <TableHead>登録日時</TableHead>
                        <TableHead>更新日時</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loaderData.page.items.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell>
                                <img className="w-16 h-16" src={product.imageUrl} />
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell>2025/10/23</TableCell>
                            <TableCell>2025/10/23</TableCell>
                            <TableCell>
                                <Button onClick={() => navigate(`/product/update/${product.id}`)}>更新</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex justify-center mt-4">
                <IPagination totalPages={totalPage} currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();
    return <div>エラーが起きました。</div>;
}