import axios from "axios";
import { getApiBaseUrl } from "../config/api";

const axiosPublic = axios.create({
    baseURL: getApiBaseUrl(),
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;