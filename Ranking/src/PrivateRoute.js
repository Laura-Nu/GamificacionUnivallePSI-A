import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export function PrivateRoute({ children }) {
  const authCookie = Cookies.get('fake_cookie');

  if (!authCookie) {
    console.log('La cookie no existe o está vacía');
    return <Navigate to="/" replace />;
  }

  return children;
}
