import React, { useEffect } from 'react'
import { TemperatureGraph } from './TemperatureGraph'
import { ConditionsTable } from './ConditionsTable'
import { CircularProgress, Typography } from '@mui/material'
import { useForecastData } from '../redux/forecastSlice'
import styled from 'styled-components'

export const Home: React.FC = () => {
  const { fetchForecast, forecastState } = useForecastData()

  useEffect(() => {
    if (!forecastState.properties) fetchForecast()
  }, [fetchForecast, forecastState.properties])

  return (
    <Page>
      <Typography variant="h2" gutterBottom>
        Arapahoe Basin Conditions
      </Typography>
      {forecastState.properties?.periods ? (
        <Content>
          <TemperatureGraph data={forecastState.properties.periods} />
          <ConditionsTable data={forecastState.properties.periods} />
        </Content>
      ) : (
        <CircularProgress />
      )}
    </Page>
  )
}

const Page = styled.div`
  padding: 36px;
`

const Content = styled.div`
  text-align: left;
`
