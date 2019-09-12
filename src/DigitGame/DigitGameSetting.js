/*eslint-disable */

import React from 'react';
import _ from 'lodash';

class DigitGameSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxTrail:this.props.currentSettings.maxTrail,
      codeLength:this.props.currentSettings.codeLength,
      minNum: this.props.currentSettings.minNum,
      maxNum: this.props.currentSettings.maxNum,
      successMessage:this.props.currentSettings.messages.successMessage,
      errorMessage:this.props.currentSettings.messages.errorMessage,
      gameOverMessage:this.props.currentSettings.messages.gameOverMessage,
      error:{}
    }
  }
  updateState(key,event){
    var value = event.target.value;
    switch(key){
      case 'maxTrail':
      case 'codeLength':
      case 'minNum':
      case 'maxNum':
        value = parseInt(value.replace(/\D/,''));
        break;
    }
    this.setState({ [key]: value });
  }
  updateSettings(){
    //requires error checking code
    var error = {}
    if((this.state.maxNum - this.state.minNum)<this.state.codeLength){
      error.digitRange = 'Not enough digits to generate sequence';
    }
    if(_.isEmpty(error)){

      this.props.updateSettings({
        maxTrail:this.state.maxTrail,
        codeLength:this.state.codeLength,
        minNum: this.state.minNum,
        maxNum: this.state.maxNum,
        messages:{
          successMessage:this.state.successMessage,
          errorMessage:this.state.errorMessage,
          gameOverMessage:this.state.gameOverMessage,
        }
      })
      this.setState({error:error})
      // this.props.backToMenu();
    } else {
      console.log(error)
      this.setState({error:error})
    }
  }
  setToDefault(){
    this.setState({
      maxTrail:this.props.defaultSettings.maxTrail,
      codeLength:this.props.defaultSettings.codeLength,
      minNum: this.props.defaultSettings.minNum,
      maxNum: this.props.defaultSettings.maxNum,
      successMessage:this.props.currentSettings.messages.successMessage,
      errorMessage:this.props.currentSettings.messages.errorMessage,
      gameOverMessage:this.props.currentSettings.messages.gameOverMessage,
      error:{}
    })
  }
  render() {
    console.log(this.state)
   return (
     <div className='digit-game-setting'>
       <div className='group-section game-setting-input'>
         <div className='container-fluid'>
           <div className='row'>
             <div className='col-12'>
               <div className="form-row">
                 <div className="form-group col-md-6">
                   <label className='w-100'>
                     Chance:
                     <input
                       className="form-control"
                       type="text" pattern="[0-9]"
                       value={this.state.maxTrail}
                       onChange={this.updateState.bind(this,'maxTrail')}
                     />
                   </label>
                 </div>
                 <div className="form-group col-md-6">
                   <label className='w-100'>
                     Sequence Length
                     <input
                       className="form-control"
                       type="text" pattern="[0-9]"
                       value={this.state.codeLength}
                       onChange={this.updateState.bind(this,'codeLength')}
                     />
                   </label>
                 </div>
                 <div className="form-group col-md-6">
                   <label className={'w-100 '+(this.state.error.digitRange?('text-danger'):(''))}>
                     Smallest Digit
                     <input
                       className={"form-control"+(this.state.error.digitRange?(' is-invalid'):(''))}
                       type="text" pattern="[0-9]"
                       value={this.state.minNum}
                       onChange={this.updateState.bind(this,'minNum')}
                     />
                   </label>
                   {this.state.error.digitRange?(
                     <div className="text-danger digit-setting-error"><p>{this.state.error.digitRange}</p></div>
                   ):(false)}
                 </div>
                 <div className="form-group col-md-6">
                   <label className={'w-100 '+(this.state.error.digitRange?('text-danger'):(''))}>
                     Largest Digit
                     <input
                       className={"form-control"+(this.state.error.digitRange?(' is-invalid'):(''))}
                       type="text" pattern="[0-9]"
                       value={this.state.maxNum}
                       onChange={this.updateState.bind(this,'maxNum')}
                     />
                   </label>
                 </div>
               </div>
             </div>
             <div className='col-12'>
               <div className="form-group col-md-12">
                 <label className={(this.state.error.messages?('text-danger'):(''))}>Success Message</label>
                 <input
                   className={"form-control"+(this.state.error.messages?(' is-invalid'):(''))}
                   type="text"
                   value={this.state.successMessage}
                   onChange={this.updateState.bind(this,'successMessage')}
                 />
                 {this.state.error.messages?(
                   <div className="text-danger digit-setting-error"><p>{this.state.error.messages}</p></div>
                 ):(false)}
               </div>
               <div className="form-group col-md-12">
                 <label className={(this.state.error.messages?('text-danger'):(''))}>Failed Message</label>
                 <input
                   className={"form-control"+(this.state.error.messages?(' is-invalid'):(''))}
                   type="text"
                   value={this.state.errorMessage}
                   onChange={this.updateState.bind(this,'errorMessage')}
                 />
                 {this.state.error.messages?(
                   <div className="text-danger digit-setting-error"><p>{this.state.error.messages}</p></div>
                 ):(false)}
               </div>
               <div className="form-group col-md-12">
                 <label className={(this.state.error.messages?('text-danger'):(''))}>Game Over Message</label>
                 <input
                   className={"form-control"+(this.state.error.messages?(' is-invalid'):(''))}
                   type="text"
                   value={this.state.gameOverMessage}
                   onChange={this.updateState.bind(this,'gameOverMessage')}
                 />
                 {this.state.error.messages?(
                   <div className="text-danger digit-setting-error"><p>{this.state.error.messages}</p></div>
                 ):(false)}
               </div>
             </div>
           </div>
         </div>
          <button className='btn btn-md btn-primary btn-control-btn' onClick={this.setToDefault.bind(this)}>Default</button>
       </div>
       <div>
         <button className='btn btn-lg btn-secondary btn-control-btn' onClick={this.props.backToMenu}>Back</button>
         <button className='btn btn-lg btn-primary btn-control-btn' onClick={this.updateSettings.bind(this)}>Save</button>
       </div>
     </div>
   );
  }
}

export default DigitGameSetting;
