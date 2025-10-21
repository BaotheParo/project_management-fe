import AppRouter from './routes/AppRouter'
import './App.css'
import { AuthProvider } from './app/AuthProvider'

export default function App() {
  return (
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
  )
}
