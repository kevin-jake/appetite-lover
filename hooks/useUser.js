"use client";
import { account } from "@/libs/appwrite";
import { useContext, createContext, useEffect, useState } from "react";

const defaultState = {
  user: null,
  loading: true,
  error: null,
  logout: async () => {},
  signup: async () => {},
  login: async () => {},
};
const userContext = createContext(defaultState);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const openModal = () => {
    window.scrollTo(0, 0);
    setIsSignInOpen(true);
  };

  const closeModal = () => {
    setIsSignInOpen(false);
  };

  const loadAccount = async () => {
    try {
      setLoading(true);
      const loadedAccount = await account.get();
      setUser(loadedAccount);
      setError("");
      closeModal();
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      await account.createEmailSession(email, password);
      await loadAccount();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const register = async (email, password, name) => {
    try {
      await account.create("unique()", email, password, name);
      await login(email, password);
    } catch (error) {
      console.error(error.message);
    }
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  useEffect(() => {
    loadAccount();
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        loading,
        error,
        isSignInOpen,
        logout,
        login,
        register,
        openModal,
        closeModal,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export const UseUser = () => {
  const context = useContext(userContext);
  return context;
};
