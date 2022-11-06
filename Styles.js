import {StyleSheet, Dimensions} from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '75%',
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#FAC6DA',
        borderColor: 'red',
        borderWidth: 1,
      },
      rowText: {
          fontSize: 20,
          marginLeft: 5,
          marginRight: 5,
      },
      navButton: {
          marginRight: 5,
          fontSize: 24,
          padding: 4,
      },
      newTask: {
        margin: 15,
        width: '100%',
        borderLeftWidth: 5, 
        borderColor: 'red',
        fontSize: 18,
        backgroundColor: '#FAC6DA',
        padding: 10,
    },
      switchContainer: {
        flexDirection: "row",
        alignItems: "center",
      },
      button: {
        marginTop: 15,
      },
      separator: {
        marginVertical: 8,
      },
});