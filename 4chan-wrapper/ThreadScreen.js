import React, { useContext, useMemo } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { ThemeContext } from './utilityJs/ThemeContext'; // Import ThemeContext
import getStyles from './utilityJs/styles'; // Import getStyles function
import useFetchThread from './utilityJs/fetchThreadData';
import { decode } from 'html-entities'; // Import library to decode HTML entities

const ThreadScreen = ({ route }) => {
  const { threadID, boardID } = route.params;
  const { theme } = useContext(ThemeContext); // Get current theme
  const styles = getStyles(theme); // Apply theme-aware styles
  const posts = useFetchThread(threadID, boardID);

  // Organize posts so replies appear under their referenced post
  const structuredPosts = useMemo(() => {
    if (!Array.isArray(posts) || posts.length === 0) return [];

    const postMap = new Map();
    const sortedPosts = [];

    posts.forEach(post => {
      if (post?.no) {
        postMap.set(post.no, { ...post, replies: [] });
      }
    });

    posts.forEach(post => {
      if (post?.com) {
        const match = post.com.match(/#p(\d+)/); // Extract referenced post number
        if (match) {
          const parentNo = parseInt(match[1], 10);
          if (postMap.has(parentNo)) {
            postMap.get(parentNo).replies.push(post);
            return; // Prevent duplicate entry in sorted list
          }
        }
        sortedPosts.push(postMap.get(post.no));
      }
    });

    return sortedPosts;
  }, [posts]);

  // Function to clean and decode HTML content
  const cleanPostText = (text) => {
    if (!text) return ''; 
    const strippedText = text.replace(/<a href="#p\d+" class="quotelink">.*?<\/a><br>/g, ''); // Remove href links
    return decode(strippedText); // Decode HTML entities
  };

  return (
    <ScrollView style={[styles.container, { paddingTop: 20, paddingHorizontal: 10 }]}>
      <View style={styles.listContainer}>
        {structuredPosts.length > 0 ? (
          structuredPosts.map((post, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              {/* Original post */}
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.border,
                  borderRadius: 4,
                  padding: 10,
                  backgroundColor: theme.cardBackground,
                }}
              >
                <Text style={{ color: theme.text }}>{cleanPostText(post.com)}</Text>
                {post.filename && post.ext && post.tim && (
                  <Image
                    source={{ uri: `https://i.4cdn.org/${boardID}/${post.tim}${post.ext}` }}
                    style={{ width: '100%', height: 250, marginTop: 10 }}
                    resizeMode="contain"
                  />
                )}
              </View>

              {/* Replies (Indented) */}
              {post.replies.length > 0 &&
                post.replies.map((reply, replyIndex) => (
                  <View
                    key={replyIndex}
                    style={{
                      marginTop: 5,
                      marginLeft: 15, // Indent replies
                      borderWidth: 1,
                      borderColor: theme.border,
                      borderRadius: 4,
                      padding: 8,
                      backgroundColor: theme.cardBackground,
                    }}
                  >
                    <Text style={{ color: theme.text }}>{cleanPostText(reply.com)}</Text>
                    {reply.filename && reply.ext && reply.tim && (
                      <Image
                        source={{ uri: `https://i.4cdn.org/${boardID}/${reply.tim}${reply.ext}` }}
                        style={{ width: '100%', height: 200, marginTop: 10 }}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                ))}
            </View>
          ))
        ) : (
          <Text style={{ color: theme.text }}>Loading...</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ThreadScreen;
