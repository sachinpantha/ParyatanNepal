import React, { useState, useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Message from '../components/Message'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
import axios from 'axios'
const OrderScreen = () => {
    const { id: orderId } = useParams()  //useParams le object return garcha tesbata hamle tanna parcha
    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails
    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay
    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
        order.itemsPrice = addDecimals(order.connectItems.reduce((acc, item) => acc + Number(item.fees), 0))

    }
    useEffect(() => {
        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        }
        else if (!order.isPaid) {
            if (!window.paypal) {
                addPaypalScript()
            }
            else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, order])
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }
    return loading ? (<Loader />) : error ? (<Message variant='danger'>{error}</Message>) : (<>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush' className='shadow-sm p-3 bg-white rounded border-0'>
                    <ListGroup.Item>
                        <h5 style={{ "color": "#D9534F" }}>User Details</h5>
                        <span style={{ "fontWeight": "bold" }}>USERNAME:</span>{order.user.name}<br />
                        <span style={{ "fontWeight": "bold" }}>EMAIL:</span><a href={`mailto: ${order.user.email}`}>{order.user.email}</a><br /><br />
                        {order.isConnected ? <Message variant='success'>Connected on {order.reachedAt}</Message> : <Message variant='danger'>The guide has not Connected to tourist yet</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h5 style={{ "color": "#D9534F" }}>Payment Method</h5>
                        <p>
                            <strong>Method:</strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message> : <Message variant='danger'>Payment is not being received yet</Message>}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <h5 style={{ "color": "#D9534F" }}>Connected Guides</h5>
                        {order.connectItems.length === 0 ? (<Message>Order is empty</Message>) : (
                            <ListGroup variant='flush'>
                                {
                                    order.connectItems.map((item, index) => {
                                        return <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}><Image src={item.image} alt={item.name} fluid rounded></Image></Col>
                                                <Col><Link to={`/product/${item.orderId}`}>{item.name}</Link> </Col>
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
                <Card className='shadow-sm p-3 bg-white rounded border-0'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4 className='text-center' style={{ color: 'red' }}>Connection receipt</h4>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col >Connections</Col>
                                <Col style={{ "color": "#40A262" }}>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tourism Taxes</Col>
                                <Col style={{ "color": "#40A262" }}>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col style={{ "color": "#40A262" }}>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? (
                                    <Loader />
                                ) : (
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />
                                )}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>)

}

export default OrderScreen