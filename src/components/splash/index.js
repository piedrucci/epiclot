import React, { Component } from 'react';
import { Image, AsyncStorage, KeyboardAvoidingView, BackHandler, BackAndroid, Platform, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import { View, Text } from 'react-native';
import { Spinner } from 'native-base';

class Splash extends Component {

   render() {
      if (this.props.visible) {
         return (
            <View>
               <Text>loading profile...</Text>
               <Spinner />
            </View>
         );
      }else {
         return (<View><Text></Text></View>)
      }

   }

}

export default Splash
