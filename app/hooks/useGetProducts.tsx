import useAxios from "axios-hooks";
import { useEffect, useState } from "react";

export default function useGetProducts() {

    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(20);
    const [{ data, loading, error }, refetch] = useAxios(`http://192.168.0.166:3000/product/get?page=${page}&pagesize=${pagesize}`, { manual: true })

    useEffect(() => {
        refetch({ data: { delay: 0 } })
    }, [page])

    return { data: data, loading, error, page, pagesize, setPagesize, setPage }
}