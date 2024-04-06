import { useEffect, useState } from 'react';
const {VITE_API_URL, VITE_API_KEY} = import.meta.env;
interface UseFetchOptions<T> {
  method?: 'GET' | 'POST';
  body?: T; // Generic type for body data
  headers?: HeadersInit; // Allows specifying headers
}

function useFetch<T, U = undefined>(url: string | undefined, options?: UseFetchOptions<U>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!url) {
      setIsLoading(false);
      setData(null);
      return;
    }
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${VITE_API_URL}/${url}`, {
          method: options?.method || 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': VITE_API_KEY,
            ...options?.headers,
          },
          body: options?.method === 'POST' ? JSON.stringify(options.body) : undefined,
        });

        if (!response.ok) {
          throw new Error('Apologies but we could not load new cats for you at this time! Miau!');
        }

        const data: T = await response.json();
        setData(data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return { data, isLoading, error };
}

export default useFetch;
