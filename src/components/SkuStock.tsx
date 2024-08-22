import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type SkuItem = {
  colorNo: string;
  sizeText: string;
  productId: string;
  styleText: string;
  stockNum?: number;
  varyPrice: number;
};
function Component({
  colorGroups,
}: {
  colorGroups: Record<string, SkuItem[]>;
}) {
  const colorNos = Object.keys(colorGroups);
  const sizes = Array.from(
    new Set(
      Object.values(colorGroups).flatMap((items) =>
        items.map((item) => item.sizeText)
      )
    )
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle></CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Size</TableHead>
              {colorNos.map((colorNo) => (
                <TableHead key={colorNo}>{colorNo}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sizes.map((sizeText) => (
              <TableRow key={sizeText}>
                <TableCell className="font-medium">{sizeText}</TableCell>
                {colorNos.map((colorNo) => {
                  const skuItem = colorGroups[colorNo].find(
                    (item) => item.colorNo === colorNo
                  );
                  return (
                    <TableCell key={`${colorNo}-${sizeText}`}>
                      {skuItem ? (
                        <Badge
                          variant={
                            skuItem.varyPrice > 0 ? "default" : "secondary"
                          }
                        >
                          {skuItem.varyPrice}
                        </Badge>
                      ) : (
                        <Badge variant="outline">N/A</Badge>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Component;
