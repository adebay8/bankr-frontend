import axios from "axios";
import { ActiveURL } from "./urls";

export const bankr = axios.create({
  baseURL: ActiveURL,
  headers: {
    Authorization: `Bearer `,
    "Content-Type": "application/json",
  },
});
