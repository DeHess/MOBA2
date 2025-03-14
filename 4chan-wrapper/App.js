import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

const ResultScreen = () => {
  const [data, setData] = useState(null);

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
        setData(JSON.stringify(json, null, 2)); // Convert JSON to readable string
      } catch (error) {
        console.error(error.message);
        setData('Error fetching data');
      }
    };

    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>4Chan Wrapper</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>{data ? data : 'Loading...'}</Text>
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
    elevation: 4, // Shadow effect for Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 10, // Keeps it above scrollable content
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  scrollView: {
    marginTop: 60, // Pushes content below fixed header
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 14,
    color: '#333',
    paddingBottom: 20, // Prevent content from being cut off at the bottom
  },
});

export default ResultScreen;
