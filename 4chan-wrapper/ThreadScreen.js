import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import styles from './utilityJs/styles';
import useFetchThread from './utilityJs/fetchThreadData';

const ThreadScreen = ({ route }) => {
  const { threadID, boardID } = route.params;
  const posts = useFetchThread(threadID, boardID);

  return (
    <ScrollView style={[styles.container, { paddingTop: 20, paddingHorizontal: 10 }]}>
      <View style={styles.listContainer}>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post, index) => {
            const imageUrl =
              post.filename && post.ext && post.tim
                ? `https://i.4cdn.org/${boardID}/${post.tim}${post.ext}`
                : null;

            return (
              <View
                key={index}
                style={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 4, // reduced rounding
                  padding: 10,
                  marginBottom: 10, // reduced space between posts
                  backgroundColor: '#f9f9f9',
                }}
              >
                <Text>{post.com}</Text>
                {imageUrl && (
                  <Image
                    source={{ uri: imageUrl }}
                    style={{ width: '100%', height: 250, marginTop: 10 }}
                    resizeMode="contain"
                  />
                )}
              </View>
            );
          })
        ) : (
          <Text>Loading</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ThreadScreen;
