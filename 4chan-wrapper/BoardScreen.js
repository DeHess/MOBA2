import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from './utilityJs/styles';
import useFetchCatalogue from './utilityJs/fetchCatalogueData';

const BoardScreen = ({ route }) => {
  const { boardID } = route.params;
  const DEET = useFetchCatalogue(boardID);

  // Flatten all threads into a single list
  const allThreads = DEET.flatMap(page => page.threads);

  return (
    <ScrollView style={[styles.container, { paddingTop: 20 }]}>  
      <View style={styles.listContainer}>
        {allThreads.map((thread) => (
          <Text key={thread.no} style={styles.threadText}>
            Thread No: {thread.no}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default BoardScreen;