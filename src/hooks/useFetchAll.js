import { useEffect, useState } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetchAll(urls) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const promisses = urls.map((url) => {
      return fetch(baseUrl + url).then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      });
    });
    Promise.all(promisses)
      .then((json) => setData(json))
      .catch((err) => {
        console.log(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, error, loading };
}
