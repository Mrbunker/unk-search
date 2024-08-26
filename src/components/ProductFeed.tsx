import Link from "next/link";

const ProductFeed = ({ list }: { list: any[] }) => {
  return (
    <div>
      多个结果
      <div>
        {list.map((f: any) => (
          <div>
            <Link
              href={`/search-rsc/${f.code}`}
              key={f.productCode}
            >{`${f.name} ${f.code}`}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFeed;
