import axios from "axios";
import { useEffect, useState } from "react";

export interface Product {
    categoryid: number;
    createdAt: string;
    description: string;
    dosage: string;
    id: number;
    laboratory: string;
    name: string;
    price: number;
    principleactiveid: number;
    quantity: number;
    requiresPrescription: string;
    updatedAt: string;
}

interface Pagination {
    page: number;
    total: number;
    totalPages: number;
}

interface ApiResponse {
    data: Product[];
    pagination: Pagination;
}

export default function useGetProducts() {

    const [page, setPage] = useState(1);
    const [pagesize, setPagesize] = useState(20);
    const [data, setData] = useState<ApiResponse | null>(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        axios.get(`http://192.168.0.167:3000/product/get?page=${page}&pagesize=${pagesize}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [page])

    return { data, setData, error, page, pagesize, setPagesize, setPage, loading, setLoading }
}