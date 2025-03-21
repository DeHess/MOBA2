import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from './utilityJs/styles';
import useFetchCatalogue from './utilityJs/fetchCatalogueData';

const BoardScreen = ({ route }) => {
  const { boardID } = route.params;
  const DEET = useFetchCatalogue(boardID);

  return (
    <ScrollView style={styles.container}>
      {DEET.map((page, pageIndex) => (
        <View key={pageIndex} style={styles.pageContainer}>
          <Text style={styles.pageTitle}>Page {page.page}</Text>
          {page.threads.map((thread) => (
            <Text key={thread.no} style={styles.threadText}>
              Thread No: {thread.no}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default BoardScreen;