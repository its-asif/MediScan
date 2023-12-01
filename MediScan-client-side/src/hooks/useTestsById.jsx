import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useTestsById = (id) => {
    const axiosPublic = useAxiosPublic();

    const {data : test = [], refetch} = useQuery({
        queryKey: ['tests', id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/tests/${id}`);
            return data;
        }
    });

    return [test, refetch];
};

export default useTestsById;