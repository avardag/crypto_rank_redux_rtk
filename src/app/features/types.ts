export type Currency = {
  allTimeHigh: { price: number; timestamp: Date };
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
  links: { name: string; type: string; url: string }[];
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
export type Stats = {
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
export type Exchange = {
  id: number;
  uuid: string;
  name: string;
  description: string;
  iconUrl: string;
  verified: boolean;
  numberOfMarkets: number;
  volume: number;
  rank: number;
  marketShare: number;
};

export interface APIResponseAll {
  data: {
    coins: Currency[];
    stats: Stats;
  };
  status: string;
}

export interface APIResponseDetails extends Omit<APIResponseAll, "data"> {
  data: {
    coin: Currency;
  };
}

export interface APIResponseHistory extends Omit<APIResponseAll, "data"> {
  data: {
    change: number;
    history: { price: number; timestamp: Date }[];
  };
}

export interface APIResponseExchange extends Omit<APIResponseAll, "data"> {
  data: {
    exchanges: Exchange[];
  };
}
