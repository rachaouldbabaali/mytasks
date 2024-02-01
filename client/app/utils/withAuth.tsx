// utils/withAuth.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticatedUser } from '../api/api';

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const user = await isAuthenticatedUser();

          if (!user) {
            console.log('User not found');
            
            router.push('/login');
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
