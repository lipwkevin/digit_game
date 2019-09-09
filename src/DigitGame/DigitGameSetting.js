/**
 * [DigitGameInfo description]
 * Simply component to display game rules
 *  - slide open when the help btn is clicked
 */

import React from 'react';

class DigitGameSetting extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
   return (
     <div>
       SETTING MENU
       <div>
         <button className='btn btn-lg btn-primary pull-left' onClick={this.props.goToGame}>Default Setting</button>
       </div>
       <div>
         <button className='btn btn-lg btn-primary' onClick={this.props.backToMenu}>Back</button>
         <button className='btn btn-lg btn-primary' onClick={this.props.backToMenu}>Confirm</button>
       </div>
     </div>
   );
  }
}

export default DigitGameSetting;
