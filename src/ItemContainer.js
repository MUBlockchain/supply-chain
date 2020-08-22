import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'


function ItemContainer(props) {
    let {forSale, sold, shipped, received} = props.items
        if(!forSale) return null
        return (
            <>
                <Container className="item__shop__container">
                    <Row>
                        <Col md={6}>
                            <h2>Items for Sale</h2>
                            {forSale.length ? <div className="item__container">
                                {forSale}
                            </div> : <h4>None</h4> }
                        </Col>
                        <Col md={6}>
                            <h2>Items Sold</h2>
                            {sold.length ? <div className="item__container">
                                {sold}
                            </div> : <h4>None</h4> }
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Items Shipped</h2>
                            {shipped.length ? <div className="item__container">
                                {shipped}
                            </div> : <h4>None</h4> }
                        </Col>
                        <Col md={6}>
                            <h2>Items Received</h2>
                            {received.length ? <div className="item__container">
                                {received}
                            </div> : <h4>None</h4> }
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }

export default ItemContainer