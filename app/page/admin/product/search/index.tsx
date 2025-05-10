import { useSearchParams } from 'react-router';
import Pagination from "~/components/custom/pagination";
import type { Route } from "./+types/index";
import { SearchField } from './components/search-filed';
import { type SortCondition, SortConditionSelect } from "./components/sort-condition-select";
import { Table } from "./components/table";
import { getDefaultQuerys } from './get-default-querys';

export { loader } from './loader';

export default function SearchProduct({
    loaderData,
}: Route.ComponentProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultQuerys = getDefaultQuerys(searchParams);

    function handleSeachChange(likeProductName: string) {
        setSearchParams(prev => {
            prev.set("likeProductName", likeProductName);
            prev.set("pageNumber", "1")
            return prev;
        });
    }

    function handleSortChange(sortCondition: SortCondition) {
        setSearchParams(prev => {
            prev.set("sortCondition", sortCondition);
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
            <div className="flex justify-center mt-4">
                <SearchField defaultValue={defaultQuerys.likeProductName}
                    onSearchChange={handleSeachChange} />
            </div>

            <div className="flex justify-end mt-4">
                <SortConditionSelect defaultValue={defaultQuerys.sortCondition}
                    onSortChange={handleSortChange} />
            </div>

            <div className="mt-4">
                <Table products={loaderData.page.items} />
            </div>

            <div className="flex justify-center mt-4">
                <Pagination totalPage={loaderData.page.paging.totalPage}
                    currentPage={loaderData.page.paging.pageNumber}
                    onPageChange={handlePageChange} />
            </div>
        </div>
    );
}