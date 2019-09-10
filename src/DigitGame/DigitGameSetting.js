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
      messages: this.props.currentSettings.messages,
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
      error.push('System will not able to generate sequence');
    }
    if(_.isEmpty(error)){
      this.props.updateSettings(this.state)
      this.props.backToMenu();
    } else {
      this.setState({error:error})
    }
  }
  setToDefault(){
    this.setState({
      maxTrail:this.props.defaultSettings.maxTrail,
      codeLength:this.props.defaultSettings.codeLength,
      minNum: this.props.defaultSettings.minNum,
      maxNum: this.props.defaultSettings.maxNum,
      messages: this.props.defaultSettings.messages,
      error:{}
    })
  }
  render() {
   return (
     <div className='digit-game-setting'>
       <div className='group-section game-setting-input'>
         <div className='container-fluid'>
           <div className='row'>
             <div className='col-6'>
               <div className="form-group">
                 <label>
                   Chance:
                   <input
                     className="form-control"
                     type="text" pattern="[0-9]"
                     value={this.state.maxTrail}
                     onChange={this.updateState.bind(this,'maxTrail')}
                   />
                 </label>
               </div>
             </div>
             <div className='col-6'>
               <div className="form-group">
                 <label>
                   Sequence Length
                   <input
                     className="form-control"
                     type="text" pattern="[0-9]"
                     value={this.state.codeLength}
                     onChange={this.updateState.bind(this,'codeLength')}
                   />
                 </label>
               </div>
             </div>
             <div className='col-6'>
               <div className="form-group">
                 <label>
                   Smallest Digit
                   <input
                     className="form-control"
                     type="text" pattern="[0-9]"
                     value={this.state.minNum}
                     onChange={this.updateState.bind(this,'minNum')}
                   />
                 </label>
               </div>
             </div>
             <div className='col-6'>
               <div className="form-group">
                 <label>
                   Largest Digit
                   <input
                     className="form-control"
                     type="text" pattern="[0-9]"
                     value={this.state.maxNum}
                     onChange={this.updateState.bind(this,'maxNum')}
                   />
                 </label>
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
