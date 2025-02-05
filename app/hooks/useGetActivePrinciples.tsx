import useAxios from "axios-hooks";
import { useEffect } from "react";

export default function useGetActivePrinciples() {

    const [{ data, loading, error }, refetch] = useAxios('http://192.168.0.167:3000/active/get', { manual: true })

    useEffect(() => {
        refetch({ data: { delay: 2 } })
    }, [])

    return { data: data?.data, loading, error }
}