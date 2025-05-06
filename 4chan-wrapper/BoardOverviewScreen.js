import React, { useContext } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from './utilityJs/ThemeContext'; // Import ThemeContext
import getStyles from './utilityJs/styles'; // Import getStyles function
import useFetchBoards from './utilityJs/fetchBoardData';
import Icon from 'react-native-vector-icons/Ionicons';

const BoardScreen = () => {
  const { theme } = useContext(ThemeContext); // Get current theme
  const styles = getStyles(theme); // Apply theme-aware styles
  const navigation = useNavigation();
  const boards = useFetchBoards();

  return (
    <View style={styles.container}>
<View style={styles.headerContainer}>
  <View style={{ flex: 1.05 }} />
  <Text style={[styles.header, { textAlign: 'center' }]}>
    4chan Boards
  </Text>
  <TouchableOpacity
    style={{ flex: 1, alignItems: 'flex-end', paddingRight: 5 }}
    onPress={() => navigation.navigate('Settings')}
  >
    <Icon name="settings-outline" size={28} color={theme.text} />
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
  );
};

export default BoardScreen;
