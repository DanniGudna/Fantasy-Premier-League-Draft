/* eslint-disable quotes */
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001/", // Todo add a env file for this
  // baseURL: "https://fpl-server.glitch.me/",

  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
});

export default instance;
