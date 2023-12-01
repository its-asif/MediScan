import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://medi-scan-server.vercel.app/',
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logout} = useAuth();

    
    axiosSecure.interceptors.request.use( function(config){
        const token = localStorage.getItem('access-token');
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function(error){
        return Promise.reject(error);
    });

    // intercepts 401 and 403 status 
    axiosSecure.interceptors.response.use( async function(response){
        // console.log(response);
        return response;
    }, async function (error){
         console.log("error =>", error);
        if(error.response.status === 401 || error.response.status === 403){
            localStorage.removeItem('access-token');
            // await logout();
            // navigate('/login');
            navigate('/');      
        }
        return Promise.reject(error);
    })
    

    return axiosSecure;
};

export default useAxiosSecure;