import type { Route } from "./+types/index";
import {openApiFetchClient } from '~/lib/OpenApiFetchClient';
import { DEFORT_SORT } from './index';

const PAGE_SIZE = 10;

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url)

    // 検索条件をQueryParameterから復元存在しない場合は、デフォルト値を設定
    const likeProductName = url.searchParams.get("likeProductName") || ""
    const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1")
    const sortProperty = (url.searchParams.get("sortProperty") || DEFORT_SORT.property) as "PRICE" | "REGISTRATION_DATE"
    const sortDirection = (url.searchParams.get("sortDirection") || DEFORT_SORT.direction) as "ASC" | "DESC"

    console.log(sortDirection)

    const { data } = await openApiFetchClient.GET('/api/products', {
        params: {
            query: {
                likeProductName: likeProductName,
                pageSize: PAGE_SIZE,
                pageNumber: pageNumber,
                sortProperty: sortProperty,
                sortDirection: sortDirection
            }
        },
    })

    return data!
}