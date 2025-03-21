import { useEffect, useState } from 'react';





const useFetchBoards = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const getData = async () => {
      console.log('Fetching data...');
      const url = 'https://a.4cdn.org/boards.json';
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setBoards(json.boards);
      } catch (error) {
        console.error(error.message);
      }
    };

    getData();
  }, []);

  return boards;
};

export default useFetchBoards;
