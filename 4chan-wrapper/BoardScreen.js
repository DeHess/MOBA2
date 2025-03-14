import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const BoardScreen = () => {
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
        setBoards(json.boards); // Store the boards array in state
      } catch (error) {
        console.error(error.message);
      }
    };

    getData();
  }, []);

  const openBoardLink = (boardId) => {
    const boardUrl = `https://boards.4chan.org/${boardId}/`;
    Linking.openURL(boardUrl).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>4chan Boards</Text>
      </View>
      <ScrollView style={styles.scrollView}>
      {boards.length > 0 ? (
          boards.map((board, index) => (
            <TouchableOpacity key={index} style={styles.item} onPress={() => openBoardLink(board.board)}>
              <Text style={styles.itemText}>{board.title}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingVertical: 15,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    marginTop: 60,
    paddingHorizontal: 20,
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default BoardScreen;
