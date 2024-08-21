import { stock, feed, spuDetail } from "./mock";

const fetcher = async (url: string, options: any) => {
  const response = await fetch(url, options);
  return response.json();
};

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
}) => {
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

  // return post(path, data);
  return feed;
};

export const queryStock = async (params: {
  productCode: string;
  distribution?: string;
  type?: string;
}) => {
  const path = `/m/stock/stock/query`;
  const data = {
    productCode: params.productCode,
    distribution: params.distribution ?? "EXPRESS",
    type: params.type ?? "DETAIL",
  };
  // return post(path, data);
  return stock;
};

export const querySpuDetail = async (params: { productCode: string }) => {
  const path = `/m/m/product/i/product/spu/h5/query/${params.productCode}`;

  // return get(path);
  return spuDetail;
};
