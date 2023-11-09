import React, { useEffect, useState } from 'react'
import { TemperatureGraph } from './TemperatureGraph'
import { ConditionsTable } from './ConditionsTable'
import { CircularProgress, MenuItem, Select, Typography } from '@mui/material'
import { useForecastData } from '../redux/forecastSlice'
import styled from 'styled-components'
import { ResortCoordinates, resortCoordinates } from '../misc/resortCoordinates'

export const Home: React.FC = () => {
  const [selectedResortId, setSelectedResortId] = useState(1)
  const { fetchForecast, forecastState } = useForecastData()

  const selectedResort = resortCoordinates.find(
    r => r.id === selectedResortId
  ) as ResortCoordinates

  useEffect(() => {
    fetchForecast({ x: selectedResort.x, y: selectedResort.y })
  }, [fetchForecast, forecastState.properties, selectedResort])

  return (
    <Page>
      <Typography variant="h2" gutterBottom>
        {selectedResort?.name} Conditions
      </Typography>

      <DropdownContainer>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedResortId}
          label="Age"
          onChange={e => setSelectedResortId(e.target.value as number)}
        >
          {resortCoordinates.map(r => (
            <MenuItem key={r.id} value={r.id}>
              {r.name}
            </MenuItem>
          ))}
        </Select>
      </DropdownContainer>

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
  position: relative;
  padding: 36px;
`

const Content = styled.div`
  text-align: left;
`

const DropdownContainer = styled.div`
  position: absolute;
  top: 36px;
  right: 72px;
`
