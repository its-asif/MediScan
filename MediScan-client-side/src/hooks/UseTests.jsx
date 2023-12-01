import { useEffect, useState } from "react";
import {
    useQuery
  } from '@tanstack/react-query'
import useAxiosSecure from "./useAxiosSecure";

const useTests = () => {

    const axiosSecure = useAxiosSecure();

    const {data : tests = [], isPending : testsLoading, refetch} = useQuery({
        queryKey: ['tests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/tests');
            return res.data;
        },
    })

    return [tests, refetch, testsLoading];
}

export default useTests;