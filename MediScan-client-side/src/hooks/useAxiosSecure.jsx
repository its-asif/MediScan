import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import { getApiBaseUrl } from "../config/api";

const axiosSecure = axios.create({
    baseURL: getApiBaseUrl(),
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();

    useEffect(() => {
        const requestInterceptor = axiosSecure.interceptors.request.use(function(config) {
            const token = localStorage.getItem('access-token');
            config.headers.authorization = `Bearer ${token}`;
            return config;
        }, function(error) {
            return Promise.reject(error);
        });

        const responseInterceptor = axiosSecure.interceptors.response.use(async function(response) {
            return response;
        }, async function(error) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                localStorage.removeItem('access-token');
                await logout();
                navigate('/');
            }
            return Promise.reject(error);
        });

        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [logout, navigate]);
    

    return axiosSecure;
};

export default useAxiosSecure;