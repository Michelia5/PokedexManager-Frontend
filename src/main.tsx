import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { UserProvider } from './context/UserContext'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <UserProvider >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>
)
