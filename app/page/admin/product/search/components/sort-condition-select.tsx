import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

export type SortCondition = "PRICE_ASC" | "PRICE_DESC" | "REGISTRATION_DATE_ASC";

export const SORTS: { key: SortCondition; label: string }[] = [
    { key: "PRICE_ASC", label: "価格が安い順" },
    { key: "PRICE_DESC", label: "価格が高い順" },
    { key: "REGISTRATION_DATE_ASC", label: "登録された順" }
];

type Props = {
    defaultValue: SortCondition
    onSortChange: (sortCodnition: SortCondition) => void
}

export function SortConditionSelect(props: Props) {
    return (
        <Select onValueChange={props.onSortChange} defaultValue={props.defaultValue}>
            <SelectTrigger className="w-44">
                <SelectValue placeholder="並び替え" />
            </SelectTrigger>
            <SelectContent>
                {SORTS.map(
                    ({ key, label }) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                    )
                )}
            </SelectContent>
        </Select>
    )
}