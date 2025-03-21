import { useEffect, useState } from 'react';

const useFetchCatalogue = (boardID) => {
  const [jsonOutput, setJsonOutput] = useState("");

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
        setJsonOutput(JSON.stringify(json, null, 2))
      } catch (error) {
        console.error(error.message);
      }
    };

    getData();
  }, []);

  return jsonOutput;
};

export default useFetchCatalogue;
