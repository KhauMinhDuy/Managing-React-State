import { useEffect, useState, useRef } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function equalsArray(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
}

export default function useFetchAll(urls) {
  const prevUrlsRef = useRef([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (equalsArray(prevUrlsRef.current, urls)) {
      setLoading(false);
      return;
    }
    prevUrlsRef.current = urls;
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
  }, [urls]);

  return { data, error, loading };
}
