import { Linking } from 'react-native';

const openBoardLink = (boardId) => {
  const boardUrl = `https://boards.4chan.org/${boardId}/`;
  Linking.openURL(boardUrl).catch(err => console.error("Couldn't load page", err));
};

export default openBoardLink;
