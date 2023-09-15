import { useEffect } from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Routes from "./Routes"
import { useNavigate } from 'react-router-dom'
import './App.css'
// Create a client
const queryClient = new QueryClient()

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      return navigate('/login')
    }
  }, [navigate])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes />
      </QueryClientProvider>
    </>
  )
}

export default App
