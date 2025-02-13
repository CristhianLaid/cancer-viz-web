"use client"

import { useEffect } from 'react';
import useAuthStore from '@/ui/store/authStore';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, checkAuthStatus, loading } = useAuthStore();
    const router = useRouter();
  
    useEffect(() => {
      const authenticate = async () => {
        if (!isAuthenticated && !loading) {
          await checkAuthStatus(); // Verifica el estado de autenticación
        }
      };
  
      authenticate();
    }, [isAuthenticated, checkAuthStatus, loading]);
  
    if (loading) {
      return <div>Loading...</div>; // Muestra un spinner mientras se verifica la autenticación
    }
  
    if (!isAuthenticated) {
      router.push("/login"); // Redirige a login si no está autenticado
      return null;
    }
  
    return <>{children}</>; // Si está autenticado, renderiza el contenido protegido
  };
  
  export default ProtectedRoute;