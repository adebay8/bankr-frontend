import axios from "axios";
import { getToken } from "./helper";
import { ActiveURL } from "./urls";

export const bankr = axios.create({
  baseURL: ActiveURL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});
