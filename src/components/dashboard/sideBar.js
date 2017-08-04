import React, { Component } from 'react'
import {
  Text,
} from 'react-native';

// import styles from './styles';
import {Content} from 'native-base';

class SideBar extends Component {
   render() {
      return (
         <Content style={{backgroundColor:'#FFFFFF'}}>
            <Text>Drawer</Text>
          </Content>
      )
   }
}

export default SideBar
