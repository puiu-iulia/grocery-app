import { RealmProvider, AppProvider, UserProvider } from '@realm/react';
import { GroceryItem } from '../models/GroceryItem';
import { AnonymousAuth } from '../components/AnonymousAuth';

interface MyRealmProviderProps {
    children: React.ReactNode;
}

const appId = 'groceries-fygtldz';

export function MyRealmProvider({ children }: MyRealmProviderProps) {
  return (
    <AppProvider id={appId}>
      <UserProvider fallback={AnonymousAuth}>
        <RealmProvider
          schema={[GroceryItem]}
          sync={{
            flexible: true,
            onError: (_session, error) => {
              console.log(error);
            },
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects('GroceryItem'));
              },
              rerunOnOpen: true,
            },
          }}
        >
          {children}
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  );
}
