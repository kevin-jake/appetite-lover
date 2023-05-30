"use client";
import client from "@/libs/appwrite";
import { Account } from "appwrite";
import { useRouter } from "next/router";
import { useContext, createContext, useEffect, useState } from "react";

const defaultState = {
  user: null,
  loading: true,
  error: null,
  logout: async () => {},
  signup: async () => {},
  login: async () => {},
};
const account = new Account(client);
const userContext = createContext(defaultState);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const openModal = () => {
    setIsSignInOpen(true);
  };

  const closeModal = () => {
    setIsSignInOpen(false);
  };

  const loadAccount = async () => {
    try {
      const loadedAccount = await account.get();
      setUser(loadedAccount);
    } catch (error) {
      console.error(error);
      setError("failed to load user");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      await account.createEmailSession(email, password);
      await loadAccount();
    } catch (error) {
      const appwriteException = error;
      console.error(appwriteException.message);
    }
  };

  const register = async (email, password, name) => {
    try {
      const session = await account.create("unique()", email, password, name);
      setUser(session);
      await account.createEmailSession(email, password);
    } catch (error) {
      console.error(error);
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
