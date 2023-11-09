import { getSortedData } from '../sorting'
import { mockData } from '../../mocks'

describe('getSortedData', () => {
  it('sorts by date descending', () => {
    const sortedData = getSortedData(mockData, 'date', 'desc')
    expect(sortedData).toEqual(mockData)
  })

  it('sorts by date ascending', () => {
    const sortedData = getSortedData(mockData, 'date', 'asc')

    const orderedData = [...mockData].reverse()

    expect(sortedData).toEqual(orderedData)
  })

  it('sorts by temp descending', () => {
    const sortedData = getSortedData(mockData, 'temp', 'desc')

    const orderedData = [...mockData]
    const deletedRecord = orderedData.splice(1, 1)
    orderedData.unshift(deletedRecord[0])

    expect(sortedData).toEqual(orderedData)
  })

  it('sorts by temp ascending', () => {
    const sortedData = getSortedData(mockData, 'temp', 'asc')

    const orderedData = [...mockData]
    const deletedRecord = orderedData.splice(2, 1)
    orderedData.unshift(deletedRecord[0])

    expect(sortedData).toEqual(orderedData)
  })
})
