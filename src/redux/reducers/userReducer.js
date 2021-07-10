import { SET_USER, SET_USER_WALLET } from "../types";

const initialState = {};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...action.payload };
    default:
      return state;
  }
};

export const userWalletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_WALLET:
      return { ...action.payload };
    default:
      return state;
  }
};
