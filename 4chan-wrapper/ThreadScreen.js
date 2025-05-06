import React, { useContext } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { ThemeContext } from './utilityJs/ThemeContext'; // Import ThemeContext
import getStyles from './utilityJs/styles'; // Import getStyles function
import useFetchThread from './utilityJs/fetchThreadData';

const ThreadScreen = ({ route }) => {
  const { threadID, boardID } = route.params;
  const { theme } = useContext(ThemeContext); // Get current theme
  const styles = getStyles(theme); // Apply theme-aware styles
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
                  borderColor: theme.border,
                  borderRadius: 4, // reduced rounding
                  padding: 10,
                  marginBottom: 10, // reduced space between posts
                  backgroundColor: theme.cardBackground,
                }}
              >
                <Text style={{ color: theme.text }}>{post.com}</Text>
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
          <Text style={{ color: theme.text }}>Loading</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ThreadScreen;
