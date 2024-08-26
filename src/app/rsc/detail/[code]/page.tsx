import { groupBy } from "@/lib/utils";
import { querySpuDetail, queryStock, searchDescription } from "@/apis/fetch";
import ProductFeed from "@/components/ProductFeed";
import SkuStock from "@/components/SkuStock";

const SearchResult = async ({ params }: { params: { code: string } }) => {
  const searchRes = await searchDescription({
    keyword: decodeURIComponent(params.code),
    pageSize: 30,
    page: 1,
  });
  const feed = searchRes.resp[1];
  console.log("|feed", feed);
  if (!searchRes.success || feed.length === 0) {
    return "无数据";
  }
  if (feed.length > 1) {
    return <ProductFeed list={feed} />;
  }

  const { colorPic, styleText, chipPic } = feed?.[0];
  const { productCode, name, code } = feed?.[0];

  const stockRes = await queryStock({ productCode });
  if (!stockRes.success) {
    return <div>Error</div>;
  }
  const { expressSkuStocks } = stockRes.resp[0];
  const spuRes = await querySpuDetail({ productCode });
  if (!spuRes.success) {
    return <div>Error</div>;
  }

  const { rows: skus, summary } = spuRes.resp[0];
  const skuStocks = skus.map((skuItem) => {
    const estock = expressSkuStocks[skuItem.productId] as number;
    // console.log("|estock", skuItem.productId, estock);
    return {
      ...skuItem,
      expressStock: estock,
    };
  });
  const skuGroup = groupBy(skuStocks, "colorNo");
  const colors = Object.keys(skuGroup).map((colorNo) => {
    const no = colorNo.slice(3);
    return {
      colorNo,
      styleText: styleText.find((s: string) => s.includes(no)),
      chipPic: chipPic.find((s: string) => s.includes(colorNo)),
      colorPic: colorPic.find((s: string) => s.includes(colorNo)),
    };
  });

  return (
    <div className="m-4 p-4">
      <SkuStock
        skuGroup={skuGroup}
        colors={colors}
        nameCode={`${name} ${code}`}
        isExpress={summary.isExpress === "Y"}
        isPickup={summary.isPickup === "Y"}
      />
      <div></div>
    </div>
  );
};
export default SearchResult;
