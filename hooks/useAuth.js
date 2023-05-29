import React from "react";

import { Account } from "appwrite";
import appwriteClient from "@/libs/appwrite";

export default function useAuth() {
  const account = new Account(appwriteClient);
  const [isSignInOpen, setIsSignInOpen] = React.useState(false);
  const [currentAccount, setCurrentAccount] = React.useState();

  const closeModal = () => {
    setIsSignInOpen(false);
  };
  const openModal = () => {
    setIsSignInOpen(true);
  };

  const getSession = async () => {
    const promise = account.get();
    let currentAccount = null;
    try {
      currentAccount = await promise;
    } catch (error) {
      console.log(error);
    } finally {
      setCurrentAccount(currentAccount);
    }
    console.log(
      "🚀 ~ file: useAuth.js:15 ~ getSession ~ currentAccount:",
      currentAccount
    );
  };

  const logout = async () => {
    const promise = await account.deleteSession("current");
    setCurrentAccount(null);
  };

  React.useEffect(() => {
    getSession();
  }, [isSignInOpen]);

  return {
    currentAccount,
    isSignInOpen,
    closeModal,
    openModal,
    logout,
  };
}
