import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { SavePaymentMethod } from '../actions/connectActions'
const PaymentScreen = () => {
    const navigate = useNavigate()
    const connect = useSelector((state) => state.connect)
    const { shippingAddress } = connect
    if (!shippingAddress) {
        navigate(`/`)
    }
    const [paymentMethod, setPaymentMethod] = useState('Paypal')      //Adress===Location
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(SavePaymentMethod(paymentMethod))
        navigate(`/placeconnect`)
    }
    return (
        <div>
            <FormContainer>
                <CheckoutSteps step1 step2 step3 />
                <h2 className='text-center'>Payment Method</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Label as='legend'>
                            Select Method
                        </Form.Label>
                        <Col>
                            <Form.Check type='radio' label='Paypal or Credit Card' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e) => setPaymentMethod(e.target.value)}>

                            </Form.Check>
                            {/* <Form.Check type='radio' label='Stripe' id='Stripe' name='paymentMethod' value='Stripe' checked onChange={(e) => setPaymentMethod(e.target.value)}>
                                                       KUNAI NAYA PAYMENT API YESMA INSERT GARDAA HUNCHA
                            </Form.Check> */}
                        </Col>
                        <Button onClick={submitHandler} type='submit' style={{ "borderRadius": "5px" }} className='btn btn-success'>
                            Continue
                        </Button>
                    </Form.Group>
                </Form>
            </FormContainer>
        </div>
    )
}

export default PaymentScreen