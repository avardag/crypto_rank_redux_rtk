import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export type NewsArticle = {
  _type: string;
  about: {
    _type: string;
    name: string;
    readLink: string;
  }[];
  category: string;
  datePublished: string;
  description: string;
  image: {
    _type: string;
    thumbnail: {
      contentUrl: string;
      height: number;
      width: number;
    };
  };
  name: string;
  provider: {
    name: string;
    image: {
      thumbnail: {
        contentUrl: string;
      };
    };
  }[];
  url: string;
};
export type NewsAPIResponse = {
  totalEstimatedMatches: number;
  value: NewsArticle[];
  _type: string;
  queryContext: {
    _type: string;
    adultIntent: boolean;
    originalQuery: string;
    readLink: string;
  };
  status: string;
};

const newsApiHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": import.meta.env.VITE_COIN_API,
};
const newsBaseUrl = "https://bing-news-search1.p.rapidapi.com";

const createRequest = (url: string) => ({ url, headers: newsApiHeaders });

// Define a service using a base URL and expected endpoints
export const newsApiSlice = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: newsBaseUrl,
  }),
  endpoints: (builder) => ({
    //builder.query<ResultType, QueryArg>
    // getCryptos: builder.query<APIResponse, void>({
    getNews: builder.query<
      NewsAPIResponse,
      { newsCategory: string; count: number }
    >({
      query: ({ newsCategory, count }) =>
        createRequest(
          `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
        ),
    }),
  }),
});
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetNewsQuery } = newsApiSlice;
