import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ListingsPerNeighbourhood = ({ listingsPerNeighbourhood }) => {

  let chartLabels = [];
  let chartData = [];

  listingsPerNeighbourhood.forEach(stat => {
    chartLabels.push(stat.neighbourhood);
    chartData.push(stat.count);
  });

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: '# of listings',
        data: chartData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (

    <div>
      <h4 className="text-lg font-bold">Listings per Neighbourhood</h4>
      <Pie data={data}/>
    </div>
  )
};

export default ListingsPerNeighbourhood;
