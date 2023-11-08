import React from 'react'
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Period } from '../types'
import { useWindowDimensions } from '../hooks'
import { GraphTooltip } from './GraphTooltip'
import { Typography } from '@mui/material'

interface Props {
  data: Period[]
}

const getDayString = (day: number) => {
  switch (day) {
    case 1:
      return '1st'
    case 2:
      return '2nd'
    case 3:
      return '3rd'
    default:
      return `${day}th`
  }
}
export const TemperatureGraph: React.FC<Props> = ({ data }) => {
  const { width: windowWidth } = useWindowDimensions()

  const tempsByDate = data.reduce<
    {
      date: string
      day: string
      details: string
      Low?: number
      High?: number
    }[]
  >((acc, cur) => {
    const [date, time] = cur.endTime.split('T') // These dates use a consistent format, so we can assume these values will be correct
    const dayNum = parseInt(date.split('-')[2])
    const day = getDayString(dayNum)
    const hour = time.split(':')[0]

    if (acc.length > 0 && acc[acc.length - 1].date === date) {
      acc[acc.length - 1][hour === '06' ? 'Low' : 'High'] = cur.temperature
    } else {
      acc[acc.length] = {
        date,
        day,
        details: cur.detailedForecast,
        Low: hour === '06' ? cur.temperature : undefined,
        High: hour === '06' ? undefined : cur.temperature,
      }
    }

    return acc
  }, [])

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Temperature (F&deg;)
      </Typography>
      {tempsByDate.length && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            width={1200}
            height={400}
            data={tempsByDate}
            accessibilityLayer
          >
            <XAxis
              dataKey={windowWidth > 900 ? 'date' : 'day'}
              padding={{ right: 16, left: 16 }}
            />
            <YAxis padding={{ top: 16, bottom: 16 }} />
            <Line type="monotone" dataKey="High" stroke="#FF6961" />
            <Line type="monotone" dataKey="Low" stroke="#89CFF0" />
            <Tooltip content={<GraphTooltip />} />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      )}
    </>
  )
}
