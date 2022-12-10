import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { AiFillGithub } from 'react-icons/ai'
const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        <a target='_blank' href='https://www.github.com/sachinpantha'><AiFillGithub style={{ "color": "white", "height": "20px", "width": "20px" }} /></a>{" "}
                        Developed By <a style={{ "color": "#45B5FF" }} target='_blank' href="https://www.facebook.com/sachin.nihc">MERN Squad</a> &lt; &#47; &gt;
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer