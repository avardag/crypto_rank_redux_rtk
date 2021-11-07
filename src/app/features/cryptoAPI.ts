import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export type Currency = {
  allTimeHigh: { price: string; timestamp: Date };
  approvedSupply: boolean;
  change: number;
  circulatingSupply: number;
  color: string;
  confirmedSupply: boolean;
  description: string;
  firstSeen: Date;
  history: string[];
  iconType: string;
  iconUrl: string;
  id: number;
  listedAt: Date;
  marketCap: number;
  name: string;
  numberOfExchanges: number;
  numberOfMarkets: number;
  penalty: boolean;
  price: number;
  rank: number;
  slug: string;
  socials: string[];
  symbol: string;
  totalSupply: number;
  type: string;
  uuid: string;
  volume: number;
  websiteUrl: "https://bitcoin.org";
};
export type APIResponse = {
  data: {
    base: {
      sign: string;
      symbol: string;
    };
    coins: Currency[];
    stats: {
      base: string;
      limit: number;
      offset: number;
      order: string;
      total: number;
      total24hVolume: number;
      totalExchanges: number;
      totalMarketCap: number;
      totalMarkets: number;
    };
  };
  status: string;
};

const cryptoApiHeaders = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": import.meta.env.VITE_COIN_API,
};
const cryptoBaseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

// Define a service using a base URL and expected endpoints
export const cryptoApiSlice = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: cryptoBaseUrl,
  }),
  endpoints: (builder) => ({
    //builder.query<ResultType, QueryArg>
    // getCryptos: builder.query<APIResponse, void>({
    getCryptos: builder.query<APIResponse, number>({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCryptosQuery } = cryptoApiSlice;
