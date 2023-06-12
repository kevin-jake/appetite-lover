"use client";
import { account } from "@/libs/appwrite";
import { useContext, createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const defaultState = {
  user: null,
  loading: true,
  logout: async () => {},
  signup: async () => {},
  login: async () => {},
};
const userContext = createContext(defaultState);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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

      closeModal();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      await account.createEmailSession(email, password);
      await loadAccount();
      toast.success("You are now logged in");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      console.error(error);
    }
  };

  const register = async (email, password, name) => {
    try {
      setLoading(true);
      await account.create("unique()", email, password, name);
      await login(email, password);
      toast.success("Registered successfully");
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
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

export const useUser = () => {
  const context = useContext(userContext);
  return context;
};
