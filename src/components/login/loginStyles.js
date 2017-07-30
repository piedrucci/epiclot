import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export default StyleSheet.flatten({
    title: {
        // marginTop: 50,
        // margin: 50,
        color: '#393939',
        fontSize: 22,
        fontWeight: 'bold',
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
        // backgroundColor:'#efefef',
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

    input_default: {
      flex:1,
        // backgroundColor:'white',
        color: '#393939',
        // backgroundColor:'rgba(66,66,66,0.9)',
    },

    input_container: {
        marginTop: 10
    },

    buttonPrincipal: {
        width:300,
        marginTop: 20,
        padding: 10,
        height: 45,
        overflow: 'hidden',
        // backgroundColor: '#18baba',
        justifyContent: 'center',
        alignItems: 'center',
    },

});
