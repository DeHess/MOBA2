import React from 'react';
import { View, Text } from 'react-native';
import styles from './utilityJs/styles';
import useFetchCatalogue from './utilityJs/fetchCatalogueData';


const BoardScreen = ({ route }) => {
  const { boardID } = route.params;
  const DEET = useFetchCatalogue(boardID);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{DEET}</Text>
    </View>
  );
};

export default BoardScreen;
