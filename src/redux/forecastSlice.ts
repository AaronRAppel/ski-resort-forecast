import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Properties, ResortArgs } from '../types'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from './hooks'

const fetchForecastThunk = createAsyncThunk<Properties, ResortArgs>(
  'forecast/fetchForecast',
  async (args: ResortArgs) => {
    const response = await axios.get(
      `https://api.weather.gov/gridpoints/BOU/${args.x},${args.y}/forecast`
    )
    return response.data.properties
  }
)

interface InitialState {
  resorts: {
    [key: number]: Properties
  }
  status: 'idle' | 'loading' | 'success' | 'failed'
}

const initialState: InitialState = { resorts: {}, status: 'idle' }

const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchForecastThunk.pending, state => {
      state.status = 'loading'
    })

    builder.addCase(fetchForecastThunk.fulfilled, (state, action) => {
      state.resorts[action.meta.arg.id] = action.payload
      state.status = 'success'
    })

    builder.addCase(fetchForecastThunk.rejected, state => {
      state.status = 'failed'
    })
  },
})

export const useForecastData = () => {
  const dispatch = useAppDispatch()
  const forecastState = useAppSelector(state => state.forecast)

  return {
    forecastState,
    fetchForecast: (args: ResortArgs) => dispatch(fetchForecastThunk(args)),
  }
}

export default forecastSlice.reducer
