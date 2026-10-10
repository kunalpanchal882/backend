import axios from "axios";
import { useContext, useEffect, useRef } from "react";
import Section from "../context/Context";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default function useApi() {
  const { accessToken, setaccessToken } = useContext(Section.store);
  const accessTokenRef = useRef(accessToken);

  useEffect(() => {
    accessTokenRef.current = accessToken;
  }, [accessToken]);

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use((config) => {
      if (accessTokenRef.current) {
        config.headers.Authorization = `Bearer ${accessTokenRef.current}`;
      } else {
        delete config.headers.Authorization;
      }

      return config;
    });

    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status !== 401 ||
          !originalRequest ||
          originalRequest._retry
        ) {
          return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
          const response = await axios.post(
            "/api/auth/refresh",
            {},
            { withCredentials: true },
          );
          const newAccessToken = response.data.accessToken;

          accessTokenRef.current = newAccessToken;
          setaccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        } catch (refreshError) {
          accessTokenRef.current = null;
          setaccessToken(null);
          return Promise.reject(refreshError);
        }
      },
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [setaccessToken]);

  return api;
}
