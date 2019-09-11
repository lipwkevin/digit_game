/**
 * [DigitGameHistory description]
 * A component to display user's previous inputs and results
 */

import React from 'react';

class DigitGameHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       historyInput:[],
       historyResult:[]
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(this.props!==prevProps){
      this.setState({historyInput:(this.props.gameHistory.input||[]),historyResult:(this.props.gameHistory.result||[])})
    }
  }
  render() {
   return (
     <div className='digit-game-history-section'>
       <div className='group-section'>
          <h3>Previous Inputs</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Input</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
            {this.state.historyInput.map((input,index)=>(
              <tr className='result-entry' key={'result-'+index}>
                <th scope="row">{input.join('')}</th>
                <td>
                  {this.state.historyResult[index].map((x,index2)=>(
                    <span key={'result-'+index+'-dot-'+index2}className='result-dot'><i className={"fa fa-circle "+((x==='correct')?('correct'):(((x==='close')?('close'):('wrong'))))+"-dot"}></i></span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       </div>
     </div>
   );
  }
}

export default DigitGameHistory;
