import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { GoogleCredentialResponse, GoogleJWTPayload } from '../types/auth';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const decoded = jwtDecode<GoogleJWTPayload>(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser({
            id: decoded.sub,
            email: decoded.email,
            name: decoded.name,
            picture: decoded.picture,
          });
        } else {
          localStorage.removeItem('auth_token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        localStorage.removeItem('auth_token');
      }
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    // Initialize Google Identity Services
    const initializeGoogleAuth = () => {
      if (window.google && import.meta.env.VITE_GOOGLE_CLIENT_ID) {
        try {
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
            use_fedcm_for_prompt: false,
          });
        } catch (error) {
          console.error('Error initializing Google Auth:', error);
        }
      }
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (window.google) {
        initializeGoogleAuth();
      } else {
        // Wait for Google script to load
        const checkGoogle = setInterval(() => {
          if (window.google) {
            initializeGoogleAuth();
            clearInterval(checkGoogle);
          }
        }, 100);

        // Cleanup interval after 10 seconds to prevent infinite checking
        setTimeout(() => clearInterval(checkGoogle), 10000);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleCredentialResponse = (response: GoogleCredentialResponse) => {
    try {
      const decoded = jwtDecode<GoogleJWTPayload>(response.credential);
      const userData: User = {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      };

      setUser(userData);
      localStorage.setItem('auth_token', response.credential);
    } catch (error) {
      console.error('Error handling credential response:', error);
    }
  };

  const signIn = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};