import React, { useState, useEffect} from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../redux/actions/cartActions'


function Payment() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector(state => state.cart)
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const shippingAddress = cart.shippingAddress

    useEffect(() => {
        if(!shippingAddress) navigate('/shipping')
    }, [shippingAddress]);

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }

  return (
    <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>

                <div className='mb-4'>
                    <Form.Group>
                        <Form.Label as='legend'>Select Method</Form.Label>
                        <Col>
                            <Form.Check
                                type='radio'
                                label='PayPal or Credit Card'
                                id='paypal'
                                name='paymentMethod'
                                checked
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                            </Form.Check>
                        </Col>
                    </Form.Group>
                </div>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
            </Form>
    </FormContainer>
  )
}

export default Payment