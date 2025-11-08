import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function withAuthCheck(WrappedComponent) {
  return function AuthCheckedComponent(props) {
    // Solo verificar en desarrollo
    if (import.meta.env.DEV) {
      const token = localStorage.getItem('token');
      
      try {
        if (token) {
          // Verificar si el token es válido
          const decoded = jwtDecode(token);
          if (decoded) {
            return <WrappedComponent {...props} />;
          }
        }
        // Si no hay token o no es válido, redirigir a login
        return <Navigate to="/login" replace />;
      } catch (error) {
        console.error('Invalid token:', error);
        return <Navigate to="/login" replace />;
      }
    }
    
    // En producción, renderizar normalmente
    return <WrappedComponent {...props} />;
  };
}

export default withAuthCheck;