import React, { useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from '@mui/material'
import { Period } from '../types'
import styled from 'styled-components'
import moment from 'moment'

interface Props {
  data: Period[]
}

type SortBy = 'date' | 'temp'

type Direction = 'asc' | 'desc'

const getSortedData = (
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

export const ConditionsTable: React.FC<Props> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<{
    sortBy: SortBy
    direction: Direction
  }>({ sortBy: 'date', direction: 'desc' })

  const updateSortConfig = (sortBy: SortBy) => {
    if (sortBy === sortConfig.sortBy)
      setSortConfig(cur => ({
        ...cur,
        direction: cur.direction === 'asc' ? 'desc' : 'asc',
      }))
    else setSortConfig({ sortBy, direction: 'desc' })
  }

  const sortedData = getSortedData(
    data,
    sortConfig.sortBy,
    sortConfig.direction
  )

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Details
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>
                Time Period
                <TableSortLabel
                  active={sortConfig.sortBy === 'date'}
                  direction={sortConfig.direction}
                  onClick={() => updateSortConfig('date')}
                />
              </TableCell>
              <TableCell>
                Temperature (F&deg;)
                <TableSortLabel
                  active={sortConfig.sortBy === 'temp'}
                  direction={sortConfig.direction}
                  onClick={() => updateSortConfig('temp')}
                />
              </TableCell>
              <TableCell>Wind Speed</TableCell>
              <TableCell>Wind Direction</TableCell>
              <TableCell>Precipitation %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map(row => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell style={{ width: '50px' }}>
                  <Img src={row.icon} alt="Weather Icon" />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.temperature}&deg;</TableCell>
                <TableCell>{row.windSpeed}</TableCell>
                <TableCell>{row.windDirection}</TableCell>
                <TableCell>
                  {row.probabilityOfPrecipitation.value
                    ? `${row.probabilityOfPrecipitation.value}%`
                    : 'NA'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 64px;
`

const Img = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 4px;
`
