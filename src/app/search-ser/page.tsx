import { querySpuDetail, queryStock, searchDescription } from "@/apis/fetch";
import SearchInput from "../components/SearchInput";
import SkuPicker from "../components/SkuPicker";

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

  return (
    <div>
      <SearchInput />
      <SkuPicker productCode={productCode} />
      <div></div>
    </div>
  );
};
export default Search;
