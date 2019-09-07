import React from 'react';
import _ from 'lodash';

import DigitGame from './DigitGame';
import DigitGameHistory from './DigitGameHistory';
import DigitGameInfo from './DigitGameInfo';
import './DigitGame.css';

const MAX_TRAIL = 9; // maximum number of trails allowed
const CODE_LENGTH = 4; // length of combination
const MIN_NUM = 0, MAX_NUM = 9; //min and max number on dial
// const INDICATORS = {correct:2,close:1,wrong:0};
const MESSAGES = {successMessage:'Access Granted',errorMessage:'ERROR !',gameOverMessage:'SYSTEM LOCKED'}; //displayed message

const defaultSettings = { // default settings
  maxTrail:MAX_TRAIL,
  codeLength:CODE_LENGTH,
  minNum: MIN_NUM,
  maxNum: MAX_NUM,
  messages: MESSAGES,
  // indicators: INDICATORS
}
class DigitGameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       gameHistory:{},
       settings:defaultSettings,
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
       {/* {<style></style>} */}
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
