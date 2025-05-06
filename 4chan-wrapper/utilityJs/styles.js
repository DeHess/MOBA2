import { StyleSheet } from 'react-native';

const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: theme.background,
    },
    headerContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.cardBackground,
      paddingVertical: 15,
      alignItems: 'center',
      flexDirection: 'row',  // Add this line
      elevation: 4,
      shadowColor: theme.border,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      zIndex: 10,
    },
    header: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.headerText,
    },
    scrollView: {
      marginTop: 60,
      paddingHorizontal: 20,
      backgroundColor: theme.background,
    },
    item: {
      backgroundColor: theme.itemBackground,
      padding: 15,
      marginVertical: 5,
      borderRadius: 8,
    },
    itemText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: theme.text,
    },
    loadingText: {
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
      color: theme.text,
    },
    pageContainer: {
      marginBottom: 20,
      padding: 10,
      backgroundColor: theme.cardBackground,
      borderRadius: 10,
      shadowColor: theme.border,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    pageTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 5,
      color: theme.text,
    },
    threadText: {
      fontSize: 16,
      marginLeft: 10,
      color: theme.text,
    },
  });

export default getStyles;
