import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticatedUser } from '../api/api';

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();
    const path = usePathname();
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const user = await isAuthenticatedUser();

          if(user && path === '/login' || path === '/register') {
            router.push('/allTasks');
          }

          if (!user) {
            if (path !== '/login' && path !== '/register') {
              router.push('/login');
            }
          }
        } catch (error) {
          console.error('Error checking user:', error);
        }
      };

      checkAuth();
    }, []);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
