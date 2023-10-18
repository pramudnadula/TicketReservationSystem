/* eslint-disable dot-notation */
import axios from "axios";

const apiPrefix = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
  baseURL: apiPrefix,
});

const axiosWithHeaders = () => {
  const token = localStorage.getItem("AccessToken");

  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
  }

  return axiosInstance;
};

const axiosWithoutHeaders = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
  delete axiosInstance.defaults.headers.common["Content-Type"];

  return axiosInstance;
};

const logoutAndRedirect = () => {
  localStorage.clear();
  window.location.href = "/login";
};

export const GET = async (url, useHeaders = true, params = null) => {
  try {
    const axiosClient = useHeaders ? axiosWithHeaders() : axiosWithoutHeaders();
    const config = { params };
    const response = await axiosClient.get(url, config);
    return response;
  } catch (error) {
    console.error("GET request error:", error);
    if (error.response && error.response.status === 401) {
      logoutAndRedirect();
    }
    throw error;
  }
};

export const POST = async (
  url,
  data,
  contentType = "application/json",
  useHeaders = true
) => {
  try {
    const axiosClient = useHeaders ? axiosWithHeaders() : axiosWithoutHeaders();
    const headers = { "Content-Type": contentType };
    const response = await axiosClient.post(url, data, { headers });
    return response;
  } catch (error) {
    console.error("POST request error:", error);
    if (error.response && error.response.status === 401) {
      logoutAndRedirect();
    }
    throw error;
  }
};

export const PUT = async (
  url,
  data,
  contentType = "application/json",
  useHeaders = true
) => {
  try {
    const axiosClient = useHeaders ? axiosWithHeaders() : axiosWithoutHeaders();
    const headers = { "Content-Type": contentType };
    const response = await axiosClient.put(url, data, { headers });
    return response;
  } catch (error) {
    console.error("PUT request error:", error);
    if (error.response && error.response.status === 401) {
      logoutAndRedirect();
    }
    throw error;
  }
};

export const DELETE = async (url, useHeaders = true) => {
  try {
    const axiosClient = useHeaders ? axiosWithHeaders() : axiosWithoutHeaders();
    const response = await axiosClient.delete(url);
    return response;
  } catch (error) {
    console.error("DELETE request error:", error);
    if (error.response && error.response.status === 401) {
      logoutAndRedirect();
    }
    throw error;
  }
};
