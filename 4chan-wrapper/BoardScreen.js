import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './utilityJs/styles';
import useFetchCatalogue from './utilityJs/fetchCatalogueData';
import he from 'he';

const { width: screenWidth } = Dimensions.get('window'); // get screen width

const BoardScreen = ({ route }) => {
  const { boardID } = route.params;
  const DEET = useFetchCatalogue(boardID);
  const navigation = useNavigation(); 

  const allThreads = DEET.flatMap(page => page.threads);

  return (
    <ScrollView style={[styles.container, { paddingTop: 20 }]}>  
      <View style={styles.listContainer}>
        {allThreads.map((thread) => {
          const rawTitle = thread.sub || 'Untitled Thread';
          const decodedTitle = he.decode(rawTitle);
          const title = decodedTitle.length > 30 ? decodedTitle.slice(0, 30) + '…' : decodedTitle;

          const { filename, ext, tim } = thread;
          const hasImage = tim && ext;
          const thumbUrl = hasImage ? `https://i.4cdn.org/${boardID}/${tim}s.jpg` : null;
          const fullUrl = hasImage ? `https://i.4cdn.org/${boardID}/${tim}${ext}` : null;


          return (
            <TouchableOpacity
              key={thread.no}
              onPress={() => navigation.navigate('ThreadScreen', { threadID: thread.no, boardID })}
              style={{ marginBottom: 20 }}
            >
              <Text style={[styles.threadText, { fontWeight: 'bold' }]}>
                {title}
              </Text>

              {hasImage && (
                <Image
                  source={{ uri: thumbUrl }} //or fullURL but is slow
                  style={{
                    width: screenWidth - 40, 
                    height: 200, 
                    marginTop: 8,
                    borderRadius: 12,
                    alignSelf: 'center',
                  }}
                  resizeMode="cover"
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default BoardScreen;
