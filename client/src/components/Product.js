import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import { MdVerified } from 'react-icons/md'
const Product = ({ product }) => {
    return (
        <Card className='shadow-sm p-3 mb-5 bg-white rounded border-0'>
            {/* IMPORTING AND PUTTING LINK FROM REACT ROUTER DOM DOESNT RELOADS THE SITE */}
            <Link to={`/product/${product._id}`}>
                <Card.Img className='rounded' src={product.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>
                            {
                                product.name
                            }
                            {" "}
                            <MdVerified style={{ color: '#4169e1' }} />
                        </strong>
                    </Card.Title>
                    <Card.Text as='div'>
                        <Rating value={product.ratings} text={`${product.numReviews} reviews`} />
                    </Card.Text>
                    <Card.Text>{
                        <button type="button" style={{ "borderRadius": "5px" }} className='btn btn-success'>Hire</button>
                    }</Card.Text>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default Product
