import { useAuth } from '@realm/react';

export const AnonymousAuth = () => {
  const { logInWithAnonymous } = useAuth();

  logInWithAnonymous();

  return null;
};