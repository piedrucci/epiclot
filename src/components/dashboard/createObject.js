import React, { Component } from 'react'

import { View, Text } from 'react-native'
import { Content } from 'native-base'

import CreateCar from '../car/create'
import CreateProspect from '../prospect/create'

// ===========================================
import { connect } from 'react-redux';
import * as carActions from '../../actions/carActions';
// ================================================

class CreateObject extends Component {
   constructor(props) {
      super(props)
      this.state = {
         addType: this.props.appGlobalParams.addType,
         prospect: props.prospect || null,
      }
   }

   render() {
//    ==============================    RENDERIZADO CONDICIONAL DEL COMPONENTE
      let renderedComponent =  null ;

      if (this.state.addType == 'car') {
         renderedComponent = <CreateCar />;
      } else if (this.state.addType == 'prospect'){
         renderedComponent = <CreateProspect prospect={this.state.prospect} />;
      }
//    =========================================================================

      return (
         <Content>
            {renderedComponent}
         </Content>
      )
   }
}

const mapStateToProps = (state) => {
    return {
        appGlobalParams: state.appParams,
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         addTypeAction: (t) => dispatch(appActions.addType(t)),
//     };
// };

export default connect(mapStateToProps, null)(CreateObject)
