import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { SaveShippingAddress } from '../actions/connectActions'
const ShippingScreen = () => {
    const connect = useSelector((state) => state.connect)
    const { shippingAddress } = connect
    const navigate = useNavigate()
    const [name, setName] = useState(shippingAddress.name)
    const [address, setAddress] = useState(shippingAddress.address)      //Adress===Location
    const [city, setCity] = useState(shippingAddress.city)
    const [number, setNumber] = useState(shippingAddress.number)
    const [email, setEmail] = useState(shippingAddress.email)
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(SaveShippingAddress({ name, address, city, number, email }))
        navigate(`/payment`)
    }
    return (
        <div>
            <FormContainer>
                <CheckoutSteps step1 step2 />
                <h2 style={{ "color": "#251B37" }} className='text-center'>Enter your details</h2>
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name' className='address'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            className='form'
                            type='text'
                            placeholder='Enter Your Name'
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='address' className='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            className='form'
                            type='text'
                            placeholder='Enter Local Address'
                            value={address}
                            required
                            onChange={(e) => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='city' className='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type='text'
                            className='form'
                            placeholder='Enter City Name'
                            value={city}
                            required
                            onChange={(e) => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='number' className='number'>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type='number'
                            className='form'
                            placeholder='Enter your local phone number'
                            value={number}
                            required
                            onChange={(e) => setNumber(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email' className='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            className='form'
                            placeholder='Enter your Email'
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Button onClick={submitHandler} type='submit' style={{ "borderRadius": "5px" }} className='btn btn-success'>
                        Continue
                    </Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default ShippingScreen