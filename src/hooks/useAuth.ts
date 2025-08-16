import { useState, useEffect } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('taskManager_user');
    if (storedUser) {
      setAuthState({
        user: JSON.parse(storedUser),
        isLoading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('http://localhost:3001/users');
      const users = await response.json();
      
      const user = users.find((u: any) => 
        u.username === username && u.password === password
      );

      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('taskManager_user', JSON.stringify(userWithoutPassword));
        setAuthState({
          user: userWithoutPassword,
          isLoading: false
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('taskManager_user');
    setAuthState({
      user: null,
      isLoading: false
    });
  };

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    login,
    logout
  };
};