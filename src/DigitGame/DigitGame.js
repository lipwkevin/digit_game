/*jslint eqeq: true*/

import React from 'react';
import _ from 'lodash';

import DigitGameNumber from './DigitGameNumber'

const $ = window.$;

class DigitGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
  }
  getInitialState(){
    //get inital state without deep clone, for reseting
    var initialState = {
       safeCode: null,
       gamePlaying: true,
       input: [],
       result: [],
       resultDisplayed:'',
       trails: this.props.settings.maxTrail,
       codeLength:this.props.settings.codeLength,
    }
    return initialState;
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
    var resultDisplayed = (input.join('') === this.state.safeCode)?(this.props.settings.messages.successMessage):(this.props.settings.messages.errorMessage);
    if(resultDisplayed===this.props.settings.messages.successMessage){
        this.setState({gamePlaying: false});
    } else if(this.state.trails==0){
        resultDisplayed = this.props.settings.messages.gameOverMessage;
        this.setState({gamePlaying: false});
    } else {
        this.setState({trails:this.state.trails-1});
    }
    var result = this.checkSafeCodeResult(input,this.state.safeCode)
    var newInput = this.state.input;
    newInput.push(input)
    var newResult = this.state.result;
    newResult.push(result);
    this.props.updateGameHistory(newInput,newResult);
    this.setState({input:newInput,resultDisplayed:resultDisplayed,result:newResult });
  }
  checkSafeCodeResult(input,safeCode){
    var result = [];
    input.forEach((x, index) => {
      if((x.toString()) === safeCode[index]){
        result.push('correct')
      } else if (safeCode.includes(x)){
        result.push('close')
      } else {
        result.push('wrong')
      }
    })
    result = result.sort()
    return result;
  }
  resetSafeCode(){
    this.genereateSecretCode();
    this.setState(this.getInitialState())
    this.props.updateGameHistory([],[]);
    $("#retireModalCanel").click();
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
                 <span key={'dot-'+index} className='result-dot'><i className={"fa fa-circle "+((x==='correct')?('correct'):(((x==='close')?('close'):('wrong'))))+"-dot"}></i></span>
               ))}
             </div>
           )}
       </div>
       <div className='group-section'>
         <div className='digit-game-input-group'>
           {_.times(this.state.codeLength,(index) => (
               <DigitGameNumber
                 ref={'digit-'+index}
                 key={'digit-'+index}
                 disabled={!this.state.gamePlaying}
                 digit={(!_.isEmpty(this.state.input)?_.last(this.state.input)[index]:this.props.settings.minNum)}
                 minNum={this.props.settings.minNum}
                 maxNum={this.props.settings.maxNum}
               />
           ))}
         </div>
         <div className=''>
           <button className='btn btn-input btn-danger' type="button" data-toggle="modal" data-target="#retireModal">Reset</button>
           <button className='btn btn-input btn-primary' disabled={!this.state.gamePlaying} onClick={()=> this.checkSafeCode()}>Enter</button>
         </div>
       </div>
       <div className="modal fade" id="retireModal" tabIndex="-1" role="dialog" aria-labelledby="retireModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>You are about to give up all your progres</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" id='retireModalCanel'>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={()=> this.resetSafeCode()}>RESET</button>
            </div>
          </div>
        </div>
      </div>
     </div>
   );
  }
}
export default DigitGame;
