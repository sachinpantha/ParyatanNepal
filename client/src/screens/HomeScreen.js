import React, { useEffect } from 'react'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList



    useEffect(() => {
        dispatch(listProducts())

    }, [dispatch])
    return (
        <>
            <h3>Guides</h3>
            {loading ? <div style={{ display: 'grid', placeItems: 'center' }}><Loader /></div> : error ? <Message variant='danger'>Error Fetching Guides from server</Message> :
                <Row>
                    {products.map((product) => {
                        return <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    })}
                </Row>}

        </>
    )
}

export default HomeScreen