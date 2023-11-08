import React from 'react'
import styled from 'styled-components'
import { TooltipProps } from 'recharts'
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent'

export const GraphTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({
  active,
  payload,
}) => {
  if (!active || !payload) return null
  return (
    <Container>
      {payload.map(p => (
        <Temp key={p.dataKey}>
          <Label color={p.color}>
            {p.dataKey}: {p.value}
          </Label>
        </Temp>
      ))}
      <div>{payload[0].payload.details}</div>
    </Container>
  )
}

const Container = styled.div`
  padding: 16px;
  background: #f9f9f9;
  border: solid 1px #ccc;
  border-radius: 4px;
  max-width: 300px;
`

const Temp = styled.div`
  margin-bottom: 8px;
`

const Label = styled.div<{ color?: string }>`
  color: ${p => p.color};
`
