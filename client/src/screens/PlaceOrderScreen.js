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
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Details::</strong>
                                {connect.shippingAddress.name}, {connect.shippingAddress.address},{connect.shippingAddress.city}
                                ,{connect.shippingAddress.number}, {connect.shippingAddress.email}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method:</strong>
                            {connect.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Connected Guides</h2>
                            {connect.connectItems.length === 0 ? (<Message>Your Connection Wishlist is empty</Message>) : (
                                <ListGroup variant='flush'>
                                    {
                                        connect.connectItems.map((item, index) => {
                                            return <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}><Image src={item.image} alt={item.name} fluid rounded></Image></Col>
                                                    <Col><Link to={`/product/${item.guideId}`}>{item.name}</Link> </Col>
                                                    <Col md={4}>{item.time}</Col>
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
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2 style={{ color: '#D9534F' }}>Connection Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Connections</Col>
                                    <Col>${connect.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tourism Taxes</Col>
                                    <Col>${connect.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${connect.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant='danger'>
                                    {error}
                                </Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' disabled={connect.connectItems === 0} onClick={placeOrderHandler}>Place Connection</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen