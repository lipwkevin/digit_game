/*eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';

const SFX_LOCATION = process.env.PUBLIC_URL + "/clicking.wav";

class DigitGameNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       digit: this.props.digit,
       disabled: this.props.disabled,
    }
    this.audio = new Audio(SFX_LOCATION);
  }
  updateDigit(modifier){
    var newDigit = this.state.digit;
    do{
      newDigit = newDigit + modifier;
      //to make sure number is not out of bounds
      newDigit = (newDigit >this.props.maxNum) ?(this.props.minNum):(
        newDigit < this.props.minNum ? (this.props.maxNum) : (newDigit)
      )
    } while ((!this.props.canRepeat) && (this.props.currentInputs.indexOf(newDigit)!=-1))
    this.playAudio()
    this.props.updateParentState(newDigit,this.props.index)
    // this.setState({digit:newDigit})
  }
  playAudio(){
    this.audio.currentTime = 0 //reset audio sfx
    this.audio.play();
  }
  getDigit(){
    return this.state.digit;
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props!==prevProps){
      this.setState({digit:this.props.digit,disabled:this.props.disabled})
    }
  }
  render() {
   return (
     <div className='digit-display'>
       <div>
         <button disabled={this.state.disabled} className='btn btn-sm btn-primary' onClick={() => this.updateDigit(1)}>
           <i className="fa fa-sort-up"></i>
         </button>
       </div>
       <div>
         <span>{this.state.digit}</span>
       </div>
       <div>
         <button disabled={this.state.disabled} className='btn btn-sm btn-primary' onClick={() => this.updateDigit(-1)}>
           <i className="fa fa-sort-down"></i>
         </button>
       </div>
     </div>
   );
  }
}

export default DigitGameNumber;

DigitGameNumber.propTypes = {
  digit: PropTypes.number
};
