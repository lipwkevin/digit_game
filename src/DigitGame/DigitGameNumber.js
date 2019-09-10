import React from 'react';
import PropTypes from 'prop-types';

class DigitGameNumber extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       digit: this.props.digit,
       disabled: this.props.disabled,
    }
  }
  updateDigit(modifier){
    var newDigit = this.state.digit + modifier;
    //to make sure number is not out of bounds
    newDigit = (newDigit >this.props.maxNum) ?(this.props.minNum):(
      newDigit < this.props.minNum ? (this.props.maxNum) : (newDigit)
    )
    this.setState({digit:newDigit})
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
