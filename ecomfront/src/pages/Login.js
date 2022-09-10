import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Row, Col, Button, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../redux/actions/userActions'
import FormContainer from '../components/FormContainer'

function Login() {
    const [password, setPassword] = useState('')
    const [creds, setCreds] = useState({email: '', username: ''})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.username) {
            navigate('/')
        }
    }, [userInfo])

    const submitHandler = (e) => {
        // e.prevenDefault() prevents the browser from getting refreshed when the submit button is pressed
        e.preventDefault()
        dispatch(login(creds, password))
    }
    
  return (
    <Card className='my-5 p-6 mx-auto rounded' style= { {width : '40%'}}> 
        <FormContainer>
            
            <Card.Text as='h2' className='text-center mb-4'>SIGN IN</Card.Text>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
          
                <div className='mb-4'>
                    <Form.Group  controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type = 'email'
                            placeholder = 'Enter Email'
                            defaultValue = {creds.email}
                            onChange = {(e) => {setCreds({...creds, email: e.target.value, username: e.target.value})}}
                        />
                    </Form.Group>
                </div>
             
                <div className='mb-4'>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type = 'password'
                            placeholder = 'Enter Password'
                            value = {password}
                            onChange = {(e) => {setPassword(e.target.value)}}
                        />
                    </Form.Group>
                </div>

                <div className='mb-3'>
                <Button type='submit' variant='primary'>
                        LOG IN
                </Button>
                </div>

                <div className='mb-3'>
                    <Row className='py-3'>
                        <Col>
                            New Customer? <Link
                                to={'/register'}>
                                Register
                                </Link>
                        </Col>
                    </Row>
                </div>
            </Form>

        </FormContainer>
    </Card>
  )
}

export default Login