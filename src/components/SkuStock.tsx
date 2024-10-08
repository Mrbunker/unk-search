import { type SkuItem } from "@/apis/fetch";
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
import Image from "next/image";

type Props = {
  skuGroup: Record<string, SkuItem[]>;
  colors: {
    colorNo: string;
    styleText: string;
    chipPic: string;
    colorPic: string;
  }[];
  nameCode: string;
};

function Component({ skuGroup, colors, nameCode }: Props) {
  const sizes = Array.from(
    new Set(
      Object.values(skuGroup).flatMap(
        (items) => items && items.map((item) => item.sizeText)
      )
    )
  );

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{nameCode}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-secondary">
            <TableRow>
              <TableHead className="w-[100px] text-secondary-foreground">
                Size
              </TableHead>
              {colors.map(({ styleText, chipPic }) => (
                <TableHead
                  key={styleText}
                  className="text-secondary-foreground"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={"https://www.uniqlo.cn" + chipPic}
                      alt={styleText}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    {styleText}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sizes.map((sizeText) => (
              <TableRow key={sizeText}>
                <TableCell className="font-medium">{sizeText}</TableCell>
                {colors.map(({ colorNo }) => {
                  const skuItem = skuGroup[colorNo].find(
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
