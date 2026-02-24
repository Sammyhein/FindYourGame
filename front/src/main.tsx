import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Questions from './pages/Questions.tsx'
import Results from './pages/Results.tsx'
import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage.tsx'
import DescriptionGame from './pages/DescriptionGame.tsx'
import Password from './pages/Password.tsx'
import Admin from './pages/Admin.tsx'

const router = createBrowserRouter([
  {path:"/", element:<App />},
  {path:"/questions", element:<Questions />},
  {path:"/results", element:<Results />},
  {path:"*", element:<NotFoundPage />},
  {path:"/descriptionGame", element:<DescriptionGame />},
  {path:"/password", element:<Password />},
  {path:"/admin", element:<Admin />}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
