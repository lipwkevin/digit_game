/*jslint eqeq: true*/

import React from 'react';
import _ from 'lodash';
import DigitDisplay from './DigitDisplay'
import './DigitGame.css';

const GREEN=2,YELLOW=1,GREY=0
class DigitGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       safeCode: null,
       gamePlaying: true,
       input: [0,0,0,0],
       result: [],
       resultDisplayed:'',
       trails: 0,
       codeLength:4,
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
  }
  checkSafeCode(){
    var input = [];
    for (var key in this.refs) {
      input.push(this.refs[key].getDigit());
    }
    var resultDisplayed = (input.join('') === this.state.safeCode)?('Access Granted'):('Wrong Combination');
    if(resultDisplayed='Access Granted'){
      this.setState({gamePlaying: false});
    }
    this.checkSafeCodeResult(input,this.state.safeCode)
    this.setState({trails:this.state.trails+1,input:input,resultDisplayed:resultDisplayed });
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
      trails: 0,
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
       <p>Number of trails: {this.state.trails}</p>
       <div>
         Input: <input disabled value={this.state.resultDisplayed}></input>
       </div>
       <div>
         Result
           {this.state.result.map((x,index)=>(
             <span key={'dot-'+index}className='result-dot'><i className={"fa fa-circle "+((x===GREEN)?('green'):(((x===YELLOW)?('yellow'):('grey'))))+"-dot"}></i></span>
           ))}
       </div>
       <div className='digit-game-input-group'>
         {_.times(this.state.codeLength,(index) => (
             <DigitDisplay ref={'digit-'+index} key={'digit-'+index} digit={this.state.input[index]||0}/>
         ))}
       </div>
       <div>
         <button onClick={()=> this.resetSafeCode()}>Reset</button>
         <button disabled={!this.state.gamePlaying} onClick={()=> this.checkSafeCode()}>Enter</button>
       </div>
     </div>
   );
  }
}
export default DigitGame;
