import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAllBanners = () => {
    const axiosSecure = useAxiosSecure();   

    const {data : banners = [], isPending : bannersLoading, refetch} = useQuery({
            queryKey: ['banners'],
            queryFn: async () => {
                const res = await axiosSecure.get('/banners');
                return res.data;
            },
        })

    return [banners, refetch, bannersLoading];
};

export default useAllBanners;