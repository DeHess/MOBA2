import { useEffect, useState } from 'react';

const useFetchThread = () => {
  const [thread, setThread] = useState("");

  useEffect(() => {
    const getData = async () => {
      console.log('Fetching data...');
      const url = 'https://a.4cdn.org/po/thread/570368.json';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setThread(JSON.stringify(json, null, 2));
      } catch (error) {
        console.error(error.message);
      }
    };

    getData();
  }, []);

  return thread;
};

export default useFetchThread;