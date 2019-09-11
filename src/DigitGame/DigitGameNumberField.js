import React from 'react';
import _ from 'lodash';

import DigitGameNumber from './DigitGameNumber'

class DigitGameNumberField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       inputs:[],
    }
  }
  getDigits(){
    var input = [];
    for (var key in this.refs) {
      if(this.refs[key].constructor.name=="DigitGameNumber"){
        input.push(this.refs[key].getDigit());
      }
    }
    return input;
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props!==prevProps){
      this.setState({inputs:this.props.inputs})
    }
  }
  render() {
   return (
     <div className='digit-game-digit-group'>
       {_.times(this.props.codeLength,(index) => (
           <DigitGameNumber
             ref={'digit-'+index}
             key={'digit-'+index}
             disabled={!this.props.gamePlaying}
             digit={this.state.inputs[index]||this.props.settings.minNum}
             minNum={this.props.settings.minNum}
             maxNum={this.props.settings.maxNum}
           />
       ))}
     </div>
   );
  }
}

export default DigitGameNumberField;
