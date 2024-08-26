import { stock, feed, spuDetail } from "./mock";

const fetcher = async (url: string, options: any) => {
  const response = await fetch(url, options);
  const result = await response.json();
  // console.log("|result", url, JSON.stringify(result));
  return result;
};

type Resp<D> = Promise<{
  msgCode: any;
  msg: any;
  resp: D;
  success: boolean;
  total: number;
}>;

const origin = "https://a.uniqlo.cn";
const post = (path: string, data?: Record<string, any>) => {
  const url = `${origin}${path}`;
  const options = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(data),
  };
  return fetcher(url, options);
};

const get = (path: string, data?: Record<string, any>) => {
  const search = data ? "?" + new URLSearchParams(data).toString() : "";
  const url = `${origin}${path}${search}`;
  const options = {
    method: "GET",
  };
  return fetcher(url, options);
};

export const searchDescription = async (params: {
  keyword: string;
  pageSize?: number;
  page?: number;
}): Resp<any> => {
  const path = `/m/hmall-sc-service/search/searchWithDescriptionAndConditions`;
  const data = {
    identity: [],
    color: [],
    size: [],
    insiteDescription: "",
    rank: "overall",
    pageInfo: {
      page: params.page ?? 1,
      pageSize: params.pageSize ?? 30,
    },
    categoryFilter: {},
    priceRange: {
      low: 0,
      high: 0,
    },
    description: params.keyword,
    storeCode: [],
  };

  return post(path, data);
  // return feed;
};

export const queryStock = async (params: {
  productCode: string;
  distribution?: string;
  type?: string;
}): Resp<any> => {
  const path = `/m/stock/stock/query`;
  const data = {
    productCode: params.productCode,
    distribution: params.distribution ?? "EXPRESS",
    type: params.type ?? "DETAIL",
  };
  return post(path, data);
  // return stock;
};

export type SkuItem = {
  colorNo: string;
  sizeText: string;
  productId: string;
  styleText: string;
  varyPrice: number;
};
type SkuItems = SkuItem[];

export const querySpuDetail = async (params: {
  productCode: string;
}): Resp<
  {
    summary: {
      isExpress: "Y" | "N";
      isPickup: "Y" | "N";
    };
    sizeList: string[];
    rows: SkuItems;
    stockLevel: any;
  }[]
> => {
  const path = `/m/product/i/product/spu/h5/query/${params.productCode}`;

  return get(path);
  // return spuDetail;
};
