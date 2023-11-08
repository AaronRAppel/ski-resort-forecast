import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Properties } from '../types'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from './hooks'

const fetchForecastThunk = createAsyncThunk<Properties>(
  'forecast/fetchForecast',
  async () => {
    const response = await axios.get(
      'https://api.weather.gov/gridpoints/BOU/32,59/forecast'
    )

    return response.data.properties
  }
)

interface InitialState {
  properties?: Properties
  testing: boolean
}

const initialState: InitialState = {
  properties: undefined,
  testing: true,
}

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchForecastThunk.fulfilled, (state, action) => {
      state.properties = action.payload
    })
  },
})

export const useForecastData = () => {
  const dispatch = useAppDispatch()
  const forecastState = useAppSelector(state => state.forecast)

  return { forecastState, fetchForecast: () => dispatch(fetchForecastThunk()) }
}

export default forecastSlice.reducer
