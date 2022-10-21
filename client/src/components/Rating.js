import React from 'react'
import propTypes from 'prop-types'
const Rating = ({ value, text, color }) => {
    return (
        <div className='rating'>
            {/* THIS LOGIC IS USED TO MAKE THE STAR BASED ON RATINGS PROVIDED IN JSON DATA */}
            <span>
                <i style={{ color }} className={value >= 1 ? 'fas fa-star' : value >= 0.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{ color }}
                    className={
                        value >= 2
                            ? 'fas fa-star'
                            : value >= 1.5
                                ? 'fas fa-star-half-alt'
                                : 'far fa-star'}
                ></i>
            </span>
            <span>
                <i style={{ color }} className={value >= 3 ? 'fas fa-star' : value >= 2.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{ color }} className={value >= 4 ? 'fas fa-star' : value >= 3.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                <i style={{ color }} className={value >= 5 ? 'fas fa-star' : value >= 4.5 ? 'fas fa-star-half-alt' : 'far fa-star'}></i>
            </span>
            <span>
                {
                    text && text
                }
            </span>
        </div>
    )
}

//This is used when to pass the default props which is not meant to be changed
Rating.defaultProps = {
    color: '#FBDF07'
}
Rating.propTypes = {
    value: propTypes.number.isRequired,
    text: propTypes.string.isRequired,
    color: propTypes.string,
}
export default Rating