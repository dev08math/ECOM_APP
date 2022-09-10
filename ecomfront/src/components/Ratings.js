import React from 'react'

function Ratings({value, text, color}) {
    const star = [1,2,3,4,5]
  return (
    <div className='rating'>
    {star.map(id => (
        <span key={id}>
            <i style={{color}} className={ value >= id ? 'fas fa-star' :
                                           value >= id - 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'} ></i>
        </span>
    ))}
    <span>{text}</span> 
    </div>
  )
}

export default Ratings