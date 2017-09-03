import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export default StyleSheet.flatten({
   container: {
      flex: 1,
      flexDirection:'row',
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor:'#efefef',
   },

    footerContainer: {
        backgroundColor: '#003366',
    },

    footerMessage: {
        color: '#efefef',
        // fontWeight: 'bold',
        fontSize: 16,
        textAlignVertical:'center',
    },

    formInput: {
      color: '#393939',
   },

    title: {
      // marginTop: 50,
      // margin: 50,
      color: '#575757',
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center'
   },

    subtitle: {
      // marginTop: 50,
      // margin: 50,
      color: '#505050',
      // fontSize: 22,
      // fontWeight: 'bold',
      textAlign: 'center'
   },


    content: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },

    logo_image: {
        marginTop: 20,
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },


    input_container: {
        marginTop: 10
    },

    loginButton: {
        width:300,
        marginTop: 20,
        padding: 10,
        height: 45,
        overflow: 'hidden',
        alignSelf:'center',
    },

});
