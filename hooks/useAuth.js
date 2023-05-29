import { useEffect, useState } from "react";

import { Account, ID } from "appwrite";
import appwriteClient from "@/libs/appwrite";
import { useDispatch } from "react-redux";
import { setLogin, setLogout } from "@/store/slices/auth/authSlice";

export default function useAuth() {
  const account = new Account(appwriteClient);
  const dispatch = useDispatch();
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSession();
  }, []);

  const closeModal = () => {
    setIsSignInOpen(false);
  };
  const openModal = () => {
    setIsSignInOpen(true);
  };

  const getSession = async () => {
    setIsLoading(true);
    try {
      const user = await account.get();
      dispatch(setLogin(user));
      console.log("Logging in successful");
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const login = async (email, password) => {
    const promise = account.createEmailSession(email, password);
    try {
      await promise;
      getSession();
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (email, password, name) => {
    const promise = account.create(ID.unique(), email, password, name);
    try {
      await promise;
      console.log("Signing up successful");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    const promise = await account.deleteSession("current");
    dispatch(setLogout());
  };

  return {
    isSignInOpen,
    loading: isLoading,
    login,
    register,
    closeModal,
    openModal,
    logout,
  };
}
