import React from 'react';
import _ from 'lodash';

import DigitGameCore from './DigitGameCore';
import DigitGameHistory from './DigitGameHistory';
import DigitGameInfo from './DigitGameInfo';

class DigitGameGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       gameHistory:{},
    }
  }
  updateGameHistory(input,result){
    //check if history is being reset
    var gameHistory = (_.isEmpty(input)&& _.isEmpty(result))?({}):({input: input,result: result});
    this.setState({
      gameHistory: gameHistory
    })
  }
  render() {
   return (
       <div className='digit-game-container'>
         <DigitGameCore
           updateGameHistory={this.updateGameHistory.bind(this)}
           settings={this.props.settings}
         />
         <div>
           <DigitGameHistory
             gameHistory={this.state.gameHistory}
             codeLength={this.props.settings.codeLength}
           />
           <DigitGameInfo />
         </div>
       </div>
   );
  }
}

export default DigitGameGame;
