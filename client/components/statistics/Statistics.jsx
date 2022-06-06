import ListingsPerNeighbourhood from './ListingsPerNeighbourhood';
import PercentageTopHosts from './PercentageTopHosts';
import ResponseTimes from './ResponseTimes';
import TopTenHosts from './TopTenHosts';

const Statistics = ({statistics}) => {

  return (
    <div>
      <h3 className="text-xl font-bold">Statistics</h3>

      <div>
        <ListingsPerNeighbourhood listingsPerNeighbourhood={statistics.listingsPerNeighbourhood} />
        <PercentageTopHosts topHosts={statistics.topHosts} totalHosts={statistics.totalHosts} />
        <ResponseTimes responseTimes={statistics.responseTimes} />
        <TopTenHosts topTenHosts={statistics.topTenHosts} />
      </div>

    </div>
  )
};

export default Statistics;
