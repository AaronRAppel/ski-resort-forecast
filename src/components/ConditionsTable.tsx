import React from 'react'
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

interface Props {
  data: Period[]
}

export const ConditionsTable: React.FC<Props> = ({ data }) => {
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
              <TableCell>Time Period</TableCell>
              <TableCell>
                Temperature (F&deg;)
                <TableSortLabel active={true} direction="desc" />
              </TableCell>
              <TableCell>Wind Speed</TableCell>
              <TableCell>Wind Direction</TableCell>
              <TableCell>Precipitation %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
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
