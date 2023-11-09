export type UnitValue = {
  unitCode: string
  value: number
}

export type Period = {
  detailedForecast: string
  dewpoint: UnitValue
  endTime: string
  icon: string
  isDaytime: boolean
  name: string
  number: number
  probabilityOfPrecipitation: UnitValue
  relativeHumidity: UnitValue
  shortForecast: string
  startTime: string
  temperature: number
  temperatureTrend: string
  temperatureUnit: string
  windDirection: string
  windSpeed: string
}

export type Properties = {
  elevation: UnitValue
  periods: Period[]
}

export type Coordinates = {
  x: number
  y: number
}
