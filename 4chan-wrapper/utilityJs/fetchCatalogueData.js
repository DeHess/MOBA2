import { useEffect, useState } from 'react';

const useFetchCatalogue = (boardID) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      console.log('Fetching data...');
      const url = `https://a.4cdn.org/${boardID}/catalog.json`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setPages(json)
      } catch (error) {
        console.error(error.message);
      }
    };

    getData();
  }, []);

  return pages;
};

export default useFetchCatalogue;
