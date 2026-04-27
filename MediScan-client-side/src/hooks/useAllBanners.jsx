import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAllBanners = () => {
    const axiosSecure = useAxiosSecure();   

    const {data : banners = [], isPending : bannersLoading, refetch} = useQuery({
            queryKey: ['banners'],
            queryFn: async () => {
                const res = await axiosSecure.get('/banners');
                const data = res.data.map(banner => {
                    return {
                        _id: banner._id,
                        title: banner.title,
                        couponCode: banner.couponCode,
                        discountRate: banner.discountRate,
                        active: banner.active,
                    }    
                })
                // return res.data;
            },
        })
        console.log(banners);

    return [banners, refetch, bannersLoading];
};

export default useAllBanners;