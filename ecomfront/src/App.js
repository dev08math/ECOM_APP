import {Container} from 'react-bootstrap';
import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import PlaceOrder from './pages/PlaceOrder';
import Order from './pages/Order';

function App() {
  return (
    <div className="App">
      < Header />
          <main className='py-3'>
              <Container>
                <Routes>

                  <Route exact path='/' element={<HomePage/>}/>
                  <Route path='/product/:id' element={<ProductDetails />}/> {/* passing id as the key for finding a match*/ }
                  <Route path='/cart' element={<Cart />}/>
                  <Route path='/login' element={<Login />}/>
                  <Route path='/register' element={<Registration />}/>
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/shipping' element={<Shipping />} />
                  <Route path='/payment' element={<Payment />} />
                  <Route path='/placeorder' element={<PlaceOrder />} />
                  <Route path='/order/:id' element={<Order />} />
                </Routes>
              </Container>
          </main>
      < Footer />
     
    </div>
  );
}

export default App;
