import SearchInput from "@/components/SearchInput";

const Search = async ({ params }: { params: { keyword: string } }) => {
  return (
    <div className="m-4 p-4">
      <SearchInput />
    </div>
  );
};
export default Search;
