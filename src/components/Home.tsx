import React, { useEffect, useState } from 'react'
import { TemperatureGraph } from './TemperatureGraph'
import { ConditionsTable } from './ConditionsTable'
import {
  Alert,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  Snackbar,
  Typography,
} from '@mui/material'
import { useForecastData } from '../redux/forecastSlice'
import styled from 'styled-components'
import { ResortCoordinates, resortCoordinates } from '../misc/resortCoordinates'
import { useWindowDimensions } from '../hooks'

export const Home: React.FC = () => {
  const [selectedResortId, setSelectedResortId] = useState(1)
  const { fetchForecast, forecastState } = useForecastData()

  const selectedResort = resortCoordinates.find(
    r => r.id === selectedResortId
  ) as ResortCoordinates

  useEffect(() => {
    if (
      forecastState.status !== 'loading' &&
      forecastState.status !== 'failed' &&
      !forecastState.resorts[selectedResortId]
    )
      fetchForecast({
        id: selectedResort.id,
        x: selectedResort.x,
        y: selectedResort.y,
      })
  }, [fetchForecast, forecastState, selectedResort, selectedResortId])

  const [showError, setShowError] = useState(false)
  const hideError = () => setShowError(false)

  useEffect(() => {
    if (forecastState.status === 'failed') setShowError(true)
  }, [forecastState.status])

  const retryFetch = () =>
    fetchForecast({
      id: selectedResort.id,
      x: selectedResort.x,
      y: selectedResort.y,
    })

  const { width: windowWidth } = useWindowDimensions()

  return (
    <Page>
      <Snackbar open={showError} autoHideDuration={6000} onClose={hideError}>
        <Alert onClose={hideError} severity="error" sx={{ width: '100%' }}>
          An error occurred. Please try again.
        </Alert>
      </Snackbar>
      <Typography variant="h2" gutterBottom>
        {selectedResort?.name} Conditions
      </Typography>

      <DropdownContainer $small={windowWidth < 1200}>
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
        {forecastState.status === 'failed' && (
          <>
            <br />
            <br />
            <Button onClick={retryFetch}>Retry Fetch</Button>
          </>
        )}
      </DropdownContainer>

      {forecastState.resorts[selectedResortId]?.periods && (
        <Content>
          <TemperatureGraph
            data={forecastState.resorts[selectedResortId].periods}
          />
          <ConditionsTable
            data={forecastState.resorts[selectedResortId].periods}
          />
        </Content>
      )}

      {forecastState.status === 'loading' && <CircularProgress />}
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

const DropdownContainer = styled.div<{ $small: boolean }>`
  position: ${p => (p.$small ? 'relative' : 'absolute')};
  margin-bottom: ${p => (p.$small ? 72 : 0)}px;
  top: ${p => (p.$small ? 'auto' : '36px')};
  right: ${p => (p.$small ? 'auto' : '72px')};
`
