// hooks/useFetch.ts
import { useState, useEffect } from 'react';

const useFetch = (url: string, flag: string, flag2: string, options: RequestInit = {}) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Starting the run")
    const fetchData = async () => {
      setIsLoading(true);
      const startTime = performance.now();
      try {
        const response = await fetch(url, options);
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
        const endTime = performance.now();
        console.log(`Time taken: ${endTime - startTime} milliseconds`);
      }
    };

    fetchData();
  }, [url, flag, flag2]);

  return { data, error, isLoading };
};

export default useFetch;
