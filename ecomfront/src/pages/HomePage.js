import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// import products  from '../products'
import Product from "../components/Product";
import { listProducts } from "../redux/actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function HomePage() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => {
    return state.productList;
  });
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]); // you may or maynot add dispatch method in the useEffect's dependency list. dispatch is stable and won't cause any re-rendering unless and until the Providing store is changed.
   // if product state is changed then this has to be re-rendered

  return (
    <div>
      <h1>LATEST PRODUCTS</h1>
      {loading ? (
        <Loader></Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default HomePage;
