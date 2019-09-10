import React from 'react';

import DigitGameHeader from './DigitGameHeader';
import DigitGameGame from './DigitGameGame';
import DigitGameMenu from './DigitGameMenu';
import DigitGameSetting from './DigitGameSetting';
import './DigitGame.sass';

const MAX_TRAIL = 9; // maximum number of trails allowed
const CODE_LENGTH = 4; // length of combination
const MIN_NUM = 0, MAX_NUM = 9; //min and max number on dial
// const INDICATORS = {correct:2,close:1,wrong:0};
const MESSAGES = {successMessage:'Access Granted',errorMessage:'ERROR !',gameOverMessage:'SYSTEM LOCKED'}; //displayed message

const GAME_STATE = {MENU:'menu',SETTING:'setting',GAMING:'gaming'}

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
       currentState:GAME_STATE.MENU,
       settings:defaultSettings,
    }
  }
  backToMenu(){
    this.setState({currentState:GAME_STATE.MENU});
  }
  goToSetting(){
    this.setState({currentState:GAME_STATE.SETTING});
  }
  goToGame(){
    this.setState({currentState:GAME_STATE.GAMING});
  }
  updateSettings(settings){
    this.setState({settings:settings});
  }
  render() {
   return (
     <div>
       <DigitGameHeader
         showBackBtn = {this.state.currentState!==GAME_STATE.MENU}
         backToMenu = {this.backToMenu.bind(this)}
       />
       {{
         [GAME_STATE.MENU]:(
           <DigitGameMenu
             goToSetting = {this.goToSetting.bind(this)}
             goToGame = {this.goToGame.bind(this)}
           />
         ),
         [GAME_STATE.SETTING]:(
           <DigitGameSetting
             backToMenu = {this.backToMenu.bind(this)}
             updateSettings = {this.updateSettings.bind(this)}
           />
         ),
         [GAME_STATE.GAMING]:(
           <DigitGameGame
              settings = {this.state.settings}
           />
         ),
       }[this.state.currentState]}
     </div>
   );
  }
}

export default DigitGameContainer;
