import './App.css'

import { QueryClientProvider } from 'react-query'
import { RandomGacha } from '@/components/RandomGacha'
import React from 'react'
import queryClient from './api/queryClient'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RandomGacha />
    </QueryClientProvider>
  )
}

export default App
