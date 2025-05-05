import { useState } from 'react';
import { useNavigate, useSearchParams, useRouteError, isRouteErrorResponse } from 'react-router';
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import Pagination from "~/components/custom/pagination";
import type { Route } from "./+types/index";

type Sort = {
    key: string,
    title: string,
    direction: "ASC" | "DESC",
    property: "PRICE" | "REGISTRATION_DATE"
}

const SORTS: Sort[] = [
    { key: "1", title: "価格が安い順", direction: "ASC", property: "PRICE" },
    { key: "2", title: "価格が高い順", direction: "DESC", property: "PRICE" },
    { key: "3", title: "登録された順", direction: "ASC", property: "REGISTRATION_DATE" },
]

export const DEFORT_SORT = SORTS[1]!;

export { loader } from './loader';

export default function SearchProduct({
    loaderData,
}: Route.ComponentProps) {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // ページング条件を計算
    const totalPage = Math.ceil(loaderData.page.paging.totalCount / loaderData.page.paging.pageSize);
    const currentPage = loaderData.page.paging.pageNumber;

    // 検索条件をQueryParameterから復元
    const defaultLikeProductName = searchParams.get("likeProductName") || "";
    const defaultSortProperty = searchParams.get("sortProperty");
    const defultSortDirection = searchParams.get("sortDirection");
    const defaultSort = SORTS.find((sort) => {
        return sort.property === defaultSortProperty && sort.direction === defultSortDirection;
    }) || DEFORT_SORT;

    // State
    const [search, setSearch] = useState<string>(defaultLikeProductName);

    function handleSeach() {
        setSearchParams(prev => {
            prev.set("likeProductName", search);
            return prev;
        });
    }

    function handleSortChange(value: string) {
        setSearchParams(prev => {
            // SORTS.map()によって展開されたkeyがvalueとして来るので、必ず存在する。
            // よって!をつけている。
            prev.set("sortProperty", SORTS.find(sort => sort.key === value)!.property);
            prev.set("sortDirection", SORTS.find(sort => sort.key === value)!.direction);
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
                <Select onValueChange={handleSortChange} defaultValue={defaultSort.key}>
                    <SelectTrigger className="w-44">
                        <SelectValue placeholder="並び替え" />
                    </SelectTrigger>
                    <SelectContent>
                        {SORTS.map(
                            ({ key, title }) => (
                                <SelectItem key={key} value={key}>{title}</SelectItem>
                            )
                        )}
                    </SelectContent>
                </Select>
            </div>

            <Table className="mt-4">
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
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
                <Pagination totalPage={totalPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export function ErrorBoundary() {
    return ErrorPage()
}

export function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-lg text-center">
                <h1 className="text-4xl font-bold text-red-500 mb-4">
                    {isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : "エラーが発生しました"}
                </h1>
                <p className="text-lg text-gray-600 mb-6">
                    {isRouteErrorResponse(error)
                        ? error.data || "リクエストの処理中にエラーが発生しました。"
                        : error instanceof Error
                            ? error.message
                            : "不明なエラーが発生しました。"}
                </p>
                {error instanceof Error && (
                    <details className="bg-gray-100 p-4 rounded-lg text-left text-sm text-gray-600">
                        <summary className="cursor-pointer font-semibold text-gray-800">
                            スタックトレースの表示
                        </summary>
                        <pre className="mt-2 whitespace-pre-wrap">{error.stack}</pre>
                    </details>
                )}
            </div>
        </div>
    );
}