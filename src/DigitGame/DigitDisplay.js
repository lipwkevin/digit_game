import React from 'react';


class DigitDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       digit: this.props.digit,
    }
  }
  updateDigit(modifier){
    var newDigit = this.state.digit + modifier;
    newDigit = (newDigit >=10) ?(0):(
      newDigit < 0 ? (9) : (newDigit)
    )
    this.setState({digit:newDigit})
  }
  getDigit(){
    return this.state.digit;
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props!==prevProps){
      this.setState({digit:this.props.digit})
    }
  }
  render() {
   return (
     <div className='digit-display'>
       <div>
         <button className='btn btn-sm btn-primary' onClick={() => this.updateDigit(1)}>
           <i className="fa fa-sort-up"></i>
         </button>
       </div>
       <div>
         <span>{this.state.digit}</span>
       </div>
       <div>
         <button className='btn btn-sm btn-primary' onClick={() => this.updateDigit(-1)}>
           <i className="fa fa-sort-down"></i>
         </button>
       </div>
     </div>
   );
  }
}

export default DigitDisplay;
