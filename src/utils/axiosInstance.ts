//--- Librerías externas ---//
import axios from "axios";

//--- Archivos locales ---//
import { BASE_URL } from "./apiPaths";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 80000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//----- Interceptor para manejar errores globalmente -----//
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 403) {
      console.warn("Acceso denegado.");
    }

    return Promise.reject(error);
  }
);
