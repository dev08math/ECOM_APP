import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  Collapse,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Ratings from "../components/Ratings";
import { listProductDetails } from "../redux/actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const productParams = useParams(); // using useParams to get all the props (slug values) passed onto to ProductDetails
  const productId = productParams.id; // the prop object will only be having the 'id' as as its only porperty

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch]);

  const productDetails = useSelector((state) => {
    return state.productDetails;
  });
  const productInfo = productDetails.productInfo;
  const loading = productDetails.loading;
  const error = productDetails.error;
  const cartItems = useSelector(state=>{ return state.cart.cartItems})
  const [quantity, setQuantity] = useState(1)
  const [inCart, setInCart] = useState(false)

  const goBackHandler = () =>{
    navigate(-1)
  }

  useEffect (() => {
    console.log("cart value", cartItems)
    if(cartItems){
      let found  = false;
      let index = -1;
      for(var i=0; i<cartItems.length; i++){
        
        if(cartItems[i]._id === productInfo._id){
          // console.log("Cart id ", cartItems[i]._id, "productinfo id ", productInfo._id)
          index = i;
          found = true;
          break;
        }
      }
      if(found){
        setQuantity(cartItems[index].qty)
        setInCart(true)
      }
      else{
        setQuantity(1);
        setInCart(false)
      }
    }
  }, [dispatch, cartItems, productDetails])

  // console.log("Incart Value", quantity)

  return (
    <div>
      <button 
        className="btn btn-light my-3" 
        type='button'
        onClick={goBackHandler}>
            GO BACK
      </button>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            <Col md={6}>
              <Image fluid src={productInfo.image} alt={productInfo.name} />
            </Col>

            <Col md={3}>
              {/* <Card>  */}
              <ListGroup variant="flush">
                {" "}
                {/* flush variant REMOVES outer borders and rounded corners to render list group items edge-to-edge in a parent container*/}
                <ListGroup.Item>{productInfo.name}</ListGroup.Item>
                <ListGroup.Item>
                  <Ratings
                    value={productInfo.rating}
                    color={"#FFD700"}
                    text={` ${productInfo.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Col>
                    <strong>Description :</strong>
                  </Col>
                  <Col>{productInfo.description}</Col>
                </ListGroup.Item>
              </ListGroup>
              {/* </Card> */}
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      {" "}
                      {/* If a row is not used here then it will lead to Price and product.columns coming in seprate rows*/}
                      <Col>Price :</Col>
                      <Col>
                        <strong>${productInfo.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status :</Col>
                      <Col>
                        <strong>
                          {productInfo.countInStock
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {productInfo.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col className="my-2">Quantity :</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                          >
                            {[...Array(productInfo.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <div className="btn-group d-flex">
                      {" "}
                      {/*Spanning the entire parent component with button*/}
                      <Button
                        onClick={() => {
                          dispatch(addToCart(productInfo, quantity))
                          setInCart(true)
                          }
                        }
                        variant="warning"
                        type="button"
                        disabled={!productInfo.countInStock}
                        aria-controls="collapse-trash"
                        aria-expanded={inCart}
                      
                      >
                        ADD TO CART
                      </Button>
                    </div>
                  </ListGroup.Item>
                  <Collapse in={inCart}>
                    <ListGroup.Item >
                      <div className="btn-group d-flex" id="collapse-trash">
                        <Button
                          onClick={() =>{
                            dispatch(removeFromCart(productInfo._id))
                            setInCart(false)
                            }
                          }
                          variant="danger"
                          type="button">
                          <i className='fa-solid fa-trash'></i>
                        </Button>
                      </div>
                    </ListGroup.Item>
                  </Collapse>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
