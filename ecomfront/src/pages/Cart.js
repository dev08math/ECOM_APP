import React from "react";
import { Row, Col, ListGroup, Image, Button, Form, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Message from "../components/Message";
import { addToCart, removeFromCart} from "../redux/actions/cartActions";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const cartItems = useSelector(state => state.cart.cartItems)
  const cartLength = useSelector(state => state.cart.length)

  const checkoutHandler = () =>{
    console.log("Checkout triggered")
    navigate('/shipping')
  }

  const goBackHandler = () =>{
    navigate(-1)
  }

  return (
    <div>
      {cartLength ?
       <button 
            className="btn btn-light my-3" 
            type='button'
            onClick={goBackHandler}>
                GO BACK
        </button> : <div>{" "}</div>
        }
      <Row>
        <h2>SHOPPING CART</h2>
        <Col md={8}>
          {" "}
          {" "}
          {
            cartLength ? (
                <ListGroup variant='flush'>
                {
                  cartItems.map(item => (
                      <ListGroup.Item key={item._id}>
                          <Row>
                              <Col md={2}>
                                  <Image fluid rounded src={item.image} alt={item.name}  />
                              </Col>
                              <Col md={3}>
                                  <Link to={`/product/${item._id}`} style={{ textDecoration: 'none', color : 'black'}}>{item.name}</Link>
                              </Col>

                              <Col md={2}>
                                  ${item.price}
                              </Col>

                              <Col md={3}>
                                <Form.Control
                                    as="select"
                                    value={item.qty}
                                    onChange={(e) => dispatch(addToCart(item, Number(e.target.value)))}
                                >
                                    {
                                      [...Array(item.countInStock).keys()].map((x) => (
                                          <option key={x + 1} value={x + 1}>
                                              {x + 1}
                                          </option>
                                      ))
                                    }
                                </Form.Control>
                            </Col>

                            <Col md={1}>
                              <Button
                                  type='button'
                                  variant='danger'
                                  onClick={() => dispatch(removeFromCart(item._id))}
                              >
                                <i className='fa-solid fa-trash'></i>
                              </Button>
                            </Col>

                          </Row>
                      </ListGroup.Item>
                  )
                    )
                }
                </ListGroup>
              ) :  (
                <Message variant='info'>
                    Your cart is empty 
                    {"  "}
                    <Button variant="primary">
                      <Link to='/' style={{textDecoration: 'none', color : 'white'} }> Go Back</Link>
                    </Button>
                </Message>)
          }
        </Col>

        <Col md={4}>
          <Card>
              <ListGroup variant='flush'>
                  <ListGroup.Item>
                      <h2>Subtotal (${cartItems.reduce((total, item) => Number(total) + Number(item.qty), 0)}) items</h2>
                      ${cartItems.reduce((total, item) => Number(total) + Number(item.qty * item.price), 0).toFixed(2)}
                  </ListGroup.Item>
              </ListGroup>
              {" "}
              <ListGroup.Item>
                <div className="btn-group d-flex">
                    <Button
                        type='button'
                        className='btn-block'
                        disabled={!cartItems}
                        onClick={checkoutHandler}
                    >
                        TO THE CHECKOUT
                    </Button>
                </div>
              </ListGroup.Item>

          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Cart