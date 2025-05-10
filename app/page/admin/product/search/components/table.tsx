import { useNavigate } from 'react-router';
import { Button } from "~/components/ui/button";
import { Table as ShadcnTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { type components } from "~/api-schema/schema.d";

type Props = {
    products: components["schemas"]["Summary"][];
}

export function Table(props: Props) {
    const navigate = useNavigate();

    return (
        <ShadcnTable>
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
                {props.products.map((product) => (
                    <TableRow key={product.id}>
                        <TableCell>
                            <img className="w-15 h-15" src={product.imageUrl} />
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
        </ShadcnTable>
    )
}