import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './utilityJs/styles';
import useFetchCatalogue from './utilityJs/fetchCatalogueData';

const BoardScreen = ({ route }) => {
  const { boardID } = route.params;
  const DEET = useFetchCatalogue(boardID);
  const navigation = useNavigation(); 

  const allThreads = DEET.flatMap(page => page.threads);

  return (
    <ScrollView style={[styles.container, { paddingTop: 20 }]}>  
      <View style={styles.listContainer}>
        {allThreads.map((thread) => {
        const rawTitle = thread.sub || 'Untitled';
        const title = rawTitle.length > 30 ? rawTitle.slice(0, 50) + '…' : rawTitle;

        return (
          <TouchableOpacity
            key={thread.no}
            onPress={() => navigation.navigate('ThreadScreen', { threadID: thread.no, boardID })}
          >
            <Text style={styles.threadText}>
              {title}
            </Text>
          </TouchableOpacity>
        );
        })}
      </View>
    </ScrollView>
  );
};

export default BoardScreen;