import { querySpuDetail, queryStock, searchDescription } from "@/apis/fetch";
import SearchInput from "@/components/SearchInput";
import SkuStock from "@/components/SkuStock";
import { groupBy } from "@/lib/utils";

const SearchResult = async ({ params }: { params: { keyword: string } }) => {
  const keyword = decodeURIComponent(params.keyword);
  const feedRes = await searchDescription({
    keyword,
    pageSize: 30,
    page: 1,
  });
  console.log("|feedRes", feedRes);
  if (!feedRes.success || feedRes.resp[1].length === 0) {
    return "无数据";
  }

  const { productCode, colorPic, styleText, chipPic, name, code } =
    feedRes.resp[1]?.[0];
  const stockRes = await queryStock({ productCode });
  const spuRes = await querySpuDetail({ productCode });

  if (!stockRes.success || !spuRes.success) {
    return <div>Error</div>;
  }

  const { rows: skus } = spuRes.resp[0];
  const skuGroup = groupBy(skus, "colorNo");
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
      <SearchInput />
      <SkuStock
        skuGroup={skuGroup}
        colors={colors}
        nameCode={`${name} ${code}`}
      />
      <div></div>
    </div>
  );
};
export default SearchResult;
