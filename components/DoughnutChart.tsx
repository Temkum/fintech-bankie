'use client'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const DoughnutChart = ({accounts}: DoughnutChartProps) => {

  const data = {
    labels: ['Bank', 'Bank 2', 'Bank 3'],
    datasets: [
      {
        label: 'Banks',
        data: [1250, 3550, 4500],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  return (
    <Doughnut
      data={data}
      options={{ cutout: '50%', plugins: { legend: { display: false } } }}
    />
  );
}

export default DoughnutChart