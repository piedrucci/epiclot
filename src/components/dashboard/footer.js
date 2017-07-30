import React, { Component } from 'react';
import { Footer, FooterTab, Button, Icon } from 'native-base';

import { Actions } from 'react-native-router-flux';

const ACTIVE_TAB = {
    CARS: 'cars',
    INFO: 'info'
}

export default class DashboardFooter extends Component {

    constructor() {
        super();
        this.state = {
            activeTabName: ACTIVE_TAB.CARS
        }
    }

    tabAction(tab) {
        try{
            if ( tab === ACTIVE_TAB.CARS ) {
                this.setState({activeTabName:tab});
                Actions.carList();
            }else if ( tab === ACTIVE_TAB.INFO ){
                this.setState({activeTabName:tab})
                Actions.userInfo();
            }
        }catch(err){
            alert(err)
        }
    }

    render() {

        return (

            <Footer>
                <FooterTab>
                    <Button active={(this.state.activeTabName===ACTIVE_TAB.CARS?true:false)} onPress={ () => { this.tabAction(ACTIVE_TAB.CARS) } } >
                        <Icon name='ios-car' />
                        {/* <Text>Cars List</Text> */}
                    </Button>
                    <Button active={(this.state.activeTabName===ACTIVE_TAB.INFO?true:false)} onPress={ () => { this.tabAction(ACTIVE_TAB.INFO) } } >
                        <Icon name='ios-information-circle' />
                    </Button>
                </FooterTab>
            </Footer>

        );

    }

}
