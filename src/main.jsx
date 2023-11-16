import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './components/Layout'
import NewClient, {action as newClientAction} from './Pages/NewClient'
import Index, { loader as clientsLoader } from './pages/Index'
import ErrorPage from './components/FixPage'
import EditClient, {loader as editClientLoader, action as editClientAction} from './Pages/EditClient'
import { action as deleteClientAction} from './components/Client'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Index />,
        loader: clientsLoader,
        errorElement: <ErrorPage/>
    },
      {
        path: '/clients/new',
        element: <NewClient />,
        action: newClientAction,
        errorElement: <ErrorPage />
      },
      {
        path: '/clients/:clientId/edit',
        element: <EditClient />,
        loader: editClientLoader,
        action: editClientAction,
        errorElement: <ErrorPage/>
      },
      {
        path: '/clients/:clientId/delete',
        action: deleteClientAction
      }
    ]
  },


]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider
  router={router}
  />
)
