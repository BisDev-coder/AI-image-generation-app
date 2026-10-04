import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/api/user/is-auth`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // REGISTER
  // const register = async (name, email, password) => {
  //   const response = await fetch(`${API_URL}/api/user/register`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //     body: JSON.stringify({
  //       name,
  //       email,
  //       password,
  //     }),
  //   });

  //   return await response.json();
  // };
  // now when usr register then token will be created 
  const register = async (name, email, password) => {
    const response = await fetch(`${API_URL}/api/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setUser(data.user);
    }

    return data;
  };

  //  LOGIN
  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/api/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      setUser(data.user);
    }

    return data;
  };

  // LOGOUT
  const logout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/user/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      const data = await response.json();

      if (data.success) {
        setUser(null);
      }

      return data;
    } catch (error) {
      console.error('Logout error:', error);

      return {
        success: false,
        message: 'Logout failed',
      };
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authLoading,
        register,
        login,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// Create AuthContext

// We'll use React Context so the whole app can know:

// whether the user is logged in
// current user information
// login function
// register function
// logout function
// authentication loading state

// Important part

// Notice:

// credentials: 'include'

// This is what allows the browser to send/receive our HTTP-only JWT cookie.

// For example:

// React
//   ↓
// login API
//   ↓
// Server sets token cookie
//   ↓
// Browser stores cookie
//   ↓
// Future requests → cookie automatically included