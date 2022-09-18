import React, { useState } from "react";
import { Button, Col, Form, Row} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchkey, setKeyword] = useState("");
  const location = useLocation()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();
    if (searchkey) {
      navigate(`/?searchkey=${searchkey}`); // have add &page=1 after the braces
    } else {
      navigate(location.pathname);
    }
  };
  return (
    <Form onSubmit={submitHandler}>
        <Row>
            <Col xs="auto">
                <Form.Control
                type="text"
                name="q"
                onChange={(e) => setKeyword(e.target.value)}
                className="mx-5"
                ></Form.Control>
            </Col>
            <Col xs="auto">
                <Button type="submit" variant="success" className="mx-5">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
            </Col>
        </Row>
    </Form>
  );
}

export default SearchBar;
