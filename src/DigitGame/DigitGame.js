/*jslint eqeq: true*/

import React from 'react';
import _ from 'lodash';
import DigitDisplay from './DigitDisplay'
import './DigitGame.css';

const GREEN=2,YELLOW=1,GREY=0;
const MAX_TRAIL = 9;
const CODE_LENGTH = 4;
const SUCCESS_MESSAGE = 'Access Granted',ERROR_MESSAGE='ERROR !',GAMEOVER_MESSAGE='SYSTEM LOCKED';

class DigitGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       safeCode: null,
       gamePlaying: true,
       input: [],
       result: [],
       resultDisplayed:'',
       trails: MAX_TRAIL,
       codeLength:CODE_LENGTH,
    }
  }
  genereateSecretCode(){
    var arr = Array.from(Array(10).keys());
    var index;
    var value;
    var seq = ''
    for(var i = 0;i<this.state.codeLength;i++){
      index = _.random(0,arr.length-1)
      value = _.pullAt(arr,index)
      seq += value
    }
    this.setState({safeCode:seq})
    console.log(seq)
  }
  checkSafeCode(){
    var input = [];
    for (var key in this.refs) {
      input.push(this.refs[key].getDigit());
    }
    var resultDisplayed = (input.join('') === this.state.safeCode)?(SUCCESS_MESSAGE):(ERROR_MESSAGE);
    if(resultDisplayed===SUCCESS_MESSAGE){
        this.setState({gamePlaying: false});
    } else if(this.state.trails==0){
        resultDisplayed = GAMEOVER_MESSAGE;
        this.setState({gamePlaying: false});
    } else {
        this.setState({trails:this.state.trails-1});
    }
    this.checkSafeCodeResult(input,this.state.safeCode)
    this.setState({input:input,resultDisplayed:resultDisplayed });
  }
  checkSafeCodeResult(input,safeCode){
    var result = [];
    input.forEach((x, index) => {
      if((x.toString()) === safeCode[index]){
        result.push(GREEN)
      } else if (safeCode.includes(x)){
        result.push(YELLOW)
      } else {
        result.push(GREY)
      }
    })
    result = result.sort()
    this.setState({result:result});
  }
  resetSafeCode(){
    this.genereateSecretCode();
    this.setState({
      input: [0,0,0,0],
      result: [],
      trails: MAX_TRAIL,
      resultDisplayed:'',
      gamePlaying: true,
    })
  }
  componentDidMount(){
    this.genereateSecretCode();
  }
  render() {
   return (
     <div className='digit-game'>
       <h1>Digit Game</h1>
       <div className='group-section'>
         <p>Trails Remaining: {this.state.trails}</p>
         <div><input className='display-field' disabled value={this.state.resultDisplayed}></input></div>
         <div className='result-display-group'>
           {_.isEmpty(this.state.result)?(false):(<span>Result</span>)}
             {this.state.result.map((x,index)=>(
               <span key={'dot-'+index}className='result-dot'><i className={"fa fa-circle "+((x===GREEN)?('green'):(((x===YELLOW)?('yellow'):('grey'))))+"-dot"}></i></span>
             ))}
         </div>
       </div>
       <div className='group-section'>
         <div className='digit-game-input-group'>
           {_.times(this.state.codeLength,(index) => (
               <DigitDisplay ref={'digit-'+index} key={'digit-'+index} disabled={!this.state.gamePlaying} digit={this.state.input[index]||0}/>
           ))}
         </div>
         <div className=''>
           <button className='btn btn-input btn-danger' onClick={()=> this.resetSafeCode()}>Reset</button>
           <button className='btn btn-input btn-primary' disabled={!this.state.gamePlaying} onClick={()=> this.checkSafeCode()}>Enter</button>
         </div>
       </div>
     </div>
   );
  }
}
export default DigitGame;
