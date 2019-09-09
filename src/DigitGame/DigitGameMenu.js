/**
 * [DigitGameInfo description]
 * Simply component to display game rules
 *  - slide open when the help btn is clicked
 */

import React from 'react';

class DigitGameMenu extends React.Component {
  render() {
   return (
     <div className='digit-game-menu'>
       <div>
         <button className='btn btn-lg btn-primary' onClick={this.props.goToGame}>Start Game</button>
       </div>
       <div>
         <button className='btn btn-lg btn-primary' onClick={this.props.goToSetting}>Setting</button>
       </div>
       <div>
         <button className='btn btn-lg btn-primary' type="button" data-toggle="modal" data-target="#aboutModal">About</button>
       </div>
       <div className="modal fade" id="aboutModal" tabIndex="-1" role="dialog" aria-labelledby="retireModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4>About this game</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div className="modal-body">

            </div>
            <button type="button" className="btn btn-secondary" data-dismiss="modal" id='retireModalCanel'>Close</button>
          </div>
        </div>
       </div>
     </div>
   );
  }
}

export default DigitGameMenu;
