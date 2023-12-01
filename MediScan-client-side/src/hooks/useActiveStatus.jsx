import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useActiveStatus = () => {
    const {user, loading} = useAuth(); 
    const axiosSecure = useAxiosSecure();
    const {data : isActive, isPending : isActiveLoading} = useQuery({
        queryKey: [user?.email, 'isActive'],
        enabled: !loading ,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/active/${user?.email}`);
            return res.data?.isActive;
        },
    })
    return [isActive, isActiveLoading];
};

export default useActiveStatus;
