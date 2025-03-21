import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useFetchBoards from './utilityJs/fetchBoardData';
import styles from './utilityJs/styles';


const BoardScreen = () => {
  const navigation = useNavigation();
  const boards = useFetchBoards();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>4chan Boards</Text>
      </View>
      <ScrollView style={styles.scrollView}>
      {boards.length > 0 ? (
          boards.map((board, index) => (
            <TouchableOpacity key={index} style={styles.item} onPress={() => navigation.navigate('BoardScreen', { boardID: board.board })}>
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

