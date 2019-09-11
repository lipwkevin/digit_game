/**
 * [DigitGameHistory description]
 * A component to display user's previous inputs and results
 */

import React from 'react';
import _ from 'lodash';

const INPUT_SFX_LOCATION = process.env.PUBLIC_URL + "/input.mp3";

class DigitGameResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       resultDisplayed:this.props.resultDisplayed,
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props!==prevProps){
      this.setState({resultDisplayed:this.props.resultDisplayed})
    }
  }
  runAnimation(input,result,returnFunction){
    console.log(returnFunction)
    var audioCount = 1;
    var inputAudio = new Audio(INPUT_SFX_LOCATION);
    inputAudio.addEventListener('ended', function () {
      audioCount++;
      if(audioCount<=input.length){
        inputAudio.currentTime = 0;
        inputAudio.play();
        this.setState({
          resultDisplayed:input.substring(0,audioCount)
        })
      } else {
        this.setState({
          resultDisplayed:result
        })
        returnFunction()
      }
    }.bind(this), false)
    inputAudio.play();
  }
  render() {
   return (
     <div className='digit-game-result-section'>
       <div className='group-section'>
         <p>Trails Remaining: {this.props.trails}</p>
         <div><input className='display-field' disabled value={this.state.resultDisplayed}></input></div>
           {_.isEmpty(this.props.result)?(false):(
             <div className='result-display-group'>
               <span>Result</span>
               {(this.props.result).map((x,index)=>(
                 <span key={'dot-'+index} className='result-dot'><i className={"fa fa-circle "+((x==='correct')?('correct'):(((x==='close')?('close'):('wrong'))))+"-dot"}></i></span>
               ))}
             </div>
           )}
       </div>
     </div>
   );
  }
}

export default DigitGameResult;
