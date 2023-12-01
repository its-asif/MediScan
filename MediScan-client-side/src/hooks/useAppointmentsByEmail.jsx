import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useAppointmentsByEmail = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    
    const { data : appointments = [], isLoading, error, refetch } = useQuery({
        queryKey: ['appointments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            return res.data;
        }
    });
    
    return [ appointments, refetch ];
};

export default useAppointmentsByEmail;