import styled from "styled-components";

export const DetailsHeading = styled.div`
  display: flex;
  justifycontent: center;
  align-items: center;
  flex-direction: column;
  border-bottom: 1px solid gray;
  padding-top: 20px;
  padding-bottom: 20px;
`;
export const StatsListItem = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid gray;
  font-size: 1rem;
  opacity: 0.9;
  padding: 20px;
`;
export const ListTitle = styled.div`
  display: flex;
  gap: 10px;
`;
export const ListValue = styled.p`
  font-weight: bold;
`;

export const CoinLinksListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gray;
  padding: 10px;
  & p {
    text-transform: capitalize;
  }
  & a {
    color: steelblue;
    font-weight: 700;
    font-size: 1rem;
  }
`;
