'use client'

import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type PointHistory = {
  date: string
  points: number
}

type Props = {
  history: PointHistory[]
  title: string
}

export function PointHistoryChart({ history, title }: Props) {
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    const data = {
      labels: history.map(item => item.date),
      datasets: [
        {
          label: 'Puanlar',
          data: history.map(item => item.points),
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    }
    setChartData(data)
  }, [history])

  const options: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Tarih'
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Puanlar'
        }
      }
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  }

  if (!chartData) return null

  return <Line options={options} data={chartData} />
}

