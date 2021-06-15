import axios from "axios";
import { USER_TOKEN } from "./helper";
import { ActiveURL } from "./urls";

const token = localStorage.getItem(USER_TOKEN);

export const bankr = axios.create({
  baseURL: ActiveURL,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  },
});
