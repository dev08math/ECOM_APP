import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions'
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstants'


function Profile() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin 
    
    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({
                'id': user.id,
                'name': name,
                'email': email,
                'password': password
            }))
            setMessage('')
        }
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/')
        } else {
            if (!user || !user.username || success || userInfo.id !== user.id) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails())
            } else {
                setName(user.username)
                setEmail(user.email)
            }
        }
    }, [dispatch, userInfo, user, success])

  return (
        <Row>
            <Col md={3}>
                <h2>USER PROFILE</h2>

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

                                type='password'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            >
                            </Form.Control>
                        </Form.Group>
                    </div>

                    <Button type='submit' variant='primary'>
                        UPDATE
                    </Button>

                </Form>
            </Col>
        </Row>
  )
}

export default Profile