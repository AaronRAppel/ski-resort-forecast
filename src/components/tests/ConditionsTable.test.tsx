import * as React from 'react'
import { render, screen } from '@testing-library/react'
import { ConditionsTable } from '../ConditionsTable'
import { mockData } from '../../mocks'

describe('TemperatureGraph', () => {
  it('renders the table headers', () => {
    render(<ConditionsTable data={mockData} />)

    expect(screen.getByText(/Time Period/i)).toBeInTheDocument()
    expect(screen.getByText('Temperature (F°)')).toBeInTheDocument()
    expect(screen.getByText(/Wind Speed/)).toBeInTheDocument()
    expect(screen.getByText(/Wind Direction/)).toBeInTheDocument()
    expect(screen.getByText(/Precipitation %/)).toBeInTheDocument()
  })

  it('renders table data', () => {
    render(<ConditionsTable data={mockData} />)

    expect(screen.getByText(/This Afternoon/)).toBeInTheDocument()
    expect(screen.getByText(/Tonight/)).toBeInTheDocument()
    expect(screen.getByText(/Friday/)).toBeInTheDocument()
  })
})
