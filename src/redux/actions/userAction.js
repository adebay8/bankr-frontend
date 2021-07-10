import { SET_USER, SET_USER_WALLET } from "../types";

export const actionSetUser = (payload) => (dispatch) =>
  dispatch({
    type: SET_USER,
    payload,
  });

export const actionSetUserWallet = (payload) => (dispatch) => {
  dispatch({
    type: SET_USER_WALLET,
    payload,
  });
};
