import { useState, useEffect } from "react";
export const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T|null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error|null>(null);

    const fetchData = async () => {
        try{
            setLoading(true);
            setError(null);
            const res = await fetchFunction();
            setData(res);
        } catch (error) {
            setLoading(false);
            setError(error instanceof Error? error: new Error('Error fetching data'));
            setData(null);
        } finally {
            setLoading(false);
        }
    }

    const reset = () => {
        setLoading(false);
        setError(null);
        setData(null);
    }
    useEffect(() => {
        if(autoFetch){
            fetchData();
        }
    }, []);

    return {data, error, loading, fetchData, reset};
}