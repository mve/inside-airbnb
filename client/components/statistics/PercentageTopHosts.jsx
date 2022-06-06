import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PercentageTopHosts = ({ topHosts, totalHosts }) => {

  const data = {
    labels: ['Top Hosts', 'Other Hosts'],
    datasets: [
      {
        label: '% of top hosts',
        data: [((topHosts / totalHosts) * 100), (((totalHosts - topHosts) / totalHosts) * 100)],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (

    <div>
      <h4 className="text-lg font-bold">Percentage Top Hosts</h4>
      <Doughnut data={data}/>
    </div>
  )
};

export default PercentageTopHosts;
