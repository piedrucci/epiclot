import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');
import colors from '../colors';

export default StyleSheet.flatten({
  // Bar Search--------------------------------
  barInputStyle: {
    backgroundColor: colors.white,
    fontFamily: 'Helvetica',
    color: colors.text,
    fontWeight: '100',
    fontSize: 15,
    borderRadius: 0,
    margin: 5
  },
  barContainerStyle:
  {
    backgroundColor: colors.grayLight,
    borderBottomWidth: 0,

  },
  // Text--------------------------------

  centered: {
    textAlign: 'center'
  },
  textLeft: {
    textAlign: 'left',
  },
  textRight: {
    textAlign: 'right',
  },
  textJustify: {
    textAlign: 'justify',
  },
  textWhite: {
    color: 'white',
    fontFamily: 'Helvetica'
  },
  textBlack: {
    color: 'black',
    fontFamily: 'Helvetica',
  },
  textLink: {
    color: colors.link,
  },
  textBold: {
    fontWeight: 'bold',
  },
  fontWeightSmall: {
    fontWeight: '100',
  },
  textVeryXsmall: {
    fontSize: 8,
  },
  textVerySmall: {
    fontSize: 10,
  },
  textXxsmall: {
    fontSize: 13,
  },
  textXsmall: {
    fontSize: 15,
  },
  textSmall: {
    fontSize: 17,
  },
  textMedium: {
    fontSize: 18,
  },
  textSMedium: {
    fontSize: 30,
  },
  textBig: {
    fontSize: 26,
  },

  textVeryBig: {
    fontSize: 36,
  },
  textPrincipal: {
    fontFamily: 'Helvetica',
    color: colors.principal
  },
  text: {
    fontFamily: 'Helvetica',
    color: colors.text_color,
  },
  fontFamily: {
    fontFamily: 'Helvetica',
  },
  textCursive: {
    fontStyle: 'italic',
  },
  textGray: {
    fontFamily: 'Helvetica',
    color: colors.grayLighter,
  },
  // Container------------------------------------
  containerWhite:{
    flex: 1,
    backgroundColor: colors.white,
  },
  containerBlack:{
    flex: 1,
    backgroundColor: colors.background_dark,
  },
  containerPrincipal:{
    flex: 1,
    backgroundColor: colors.principal,
  },
  containerGrayLight:{
    flex: 1,
    backgroundColor: colors.grayLight,
  },
  containerGrayLighter:{
    flex: 1,
    backgroundColor: colors.gray_medium,
  },

  flex: {
    flex: 1
  },
  noFlex: {
    flex: 0
  },
  row: {
    flexDirection: 'row',
  },
  alignSelfstretch: {
    alignSelf: 'stretch',
  },
  column: {
    flexDirection: 'column',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsFlexStart: {
    alignItems: 'flex-start'
  },
  alignItemsFlexEnd: {
    alignItems: 'flex-end'
  },
  spaceAround: {
    flexDirection:'row',
    justifyContent:'space-around',
    alignSelf: 'stretch',
    alignItems: 'flex-end',
  },
  containerColumnCenter: {
    flexDirection: 'column',
    justifyContent:'space-around',
    alignSelf: 'stretch',
    alignItems: 'flex-end',

  },
  center: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
   middleOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  // Input-----------------------------------
  buttonPrincipal: {
    padding: 10,
    height: 45,
    overflow: 'hidden',
    backgroundColor: colors.button_principal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonPrincipal: {
    fontSize: 15,
    fontFamily: 'Helvetica',
    color: colors.text_button_principal,
    fontWeight: '400',
  },
  buttonSecondary: {
    padding: 10,
    height: 45,
    overflow: 'hidden',
    backgroundColor: colors.button_secondary,
    marginBottom: 10,
    justifyContent: 'center'
  },
  textButtonSecondary: {
    fontFamily: 'Helvetica',
    color: colors.text_button_secondary,
    fontWeight: "400",
  },
  //GALLERY
  containerGalleryHorizontal: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: colors.black,
    opacity: 0.8,
  },
  containerImageGallerySmall: {
    justifyContent: 'center',
    margin: 5,
    padding: 5,
    width: height / 8,
    height: height / 8,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.grayLight
  },
  imageSmall: {
    height: height / 9,
    width: height / 9,
  },
  containerImageGalleryBig: {
    justifyContent: 'center',
    margin: 5,
    padding: 5,
    width: height / 2,
    height: height / 2,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.grayLight
  },
  imageGalleryBig: {
    height: (height / 2) -20,
    width: (height / 2) -20,
    resizeMode: 'contain'
  },
  //message
  message: {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center',
    backgroundColor: colors.grayLight,
    padding: 10,
    margin: 40,
  },
  //logo
  logo: {
    width: width,
    height: 100,
    resizeMode: 'contain',
  },

});
