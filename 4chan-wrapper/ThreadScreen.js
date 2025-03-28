import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from './utilityJs/styles';
import useFetchThread from './utilityJs/fetchThreadData';

const ThreadScreen = ({ route }) => {
  const { threadID } = route.params;
  const threadData = useFetchThread(threadID);

  return (
    <ScrollView style={[styles.container, { paddingTop: 20 }]}>  
      <View style={styles.listContainer}>
        
          <Text>
            {threadData}
          </Text>
        
      </View>
    </ScrollView>
  );
};

export default ThreadScreen;