import SearchInput from "../../components/SearchInput";
import SkuStock from "../../components/SkuStock";
import { querySpuDetail, queryStock, searchDescription } from "@/apis/fetch";

const Search = async () => {
  const feedRes = await searchDescription({
    keyword: "牛",
    pageSize: 30,
    page: 1,
  });
  if (!feedRes.success) {
    return false;
  }

  const { productCode, colorPic } = feedRes.resp[1]?.[0];
  const stockRes = await queryStock({ productCode });
  const spuRes = await querySpuDetail({ productCode });

  if (!stockRes.success || !spuRes.success) {
    return <div>Error</div>;
  }

  const { rows: skus } = spuRes.resp[0];
  const colorGroups = Object.groupBy(skus, ({ colorNo }) => colorNo);
  console.log("|colorGroups", colorGroups);

  return (
    <div className="m-4 p-4">
      <SearchInput />
      <SkuStock colorGroups={colorGroups} />
      <div></div>
    </div>
  );
};
export default Search;
