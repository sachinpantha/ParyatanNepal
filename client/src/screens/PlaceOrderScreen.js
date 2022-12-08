import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { createOrder } from '../actions/orderActions'
const PlaceOrderScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const connect = useSelector((state) => state.connect)
    //Calculating Fees
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate
    // console.log(orderCreate)
    connect.itemsPrice = addDecimals(connect.connectItems.reduce((acc, item) => acc + Number(item.fees), 0))
    connect.taxPrice = addDecimals(Number((0.15 * connect.itemsPrice).toFixed(2)))
    connect.totalPrice = addDecimals(Number(connect.itemsPrice) + Number(connect.taxPrice))

    useEffect(() => {
        if (success) {
            navigate(`/orders/${order._id}`)
        }
    })
    const placeOrderHandler = () => {
        dispatch(createOrder({
            connectItems: connect.connectItems,
            shippingAddress: connect.shippingAddress,
            paymentMethod: connect.paymentMethod,
            itemsPrice: connect.itemsPrice,
            taxPrice: connect.taxPrice,
            totalPrice: connect.totalPrice
        }))
    }
    return (
        <>
            <h5 style={{ color: "#D9534F" }}>Final Connection</h5>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush' className='shadow-sm p-3 mb-5 bg-white rounded border-0'>
                        <ListGroup.Item>
                            <h5 style={{ color: '#D9534F' }}>Your Details</h5>
                            <p>
                                <span style={{ "fontWeight": "bold" }}>NAME</span> : {connect.shippingAddress.name} {<br />}
                                <span style={{ "fontWeight": "bold" }}>LOCAL ADDRESS</span> : {connect.shippingAddress.address} {<br />}
                                <span style={{ "fontWeight": "bold" }}>CITY</span> : {connect.shippingAddress.city} {<br />}
                                <span style={{ "fontWeight": "bold" }}>PHONE NUMBER</span> :{connect.shippingAddress.number}{<br />}
                                <span style={{ "fontWeight": "bold" }}>EMAIL</span> :{connect.shippingAddress.email}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5 style={{ color: '#D9534F' }}>Payment Method</h5>
                            <strong>Method:</strong>
                            {connect.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h5 style={{ color: '#D9534F' }}>Connected Guides</h5>
                            {connect.connectItems.length === 0 ? (<Message>Your Connection Wishlist is empty</Message>) : (
                                <ListGroup variant='flush'>
                                    {
                                        connect.connectItems.map((item, index) => {
                                            return <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}><Image src={item.image} alt={item.name} fluid rounded></Image></Col>
                                                    <Col><Link to={`/product/${item.guideId}`}>{item.name}</Link> </Col>
                                                    <Col style={{ "color": "#40A262" }} md={4}>{item.time}</Col>
                                                </Row>
                                            </ListGroup.Item>
                                        })
                                    }
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card className='shadow-sm p-3 bg-white rounded border-0'>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h5 className='text-center' style={{ color: '#D9534F' }}>Connection Summary</h5>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Connections</Col>
                                    <Col style={{ color: 'green' }}>${connect.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tourism Taxes</Col>
                                    <Col style={{ color: 'green' }}>${connect.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col style={{ color: 'green' }}>${connect.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' style={{ "borderRadius": "5px" }} className='btn btn-success' disabled={connect.connectItems === 0} onClick={placeOrderHandler}>Place Connection</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen