import { SORTS, type SortCondition } from "./components/sort-condition-select";

export type DefaultQuerys = {
  likeProductName: string;
  pageNumber: number;
  sortCondition: SortCondition;
};

export function getDefaultQuerys(searchParams: URLSearchParams): DefaultQuerys {
  const likeProductName = searchParams.get("likeProductName") || "";
  const pageNumber = Number.parseInt(searchParams.get("pageNumber") || "1");
  const sortCondition: SortCondition = SORTS.find(
    (i) => i.key === searchParams.get("sortCondition"),
  )
    ? (searchParams.get("sortCondition") as SortCondition)
    : "PRICE_ASC";

  return {
    likeProductName,
    pageNumber,
    sortCondition,
  };
}
