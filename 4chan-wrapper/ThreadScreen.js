import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from './utilityJs/styles';
import useFetchThread from './utilityJs/fetchThreadData';

const Thread = ({ route }) => {
  const { threadID } = route.params;
  const threadData = useFetchThread(threadID);

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

export default ThreadScreen;