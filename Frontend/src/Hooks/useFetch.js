import { useState, useEffect, useCallback } from "react";

export const useFetch = (initialUrl = null, initialOptions = {}) => {
  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);
  const [trigger, setTrigger] = useState(0);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Funktion du kan kalde for at lave et nyt fetch.
  const doFetch = useCallback((fetchUrl, fetchOptions = {}) => {
    setUrl(fetchUrl);
    setOptions(fetchOptions);
    setTrigger((prev) => prev + 1); // Kør en ny request.
  }, []);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, options);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json().catch(() => null);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [trigger]); // Kør fetch når trigger ændres.

  return { data, loading, error, doFetch };
};
