import React from 'react';

class DigitGameHeader extends React.Component {
  render() {
   return (
     <div>
       {this.props.showBackBtn?(
         <div className='pull-left'>
           <button className="btn " onClick={this.props.backToMenu}>
             <i className="fa fa-chevron-left"></i>
          </button>
         </div>
       ):(false)}
       <h1>Digit Game</h1>
     </div>
   );
  }
}

export default DigitGameHeader;
