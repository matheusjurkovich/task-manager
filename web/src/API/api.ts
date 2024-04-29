import axios from "axios";

export const api = axios.create({
  baseURL: "http://jurkotask.up.railway.app:3333",
});