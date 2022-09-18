import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Card} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { register } from '../redux/actions/userActions'

function Registration() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userRegister = useSelector(state => state.userRegister)
    const { error, loading, userInfo} = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate('/')
        }
    }, [userInfo])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) 
            setMessage('Passwords do not match')
        else 
            dispatch(register(name, email, password))
    }

  return (
    <Card className='my-5 p-6 mx-auto rounded' style= { {width : '40%'}}> 
        <FormContainer>
            
            <Card.Text as='h2' className='text-center mb-4'>SIGN UP</Card.Text>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
          
                <div className='mb-4'>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                </div>

                <div className='mb-4'>
                    <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                </div>
             
                <div className='mb-4'>
                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type='password'
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                </div>

                <div className='mb-4'>
                    <Form.Group controlId='passwordConfirm'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            required
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                </div>

                <div className='mb-3'>
                <Button type='submit' variant='primary'>
                        REGISTER
                </Button>
                </div>

                <div className='mb-3'>
                    <Row className='py-3'>
                        <Col>
                            Have an Account? <Link
                                to={'/login'}>
                                Sign In
                                </Link>
                        </Col>
                    </Row>
                </div>
            </Form>

        </FormContainer>
    </Card>
  )
}

export default Registration