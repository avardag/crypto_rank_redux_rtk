import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  APIResponseAll,
  APIResponseDetails,
  APIResponseExchange,
  APIResponseHistory,
} from "./types";

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
    getCryptos: builder.query<APIResponseAll, number>({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query<APIResponseDetails, string>({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCoinHistory: builder.query<
      APIResponseHistory,
      { coinId: string; timePeriod: string }
    >({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history/${timePeriod}`),
    }),
    getCryptoExchanges: builder.query<APIResponseExchange, void>({
      query: (coinId) => createRequest(`/exchanges`),
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCoinHistoryQuery,
  useGetCryptoExchangesQuery,
} = cryptoApiSlice;
