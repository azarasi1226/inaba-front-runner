import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useState } from "react";

type Props = {
    defaultValue: string
    onSearchChange: (value: string) => void
}

export function SearchField(props: Props) {
    const [search, setSearch] = useState<string>(props.defaultValue);

    return (
        <div className="flex gap-5">
            <Input
                className="w-xl"
                placeholder="商品名"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button onClick={() => { props.onSearchChange(search)}}>検索</Button>
        </div>
    )
}