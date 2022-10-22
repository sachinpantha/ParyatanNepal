import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import DateTimePicker from 'react-datetime-picker';
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
//IN CURRENT VERSION OF REACT USEHISTORY IS NOT SUPPORTED INSTEAD USENAVIGATE IS USED 
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
const ProductScreen = () => {
    const [value, onChange] = useState(new Date());
    const navigate = useNavigate();
    // //REACT ROUTER GREATER THAN V6 DOESNT SUPPORT MATCH.PARAMS SO I HAVE USED USEPARAMS HOOK TO ACCESS ID IN URL
    const { id } = useParams();
    // const product = products.find((p) => p._id === id)
    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])
    const connectHandler = () => {
        navigate(`/connect/${id}?time=${value}`)
    }
    return <>
        <Link className='btn btn-dark my-3 rounded-pill' to='/'>
            <i className="fa-solid fa-arrow-left"></i>
        </Link>
        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
            <Row>
                <Col md={6}>
                    <Image className='shadow-sm p-3 mb-5 bg-white rounded border-0' src={product.image} alt={product.name} />
                </Col>
                <Col md={3}>
                    <ListGroup className='shadow-sm p-3 mb-5 bg-white rounded' variant='flush'>
                        <ListGroup.Item>
                            <h5 className='text-center'>{product.name}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.ratings} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <span style={{ color: 'red' }}>Fees:</span> {product.fees}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <p style={{ color: 'red' }}>Description: </p>{product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card className='shadow-sm p-3 bg-white rounded border-0'>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col style={{ color: 'red' }}>
                                        Fees:
                                    </Col>
                                    <Col>
                                        $<strong>{product.fees}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.isAvailable === true ? <p className='text-success'>Available</p> : <p className='text-danger'>Unvailable</p>}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    style={{ "borderRadius": "5px" }}
                                    onClick={connectHandler}
                                    className='btn btn-success' type='button' disabled={product.isAvailable === false}>
                                    Get Connected!
                                </Button>
                            </ListGroup.Item>
                            {product.isAvailable &&
                                <ListGroup.Item>
                                    <DateTimePicker onChange={onChange} value={value} />
                                </ListGroup.Item>}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>}

    </>

}

export default ProductScreen