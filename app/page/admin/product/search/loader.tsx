import { openApiFetchClient } from "~/lib/OpenApiFetchClient";
import type { Route } from "./+types/index";
import { getDefaultQuerys } from "./get-default-querys";

const PAGE_SIZE = 10;

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const defaultQuerys = getDefaultQuerys(url.searchParams);

    const { data } = await openApiFetchClient.GET("/api/products", {
        params: {
            query: {
                likeProductName: defaultQuerys.likeProductName,
                pageSize: PAGE_SIZE,
                pageNumber: defaultQuerys.pageNumber,
                sortCondition: defaultQuerys.sortCondition,
            },
        },
    });

    return data!;
}
