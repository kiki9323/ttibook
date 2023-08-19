import './App.css'

import { QueryClientProvider } from 'react-query'
import React from 'react'
import queryClient from './api/queryClient'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
    </QueryClientProvider>
  )
}

export default App
