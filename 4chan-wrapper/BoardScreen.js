import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './utilityJs/styles';
import useFetchCatalogue from './utilityJs/fetchCatalogueData';

const BoardScreen = ({ route }) => {
  const { boardID } = route.params;
  const DEET = useFetchCatalogue(boardID);
  const navigation = useNavigation(); // Get navigation object

  // Flatten all threads into a single list
  const allThreads = DEET.flatMap(page => page.threads);

  return (
    <ScrollView style={[styles.container, { paddingTop: 20 }]}>  
      <View style={styles.listContainer}>
        {allThreads.map((thread) => (
          <TouchableOpacity
            key={thread.no}
            onPress={() => navigation.navigate('ThreadScreen', { threadNo: thread.no })}
          >
            <Text style={styles.threadText}>
              Thread No: {thread.no}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default BoardScreen;