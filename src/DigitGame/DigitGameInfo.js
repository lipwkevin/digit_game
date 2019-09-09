/**
 * [DigitGameInfo description]
 * Simply component to display game rules
 *  - slide open when the help btn is clicked
 */

import React from 'react';

class DigitGameInfo extends React.Component {
  render() {
   return (
     <div>
       <button className="btn btn-outline-secondary help-btn" type="button" data-toggle="collapse" data-target="#infoSection" aria-expanded="false" aria-controls="infoSection">
         <i className="fa fa-question-circle"></i>
      </button>
      <div className='collapse'  id="infoSection">
         <div className='digit-game-info '>
           <div className='group-section'>
             <h4>About</h4>
             <p></p>
             <p>Your goal is to find the secert combination within a limited trails.</p>
             <p>The trick is to understand the meaning of the results. Each dot represent a number you've input, without indicating which digit</p>
             <p><span className='result-dot'><i className="fa fa-circle green-dot"></i></span>number is the correct digit</p>
             <p><span className='result-dot'><i className="fa fa-circle yellow-dot"></i></span>number is in the combination but wrong location</p>
             <p><span className='result-dot'><i className="fa fa-circle grey-dot"></i></span>number is not in the sequence</p>
           </div>
         </div>
      </div>
     </div>
   );
  }
}

export default DigitGameInfo;
