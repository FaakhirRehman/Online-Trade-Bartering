import React from 'react';
import './Style.css';

/**
* @author
* @function Card
**/

export const Card = (props) => {
  return(
    <div className='card'
        {...props}
    >
        {props.children}
    </div>
   )

 }

 export default Card;