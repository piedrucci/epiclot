import { StyleSheet, Dimensions, Platform } from 'react-native';

const window = Dimensions.get('window');

export default StyleSheet.flatten({
    title: {
        marginTop: 50,
        margin: 50,
        color: '#393939',
        // fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center'
    },

    loginMsg: {
        // marginTop: 10,
        color: '#efefef',
        // fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical:'center',
        backgroundColor: '#003366',
        width: window.width
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'column',
        // backgroundColor:'#121212',
        // backgroundColor:'#34495e',
        // backgroundColor:'#efefef',
        marginTop:54
    },

    content: {
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },

    logo_image: {
        marginTop: 20,
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },

    input_default: {
        // backgroundColor:'white',
        color: '#393939',
        width: 250,
        // backgroundColor:'rgba(66,66,66,0.9)',
    },

    input_container: {
        marginTop: 10
    },

    buttonDefaut: {
      color: 'white',
      fontWeight: 'bold',
   },

    buttonPrincipal: {
        width:200,
        marginTop: 20,
        padding: 10,
        height: 45,
        // overflow: 'hidden',
        // backgroundColor: '#18baba',
        // justifyContent: 'center',
        // flex:1,
        // alignItems:'center'
    },

    buttonNext: {
      width: window.width,
      alignItems:'center',
      justifyContent:'center',
   },

    titleButtonNext: {
      color: (Platform.OS == "android") ? 'white' : 'black',
      fontWeight: 'bold',
   },

});
