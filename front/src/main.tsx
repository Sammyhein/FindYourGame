import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Questions from './pages/Questions.tsx'
import Results from './pages/Results.tsx'
import { createBrowserRouter , RouterProvider} from 'react-router-dom'

const router = createBrowserRouter([
  {path:"/", element:<App />},
  {path:"/questions", element:<Questions />},
  {path:"/results", element:<Results />}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
