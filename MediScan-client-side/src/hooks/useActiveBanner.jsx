import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useActiveBanner = () => {
    const axiosSecure = useAxiosSecure();

    const {data : activeBanner = [], isPending : activeBannerLoading, refetch} = useQuery({
        queryKey: ['activeBanner'],
        queryFn: async () => {
            const res = await axiosSecure.get('/banners/active');
            return res.data;
        },
    })

    return [activeBanner, refetch, activeBannerLoading];
};

export default useActiveBanner;