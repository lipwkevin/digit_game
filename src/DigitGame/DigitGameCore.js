/*jslint eqeq: true*/

import React from 'react';
import _ from 'lodash';

import DigitGameResult from './DigitGameResult'
import DigitGameNumber from './DigitGameNumber'

const $ = window.$;

class DigitGameCore extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState();
    // this.inputAudio = new Audio(INPUT_SFX_LOCATION);
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
    var arr = _.range(this.props.settings.minNum, this.props.settings.maxNum);
    var seq = ''
    for(var i = 0;i<this.state.codeLength;i++){
      //pop one random digit from arraylist, prevent getting a repeaeted number
      seq += _.pullAt(arr,_.random(0,arr.length-1))
    }
    this.setState({safeCode:seq})
    console.log(seq)
  }
  checkSafeCode(){
    var input = [];
    for (var key in this.refs) {
      if(this.refs[key].constructor.name=="DigitGameNumber"){
        input.push(this.refs[key].getDigit());
      }
    }
    //check input verses secret code
    var resultDisplayed = (input.join('') === this.state.safeCode)?(this.props.settings.messages.successMessage):(this.props.settings.messages.errorMessage);
    if(resultDisplayed===this.props.settings.messages.successMessage){//wining logic
        this.setState({gamePlaying: false});
    } else if(this.state.trails===0){//gameover logic
        resultDisplayed = this.props.settings.messages.gameOverMessage;
        this.setState({gamePlaying: false});
    } else {
        this.setState({trails:this.state.trails-1});
    }
    var newInput = this.state.input;
    newInput.push(input)
    this.setState({input:newInput});
    var result = this.checkSafeCodeResult(input,this.state.safeCode)
    var updateFunction = function(){
      //update input and result history

      var newResult = this.state.result;
      newResult.push(result);
      this.props.updateGameHistory(newInput,newResult);//pass the new history to parent
      this.setState({input:newInput,resultDisplayed:resultDisplayed,result:newResult });
    }.bind(this)
    this.refs.resultPanel.runAnimation(input.join(''),resultDisplayed,updateFunction)
  }
  checkSafeCodeResult(input,safeCode){ //compare secret code with input
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
    return result.sort();
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
       <DigitGameResult
         ref = 'resultPanel'
         resultDisplayed = {this.state.resultDisplayed}
         trails = {this.state.trails}
         result = {_.last(this.state.result)}
       />
       <div className='group-section digit-game-input-group'>
         <div className='digit-game-digit-group'>
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
export default DigitGameCore;
