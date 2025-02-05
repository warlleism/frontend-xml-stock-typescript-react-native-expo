import useAxios from "axios-hooks";
import { useEffect } from "react";

export default function useGetCategory() {

    const [{ data, loading, error }, refetch] = useAxios('http://192.168.0.166:3000/category/get', { manual: true })

    useEffect(() => {
        refetch({ data: { delay: 2 } })
    }, [])

    return { data: data?.data, loading, error }
}