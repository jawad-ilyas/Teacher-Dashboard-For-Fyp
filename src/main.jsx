import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux';
import { store } from './store/Store.js';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import App from '../src/App';


import Home from '../src/pages/Home';
import Register from '../src/pages/Register';
import Login from '../src/pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CourseModules from './pages/CourseModules.jsx';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import ProfilePage from './pages/ProfilePage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'courses/:courseId',
        element: (
          <ProtectedRoute>
            <CourseModules />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },

    ],
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)