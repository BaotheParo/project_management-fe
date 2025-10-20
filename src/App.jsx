import AppRouter from './routes/AppRouter'
import './App.css'
import { AppProvider } from './app/AppProvider'

export default function App() {
  return (
      <AppProvider>
        <AppRouter />
      </AppProvider>
  )
}
