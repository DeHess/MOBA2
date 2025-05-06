import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useFetchBoards from './utilityJs/fetchBoardData';
import styles from './utilityJs/styles';
import Icon from 'react-native-vector-icons/Ionicons';

const BoardScreen = () => {
  const navigation = useNavigation();
  const boards = useFetchBoards();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View
          style={[
            styles.headerContainer,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: 40,
            },
          ]}
        >
          <View style={{ flex: 1 }} />
          <Text style={[styles.header, { textAlign: 'center', flex: 2 }]}>
            4chan Boards
          </Text>
          <TouchableOpacity
            style={{ flex: 1, alignItems: 'flex-end', paddingRight: 5 }}
            onPress={() => navigation.navigate('Settings')}
          >
            <Icon name="settings-outline" size={28} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{ paddingTop: 20 }}
        >
          {boards.length > 0 ? (
            boards.map((board, index) => (
              <TouchableOpacity
                key={index}
                style={styles.item}
                onPress={() =>
                  navigation.navigate('BoardScreen', { boardID: board.board })
                }
              >
                <Text style={styles.itemText}>{board.title}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.loadingText}>Loading...</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default BoardScreen;
