import React from "react";
import { Line } from "react-chartjs-2";
import { Loading } from "./index";
import { APIResponseHistory } from "../app/features/types";

type CoinHistoryChartProps = {
  coinHistory: APIResponseHistory | undefined;
  coinName: string;
  currentPrice: number;
  isHistoryFetching: boolean;
};

function CoinHistoryChart({
  coinHistory,
  coinName,
  currentPrice,
  isHistoryFetching,
}: CoinHistoryChartProps) {
  if (isHistoryFetching) {
    return <Loading />;
  }
  if (!coinHistory) {
    return <Loading />;
  }

  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinTimestamp.push(
      new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString()
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In USD",
        data: coinPrice,
        fill: false,
        borderWidth: 1,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
      },
    ],
  };

  const options = {
    scales: {
      // y: {
      //   beginAtZero: true,
      // },
    },
  };

  return (
    <>
      <div className="chart-header">
        <p className="chart-title">{coinName} Price Chart </p>
        <div className="price-container">
          <h3 className="price-change">Change: {coinHistory?.data?.change}%</h3>
          <h3 className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </h3>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  );
}

export default CoinHistoryChart;
