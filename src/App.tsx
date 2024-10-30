import React from 'react';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import { useAuthStore } from './store/auth';

function App() {
  const user = useAuthStore((state) => state.user);

  return user ? <Dashboard /> : <Auth />;
}

export default App;
