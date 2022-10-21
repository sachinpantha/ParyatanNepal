import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
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
                        </strong>
                    </Card.Title>
                    <Card.Text as='div'>
                        <Rating value={product.ratings} text={`${product.numReviews} reviews`} />
                    </Card.Text>
                    <Card.Text>{
                        <button type="button" className="btn btn-success">Hire</button>
                    }</Card.Text>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default Product
