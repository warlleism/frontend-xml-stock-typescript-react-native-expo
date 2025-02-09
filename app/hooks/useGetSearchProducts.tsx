import axios from "axios";
import { useState } from "react";

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

export default function useGetSearchProducts() {

    const [loading, setLoading] = useState<boolean>(false);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

    let timeoutId: NodeJS.Timeout | null = null;

    const getSearchProducts = async (name: string) => {

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(async () => {
            setLoading(true);
            const response = await axios.get(`http://192.168.0.167:3000/product/getSearch?name=${name}`);
            setLoading(false);
            setFilteredProducts(response.data.data);
        }, 500);

    }


    return { loading, setLoading, filteredProducts, getSearchProducts }
}