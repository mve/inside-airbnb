import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ResponseTimes = ({ responseTimes }) => {

  let chartLabels = [];
  let chartData = [];

  responseTimes.forEach(stat => {
    chartLabels.push(stat.time);
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
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (

    <div>
      <h4 className="text-lg font-bold">Response Times</h4>
      <Bar data={data}/>
    </div>
  )
};

export default ResponseTimes;
