import { RouterProvider } from 'react-router-dom';
import router from './index.jsx';

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
