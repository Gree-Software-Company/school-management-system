import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:3400",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    //   Authorization: `Bearer ${token}`,
  },
});
