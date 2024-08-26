import { searchDescription } from "@/apis/fetch";
import ProductFeed from "@/components/ProductFeed";
import SearchInput from "@/components/SearchInput";

const SearchResult = async ({ params }: { params: { keyword: string } }) => {
  const searchRes = await searchDescription({
    keyword: decodeURIComponent(params.keyword),
    pageSize: 30,
    page: 1,
  });
  const feed = searchRes.resp[1];
  console.log("|feed", feed);
  if (!searchRes.success || feed.length === 0) {
    return "无数据";
  }

  return (
    <div className="m-4 p-4">
      <SearchInput />
      <div>
        <ProductFeed list={feed} />
      </div>
    </div>
  );
};
export default SearchResult;
