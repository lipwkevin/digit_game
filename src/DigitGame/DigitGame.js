/*jslint eqeq: true*/

import React from 'react';
import _ from 'lodash';
import DigitDisplay from './DigitDisplay'
import './DigitGame.css';

const GREEN=2,YELLOW=1,GREY=0;
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
       trails: this.props.maxTrail,
       codeLength:this.props.codeLength,
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
    var result = this.checkSafeCodeResult(input,this.state.safeCode)
    var newInput = this.state.input;
    newInput.push(input)
    var newResult = this.state.result;
    newResult.push(result);
    this.props.updateHistory(newInput,newResult);
    this.setState({input:newInput,resultDisplayed:resultDisplayed,result:newResult });
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
    return result;
  }
  resetSafeCode(){
    this.genereateSecretCode();
    this.setState({
      input: [],
      result: [],
      trails: this.props.maxTrail,
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
           {_.isEmpty(this.state.result)?(false):(
             <div className='result-display-group'>
               <span>Result</span>
               {_.last(this.state.result).map((x,index)=>(
                 <span key={'dot-'+index} className='result-dot'><i className={"fa fa-circle "+((x===GREEN)?('green'):(((x===YELLOW)?('yellow'):('grey'))))+"-dot"}></i></span>
               ))}
             </div>
           )}
       </div>
       <div className='group-section'>
         <div className='digit-game-input-group'>
           {_.times(this.state.codeLength,(index) => (
               <DigitDisplay ref={'digit-'+index} key={'digit-'+index} disabled={!this.state.gamePlaying} digit={(!_.isEmpty(this.state.input)?_.last(this.state.input)[index]:0)}/>
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
