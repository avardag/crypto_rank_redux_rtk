import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type APIResponse = {
  data: {
    base: {
      sign: string;
      symbol: string;
    };
    coins: any;
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
  "x-rapidapi-key": "d6489c8178msh5d57f44202c6427p1c8afdjsndb104cc6be66",
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
    getCryptos: builder.query<APIResponse, void>({
      query: () => createRequest("/coins"),
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCryptosQuery } = cryptoApiSlice;
