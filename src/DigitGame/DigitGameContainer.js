import React from 'react';

import DigitGame from './DigitGame';
import DigitGameHistory from './DigitGameHistory';
import DigitGameInfo from './DigitGameInfo';
import './DigitGame.css';

import _ from 'lodash';

const MAX_TRAIL = 9;
const CODE_LENGTH = 4;
const MIN_NUM = 0, MAX_NUM = 9;
const INDICATORS = {correct:2,close:1,wrong:0};
const MESSAGES = {successMessage:'Access Granted',errorMessage:'ERROR !',gameOverMessage:'SYSTEM LOCKED'};

class DigitGameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       gameHistory:{},
       settings:{
         maxTrail:MAX_TRAIL,
         codeLength:CODE_LENGTH,
         minNum: MIN_NUM,
         maxNum: MAX_NUM,
         messages: MESSAGES,
         indicators: INDICATORS
       }
    }
  }
  updateGameHistory(input,result){
    var gameHistory;
    if(_.isEmpty(input)&& _.isEmpty(result)){
      gameHistory = {};
    } else {
      gameHistory =  {input: input,result: result};
    }
    this.setState({
      gameHistory: gameHistory
    })
  }
  render() {
   return (
     <div className='digit-game-container'>
       <DigitGame
         updateGameHistory={this.updateGameHistory.bind(this)}
         settings={this.state.settings}
       />
       <div>
         <DigitGameHistory
           gameHistory={this.state.gameHistory}
           codeLength={CODE_LENGTH}
         />
         <DigitGameInfo />
       </div>
     </div>
   );
  }
}

export default DigitGameContainer;
