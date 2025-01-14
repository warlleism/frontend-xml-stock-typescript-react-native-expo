import useAxios from "axios-hooks";
import { useEffect, useState } from "react";

export default function useGetCategory() {
    const [xmlForm, setXmlForm] = useState<boolean>(false);

    const [{ data, loading, error }, refetch] = useAxios('http://192.168.0.166:3000/product/getCategory', { manual: true })

    useEffect(() => {
        refetch({ data: { delay: 2 } })
    }, [])

    return { data, loading, error, xmlForm, setXmlForm }
}