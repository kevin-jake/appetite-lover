"use client";
import React, { createContext, useReducer } from "react";

const initialState = {
  isModalOpen: false,
  refetch: true,
  modalChildren: {},
};

const ModalReducer = (state, action) => {
  switch (action.type) {
    case "openModal":
      return {
        ...state,
        isModalOpen: true,
        modalChildren: action.modalChildren,
      };
    case "closeModal":
      return {
        ...state,
        isModalOpen: false,
      };
    case "refetchTopList":
      return {
        ...state,
        refetch: action.refetch,
      };
    default:
      return state;
  }
};

export const ModalContext = createContext(initialState);

export const ModalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ModalReducer, initialState);

  const openModal = (child) => {
    window.scrollTo(0, 0);
    dispatch({
      type: "openModal",
      modalChildren: child,
    });
  };

  const closeModal = () => {
    dispatch({
      type: "closeModal",
    });
  };

  const refetchTopList = () => {
    dispatch({
      type: "refetchTopList",
      refetch: !state.refetch,
    });
  };

  const value = {
    isModalOpen: state.isModalOpen,
    modalChildren: state.modalChildren,
    refetch: state.refetch,
    refetchTopList,
    openModal,
    closeModal,
  };
  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
