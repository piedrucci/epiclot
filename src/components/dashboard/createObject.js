import React, { Component } from 'react'

import { View, Text } from 'react-native'
import { Content } from 'native-base'

import CreateCar from '../car/create'
import CreateProspect from '../prospect/create'

// ===========================================
import { connect } from 'react-redux';
// import * as carActions from '../../actions/carActions';
// import * as ProspectActions from '../../actions/prospectActions';
// ================================================

class CreateObject extends Component {
   constructor(props) {
      super(props)
      this.state = {
         activeModule: props.appGlobalParams.activeModule,
         renderedComponent: null,
         // prospect: props.ProspectInfo.prospect || null,
         // isNew: (typeof isNew === 'undefined'),
      }
   }

   componentDidMount() {


      if (this.state.activeModule === 'car') {
         this.setState({renderedComponent: <CreateCar />})
      } else if (this.state.activeModule === 'prospect'){
         this.setState({renderedComponent: <CreateProspect />})
      }
   }

   render() {
      return (
         <Content>
            {
               // renderedComponent
               this.state.renderedComponent
            }
         </Content>
      )
   }
}

const mapStateToProps = (state) => {
    return {
        appGlobalParams: state.appParams,
        ProspectInfo: state.prospectInfo,
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         activeModuleAction: (t) => dispatch(appActions.activeModule(t)),
//     };
// };

export default connect(mapStateToProps, null)(CreateObject)
