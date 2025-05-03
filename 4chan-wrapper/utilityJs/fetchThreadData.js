import { useEffect, useState } from 'react';

const useFetchThread = (threadID, boardID) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      console.log(`Fetching data for thread ID: ${threadID}`);
      const url = `https://a.4cdn.org/${boardID}/thread/${threadID}.json`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        setPosts(json.posts);
      } catch (error) {
        console.error(error.message);
      }
    };

    getData();
  }, [threadID]); // Re-fetch if threadID changes

  return posts;
};

export default useFetchThread;
