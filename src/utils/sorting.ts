import { Period } from '../types'
import moment from 'moment/moment'

export type SortBy = 'date' | 'temp'

export type Direction = 'asc' | 'desc'

export const getSortedData = (
  data: Period[],
  sortBy: SortBy,
  direction: Direction
): Period[] => {
  const sortedData = [...data]

  switch (sortBy) {
    case 'date':
      return sortedData.sort((a, b) => {
        const dateA = moment(a.startTime)
        const dateB = moment(b.startTime)

        if (dateA > dateB) return direction === 'asc' ? -1 : 1
        else return direction === 'asc' ? 1 : -1
      })
    case 'temp':
      return sortedData.sort((a, b) =>
        direction === 'asc'
          ? b.temperature - a.temperature
          : a.temperature - b.temperature
      )
    default:
      return sortedData
  }
}
