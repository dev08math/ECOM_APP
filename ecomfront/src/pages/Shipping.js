import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'

import { saveShippingAddress } from '../redux/actions/cartActions'

function Shipping() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector((state => { return state.cart}))
    const shippingAddress = cart.shippingAddress

    const [address, setAddress] = useState(shippingAddress ? shippingAddress.address : '')
    const [city, setCity] = useState(shippingAddress ? shippingAddress.city : '')
    const [postalCode, setPostalCode] = useState(shippingAddress? shippingAddress.postalCode : '')
    const [country, setCountry] = useState(shippingAddress ? shippingAddress.country : '')
   
    const goBackHandler = () =>{
        navigate(-1)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        navigate('/payment')
    }

  return (
    <div>
        <button 
            className="btn btn-light my-3" 
            type='button'
            onClick={goBackHandler}>
                GO BACK
        </button>
        
        <FormContainer>
            {/* <CheckoutSteps step1 step2 /> */}
            <h1>SHIPPING</h1>
            <Form onSubmit={submitHandler}>
                
                <div className='mb-3'>
                    <Form.Group controlId='address'>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter address'
                            value={address ? address : ''}
                            onChange={(e) => setAddress(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                </div>
                
                <div className='mb-3'>
                    <Form.Group controlId='city'>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter city'
                            value={city ? city : ''}
                            onChange={(e) => setCity(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                </div>
                
                <div className='mb-3'>
                    <Form.Group controlId='postalCode'>
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter postal code'
                            value={postalCode ? postalCode : ''}
                            onChange={(e) => setPostalCode(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                </div>

                <div className='mb-3'>
                    <Form.Group controlId='country'>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            placeholder='Enter country'
                            value={country ? country : ''}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                </div>

                <Button type='submit' variant='primary'>
                    CONTINUE
                </Button>
            </Form>
        </FormContainer>
    </div>
  )
}

export default Shipping