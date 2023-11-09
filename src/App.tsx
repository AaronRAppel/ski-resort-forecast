import React from 'react'
import './App.css'
import { Home } from './components'
import { ErrorBoundary } from 'react-error-boundary'
import styled from 'styled-components'

function App() {
  return (
    <div className="App">
      <ErrorBoundary
        fallback={
          <ErrorPage>Something went wrong, please try again.</ErrorPage>
        }
      >
        <Home />
      </ErrorBoundary>
    </div>
  )
}

export default App

const ErrorPage = styled.div`
  padding: 36px;
  font-size: 36px;
  color: #f44336;
`
