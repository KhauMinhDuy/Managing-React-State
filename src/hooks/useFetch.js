import { useEffect, useState, useRef } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const isMountedRef = useRef(false);

  // useEffect(() => {
  //   getProducts("shoes")
  //     .then((response) => setProducts(response))
  //     .catch((err) => setError(err))
  //     .finally(() => setLoading(false));
  // }, []);

  useEffect(() => {
    isMountedRef.current = true;
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const json = await response.json();
          if (isMountedRef.current) setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        if (isMountedRef.current) setError(e);
      } finally {
        if (isMountedRef.current) setLoading(false);
      }
    }
    init();
  }, [url]);

  return { data, error, loading };
}

export default useFetch;
