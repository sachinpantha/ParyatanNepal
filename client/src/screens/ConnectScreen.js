import React, { useEffect } from 'react'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, From, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { connectToGuide, removeFromConnection } from '../actions/connectActions'
const ConnectScreen = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const guideId = id
    // WITH THIS LOGIC OF REPLACING %20 I CAN REMOVE A TYPE OF SALTED ENCRYPTION FROM QUERY PARAMETERS
    const time = location.search ? location.search.split('=')[1].replaceAll('%20', ' ').split('GMT')[0] : 0
    const dispatch = useDispatch()
    const connect = useSelector(state => state.connect)
    const { connectItems } = connect
    useEffect(() => {
        if (guideId) {
            dispatch(connectToGuide(guideId, time))
        }
    }, [dispatch, guideId, time])
    const removeFromConnectionHandler = (id) => {

        dispatch(removeFromConnection(id))
    }
    const checkoutHandler = () => {
        navigate('/login/shipping')
    }
    return (
        <Row>
            <Col md={8} >
                <h4 >Connection Wishlist</h4>
                {connectItems.length === 0 ? <Message>
                    Your Connection wishlist is empty <Link to='/'>Go Back</Link>
                </Message> : (
                    <ListGroup variant='flush' className='shadow-sm p-3 mb-5 bg-white rounded border-0'>
                        {connectItems.map(item => (
                            <ListGroup.Item key={item.guideId}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />

                                    </Col>
                                    <Col md={3}>
                                        <Link to={`/product/${item.guideId}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>{item.fees}</Col>
                                    <Col md={2}>{item.time}</Col>
                                    <Col md={2}>
                                        <Button type='button' variant='light' onClick={() => removeFromConnectionHandler(item.guideId)}>

                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>)}

            </Col>
            <Col md={4}>
                <Card className='shadow-sm p-3 mb-5 bg-white rounded border-0'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>

                            <h5 className='text-center'>Subtotal({connectItems.length} Connection{connectItems.length > 1 ? 's' : ''})</h5>
                            {/* ${connectItems.reduce((acc,item)=>acc+ item.fees,0).toFixed(2)} */}
                            {/* ${connectItems.reduce((item)=> item.fees)} */}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' style={{ "borderRadius": "5px" }} className='btn btn-success' disabled={connectItems.length === 0} onClick={checkoutHandler}>
                                Proceed To Connect
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>

        </Row>
    )
}

export default ConnectScreen