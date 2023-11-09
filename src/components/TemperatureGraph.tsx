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
import moment from 'moment'

interface Props {
  data: Period[]
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
    const dateTime = moment(cur.endTime)
    const date = dateTime.format('YYYY-MM-DD')
    const day = dateTime.format('DD')

    // This API returns a time range, so we're using the first hour given in the range here
    const stringTime = cur.endTime.split('T')[1]
    const hour = stringTime.split(':')[0]

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
