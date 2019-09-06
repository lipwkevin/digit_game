import React from 'react';

import DigitGame from './DigitGame';
import DigitGameHistory from './DigitGameHistory';

// const GREEN=2,YELLOW=1,GREY=0;
const MAX_TRAIL = 9;
const CODE_LENGTH = 4;
// const SUCCESS_MESSAGE = 'Access Granted',ERROR_MESSAGE='ERROR !',GAMEOVER_MESSAGE='SYSTEM LOCKED';

class DigitGameContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       historyInput:[],
       historyResult:[]
    }
  }
  updateHistory(input,result){
    this.setState({
      historyInput: input,
      historyResult: result
    })
  }
  render() {
   return (
     <div className='digit-game-container'>
       <DigitGame
         updateHistory={this.updateHistory.bind(this)}
         maxTrail={MAX_TRAIL}
         codeLength={CODE_LENGTH}
       />
       <DigitGameHistory
         historyInput={this.state.historyInput}
         historyResult={this.state.historyResult}
         codeLength={CODE_LENGTH}
       />
     </div>
   );
  }
}

export default DigitGameContainer;
