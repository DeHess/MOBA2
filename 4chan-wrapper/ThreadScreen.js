import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from './utilityJs/styles';
import useFetchThread from './utilityJs/fetchThreadData';


const ThreadScreen = ({ route }) => {
  const { threadID, boardID } = route.params;
  const posts = useFetchThread(threadID, boardID);

  return (
    <ScrollView style={[styles.container, { paddingTop: 20 }]}>  
      <View style={styles.listContainer}>
        
          <Text>
          {JSON.stringify(posts, null, 2)}
          </Text>
        
      </View>
    </ScrollView>
  );
};

export default ThreadScreen;