//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
//const baseUrl = 'http://localhost:3001/'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import Page404 from './pages/Page404'
import routes from './routes'

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout/>,
      errorElement:<Page404/>,
      children: routes
    },
  ]) 
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
